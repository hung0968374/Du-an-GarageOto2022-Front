import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  CardActionArea,
  Pagination,
  PaginationItem,
  CircularProgress,
  Link,
  Skeleton,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import clientService from '../../../services/clientService';
import './Blogs.scss';
import { removeTagsFromString } from '../../../common/helper/string';
import { replaceDirtyImgUrls } from '../../../common/helper/image';
import { useFetchImgs } from '../../../common/hooks/useFetchImgs';

import { BlogItemInterface } from './BlogItem';

export const Blogs = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const currentPage = params.page || 1;

  const [blogs, setBlogs] = useState<Array<BlogItemInterface>>([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(11);
  const [totalBlog, setTotalBlog] = useState(107);

  const { getImgFromFirebase } = useFetchImgs();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(() => true);
      const response = await clientService.getBlogs(+currentPage);
      const res = response.data.rows || [];
      const { count } = response.data;
      setTotalPage(Math.round(count / 10));
      setTotalBlog(count);

      const reformattingBlogs: any = await Promise.all(
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
      setBlogs(reformattingBlogs);
      setLoading(() => false);
    };
    fetchBlogs();
  }, [currentPage, getImgFromFirebase]);

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
    </>
  );
};
