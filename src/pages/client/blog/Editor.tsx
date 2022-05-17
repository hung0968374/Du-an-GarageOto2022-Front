import React, { useEffect, useState, useCallback } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import clientService from '../../../services/clientService';
import { replaceDirtyImgUrls } from '../../../common/helper/image';
import { useFetchImgs } from '../../../common/hooks/useFetchImgs';
import './CustomEditor.scss';

function uploadImageCallBack(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: any) => resolve({ data: { link: e.target.result } });
    reader.onerror = (e: any) => reject(e);
    reader.readAsDataURL(file);
  });
}

export const EditorComponent = () => {
  const [editorState, setEditorState] = useState<any>(EditorState.createEmpty());
  const [currBlog, setCurrBlog] = useState<any>();
  const { getImgFromFirebase } = useFetchImgs();
  const params = {
    title: 'Mercedes-Benz%20tiếp%20tục%20tăng%20giá%20loạt%20xe%20tại%20Việt%20Nam,%20cao%20nhất%20gần%20160%20triệu',
    id: 3,
  };
  ////convert html to content
  const html = currBlog?.descriptions || `<p>hello world</p>`;

  const convert = useCallback(() => {
    const contentBlock: any = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorStateFromHtml = EditorState.createWithContent(contentState);
      setEditorState(editorStateFromHtml);
    }
  }, [html]);
  useEffect(() => {
    convert();
  }, [convert]);

  useEffect(() => {
    const fetchBlog = async () => {
      if (params.title) {
        let { data }: any = await clientService.getBlog(+params.id);
        data = data.result;
        let originalImgs: Array<string> = replaceDirtyImgUrls(data?.descriptionImgs);
        if (originalImgs) {
          const firebaseImgs = await Promise.all(
            originalImgs.map((img: string) => {
              return getImgFromFirebase(img);
            }),
          );
          originalImgs = originalImgs.map((img: string) => {
            return 'https://img1.oto.com.vn/' + img;
          });
          originalImgs.forEach((originalImg, idx) => {
            data.descriptions = data?.descriptions?.replaceAll(originalImg, firebaseImgs[idx]);
          });
        }
        let temp = data?.descriptions;
        temp = temp.replaceAll(`\\`, '').replaceAll(`.,`, '. ').replaceAll('&nbsp;', '').replaceAll(`","`, '<br />');

        const firstTwo = temp.slice(0, 2);
        if (firstTwo === `["`) {
          temp = temp.slice(2);
        }
        const lastTwo = temp.slice(temp.length - 2, temp.length);
        if (lastTwo === `"]`) {
          temp = temp.slice(0, temp.length - 2);
        }
        temp = temp.split('<p>');
        temp = temp.map((line: string) => {
          if (line.includes('Xem thêm')) {
            return line.replaceAll(`<em`, `<em class="crossText"`);
          }
          if (line.includes('Box chèn khuyến mại')) {
            return line.replaceAll(`<p`, `<p class="crossText"`);
          }
          return line;
        });
        temp = temp.join(`<p>`);
        data.descriptions = temp || `<p>hello world</p>`;
        setCurrBlog(data);
      }
    };
    fetchBlog();
  }, [params.title, getImgFromFirebase, params.id]);

  ////convert html to content

  const onEditorStateChange = (state: any) => {
    setEditorState(state);
  };
  const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  console.log('value', value);
  return (
    <div style={{ marginTop: '300px', width: '1000px' }}>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor customEditor"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          image: {
            uploadCallback: uploadImageCallBack,
            previewImage: true,
          },
        }}
      />
    </div>
  );
};
