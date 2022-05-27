import React, { useCallback, useEffect, useState } from 'react';
import { Container, Skeleton, CardActionArea, Typography, Box, Grid, Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import clientService from '../../../services/clientService';
import { useFetchImgs } from '../../../common/hooks/useFetchImgs';
import './BlogItem.scss';
import useBlog from '../../../common/hooks/useBlog';
import MessengerComponent from '../../../components/MessengerChat/MessengerComponent';

export interface BlogItemInterface {
  descriptionImgs: string;
  descriptions: string;
  title: string;
  id?: number;
}

export const BlogItem = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const totalBlogs = +params.totalBlog || 107;

  const [currBlog, setCurrBlog] = useState<BlogItemInterface>();
  const [relatedBlogs, setRelatedBlogs] = useState<Array<BlogItemInterface>>([]);
  const { getImgFromFirebase } = useFetchImgs();
  const [loading, setLoading] = useState(false);
  const { reformatBlogs, reformatBlogContent } = useBlog();

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      if (params.title) {
        const blogs = await reformatBlogContent(+params.id);
        setCurrBlog(blogs);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [params.title, getImgFromFirebase, reformatBlogContent, params.id]);

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
      res = await Promise.all(reformatBlogs(res) as Array<Promise<BlogItemInterface>>);
      setRelatedBlogs(res);
    }
  }, [totalBlogs, currBlog?.id, reformatBlogs]);

  useEffect(() => {
    getRelatedBlogs();
  }, [getRelatedBlogs]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: '154px', marginBottom: '100px' }}>
        <Box className="blog-item-title">
          <Typography fontSize="2rem" color="text.secondary">
            {currBlog?.title}
          </Typography>
        </Box>
        <Card>
          <CardContent>
            {!loading ? (
              <div
                className="blogItem-content-container"
                dangerouslySetInnerHTML={{ __html: currBlog?.descriptions || '' }}
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
      <MessengerComponent />
    </>
  );
};
