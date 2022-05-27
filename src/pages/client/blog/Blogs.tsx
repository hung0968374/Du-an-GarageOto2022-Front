import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, CardActionArea, Pagination, PaginationItem, Link, Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import clientService from '../../../services/clientService';
import './Blogs.scss';
import { useFetchImgs } from '../../../common/hooks/useFetchImgs';
import useBlog from '../../../common/hooks/useBlog';
import MessengerComponent from '../../../components/MessengerChat/MessengerComponent';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/ReduxHook';
import { setBlogValues } from '../../../reduxToolKit-Saga/blog/BlogSlice';

export const Blogs = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const availableBlogs = useAppSelector((state) => state.baseItemInfos.blog.blogs);
  const dispatch = useAppDispatch();

  const { getImgFromFirebase } = useFetchImgs();
  const { reformatBlogs } = useBlog();
  const [blogs, setBlogs] = useState([]);

  const currentPage = params.page || '1';

  useEffect(() => {
    const setInitialBlogs = async () => {
      const rawBlogs = availableBlogs[currentPage].map((blog) => {
        return { ...blog };
      });
      if (rawBlogs?.length > 0) {
        const reformattedBlogs: any = await Promise.all(reformatBlogs(rawBlogs) as any);
        setBlogs(reformattedBlogs);
      }
    };
    setInitialBlogs();
  }, [reformatBlogs, availableBlogs, currentPage]);
  const [fetching, setFetching] = useState(false);
  const loading = fetching && blogs?.length === 0;
  const [totalPage, setTotalPage] = useState(11);
  const [totalBlog, setTotalBlog] = useState(107);

  useEffect(() => {
    const fetchBlogs = async () => {
      setFetching(() => true);
      const response = await clientService.getBlogs(+currentPage);
      const blogsResponse = response.data.rows || [];
      const { count } = response.data;
      setTotalPage(Math.round(count / 10));
      setTotalBlog(count);

      if (!Object.keys(availableBlogs).includes(currentPage as string) || blogs.length === 0) {
        dispatch(
          setBlogValues({
            [currentPage]: blogsResponse,
          }),
        );
      }
      setFetching(() => false);
    };
    fetchBlogs();
  }, [currentPage, dispatch, getImgFromFirebase, reformatBlogs, availableBlogs, blogs]);

  useEffect(() => {
    if (loading !== true) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [loading]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: '154px', marginBottom: '100px' }}>
        <Box className="blog-news">Tin tức</Box>
        <Box className="blogs-container">
          {!loading ? (
            <>
              {blogs?.map((blog: any, idx: number) => {
                return (
                  <Link
                    href={`/blog?title=${blog.title}&id=${blog.id}&total=${totalBlog}`}
                    key={idx}
                    sx={{ marginBottom: '1rem' }}
                    underline="none"
                  >
                    <Card className="item-container">
                      <CardActionArea sx={{ height: '100%' }}>
                        <CardContent sx={{ height: '100%' }}>
                          <Grid container sx={{ height: '100%' }}>
                            <Grid item sm={4} xs={12} sx={{ height: '100%' }}>
                              <img src={blog.descriptionImgs} loading="eager" />
                            </Grid>
                            <Grid item sm={8} xs={12} sx={{ height: '100%' }}>
                              <Box className="blog-content-container">
                                <Box className="blog-content-title">{blog.title}</Box>
                                <Box className="descriptions-container">{blog.descriptions}</Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                );
              })}
            </>
          ) : (
            <>
              {[1, 2, 3, 4, 5, 6].map((num: number) => {
                return (
                  <div key={num} className="skeleton-container">
                    <div className="left">
                      <Skeleton variant="rectangular" width="100%" height="100%"></Skeleton>
                    </div>
                    <div className="right">
                      <Skeleton variant="rectangular" width="60%" height="20%" className="upper-right"></Skeleton>
                      <Skeleton variant="rectangular" width="100%" height="75%"></Skeleton>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </Box>
        <Box className="blogs-pagination-contaier">
          <Pagination
            count={totalPage}
            shape="rounded"
            page={+currentPage}
            renderItem={(item: any) => {
              if (item.selected) {
                return (
                  <>
                    <PaginationItem key={item.page} {...item} />
                  </>
                );
              } else {
                return (
                  <Link href={`/blogs?page=${item.page}`} underline="none">
                    <PaginationItem key={item.page} {...item} />
                  </Link>
                );
              }
            }}
          ></Pagination>
        </Box>
      </Container>
      <MessengerComponent />
    </>
  );
};
