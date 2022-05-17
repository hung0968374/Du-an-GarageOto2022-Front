import React, { useCallback, useEffect, useState } from 'react';
import { Container, Skeleton, CardActionArea, Box, Grid, Link, Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import clientService from '../../../services/clientService';
import { useFetchImgs } from '../../../common/hooks/useFetchImgs';
import { replaceDirtyImgUrls } from '../../../common/helper/image';
import './BlogItem.scss';
import { removeTagsFromString } from '../../../common/helper/string';

export interface BlogItemInterface {
  descriptionImgs: string;
  descriptions: string;
  title: string;
  id?: number;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const BlogItem = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const totalBlogs = +params.totalBlog || 107;

  const [currBlog, setCurrBlog] = useState<BlogItemInterface>();
  console.log('currBlog', currBlog);
  const [relatedBlogs, setRelatedBlogs] = useState<Array<BlogItemInterface>>([]);
  const { getImgFromFirebase } = useFetchImgs();
  const [loading, setLoading] = useState(false);
  ////// edit
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  ///// edit

  const getRelatedBlogs = useCallback(async () => {
    if (currBlog?.id) {
      const id = +currBlog.id + 20;
      const ids = [(id - 2) % totalBlogs, (id - 1) % totalBlogs, (id + 1) % totalBlogs, (id + 2) % totalBlogs];
      const blogs = await Promise.all(
        ids.map((id: number) => {
          return clientService.getBlogByOffset(+id);
        }),
      );
      let res = blogs.map((blog: any) => {
        return blog.data.result;
      });
      res = await Promise.all(
        res.map(async (blog: any) => {
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
        }),
      );
      setRelatedBlogs(res);
    }
  }, [totalBlogs, currBlog?.id, getImgFromFirebase]);

  useEffect(() => {
    getRelatedBlogs();
  }, [getRelatedBlogs]);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
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
        setCurrBlog(data);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [params.title, getImgFromFirebase, params.id]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: '154px', marginBottom: '100px' }}>
        <Card>
          <CardContent>
            {!loading ? (
              <div
                className="blogItem-content-container"
                dangerouslySetInnerHTML={{ __html: currBlog?.descriptions || '' }}
                onClick={handleOpen}
              ></div>
            ) : (
              <>
                <Skeleton variant="rectangular" width="100%" height="20vh"></Skeleton>
                <br></br>
                <Skeleton variant="rectangular" width="100%" height="20vh"></Skeleton>
                <br></br>
                <Skeleton variant="rectangular" width="100%" height="20vh"></Skeleton>
                <br></br>
                <Skeleton variant="rectangular" width="100%" height="20vh"></Skeleton>
                <br></br>
              </>
            )}
          </CardContent>
        </Card>
        <Box className="divider">Blog liên quan</Box>
        <Box className="related-blog-container">
          <Grid container spacing={2}>
            {relatedBlogs.map((blog: BlogItemInterface, idx: number) => {
              return (
                <>
                  <Grid item md={6} xs={12} key={idx}>
                    <Link href={`/blog?title=${blog.title}&id=${blog.id}&total=${totalBlogs}`} underline="none">
                      <Card>
                        <CardActionArea>
                          <CardContent>
                            <Box>
                              <img src={blog.descriptionImgs} alt="" />
                            </Box>
                            <Box className="title">{blog.title}</Box>
                            <Box className="descriptions">{blog.descriptions}</Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
