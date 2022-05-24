import { useCallback, useState } from 'react';

import clientService from '../../services/clientService';
import { replaceDirtyImgUrls } from '../helper/image';
import { removeTagsFromString } from '../helper/string';

import { useFetchImgs } from './useFetchImgs';

const useBlog = () => {
  const { getImgFromFirebase } = useFetchImgs();
  const [fetchingBlogs, setFetchingBlogs] = useState(false);

  const reformatBlogs = useCallback(
    (blogs: Array<any>) => {
      setFetchingBlogs(true);
      const newBlogs = blogs?.map(async (blog: any) => {
        const regExp = /[a-zA-Z]/g;
        const blogImgs: string = replaceDirtyImgUrls(blog?.descriptionImgs)?.[0];
        if (blogImgs) {
          blog.descriptionImgs = await getImgFromFirebase(blogImgs);
        }
        blog.descriptions = removeTagsFromString(blog.descriptions.slice(0, 1000))
          .split(`","`)
          .filter((str) => {
            return regExp.test(str);
          })
          .join()
          .replaceAll(`\\`, '')
          .replaceAll(`.,`, '. ')
          .replaceAll('&nbsp;', '');
        const firstTwo = blog.descriptions.slice(0, 2);
        if (firstTwo === `["`) {
          blog.descriptions = blog.descriptions.slice(2);
        }
        return blog;
      });
      setFetchingBlogs(false);
      return newBlogs;
    },
    [getImgFromFirebase],
  );

  const reformatBlogContent = useCallback(
    async (blogId: number) => {
      let { data }: any = await clientService.getBlog(blogId);
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
          data.descriptions = data.descriptions.replaceAll(originalImg, firebaseImgs[idx]);
        });
      }
      let temp = data.descriptions;
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
      data.descriptions = temp;

      return data;
    },
    [getImgFromFirebase],
  );

  return { fetchingBlogs, reformatBlogs, reformatBlogContent };
};

export default useBlog;
