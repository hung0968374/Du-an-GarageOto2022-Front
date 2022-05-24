import React from 'react';
import { Box, Grid, Card, CardActionArea, CardContent, Rating, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';

import '../CarDetail.scss';

const RelatedCarsAndBlogs: React.FC<any> = ({ relatedBlogs, fetchingCarInfos, relatedCars, params }) => {
  const brandName = params.brandName.split(' ')[0].toLowerCase();
  return (
    <Box className="related-cars-blogs">
      <Grid container spacing={1}>
        {relatedCars.map((relatedCar: any, idx: number) => {
          return (
            <Grid key={idx} item sm={6} md={12} lg={12}>
              {fetchingCarInfos ? (
                <Skeleton variant="rectangular" width={'100%'} height={170} />
              ) : (
                <>
                  <Link to={`/brand/${brandName}/${relatedCar.name.toLocaleLowerCase()}/${relatedCar.id}`}>
                    <Box sx={{ marginTop: '5px' }}>
                      <Card>
                        <CardActionArea>
                          <CardContent>
                            <Grid container>
                              <Grid item sm={12} lg={7}>
                                <Box className="relatedCar-image">
                                  <img alt="" src={relatedCar.introImg} />
                                </Box>
                              </Grid>
                              <Grid item sm={12} lg={5}>
                                <Box className="relatedCar-content-wrapper">
                                  <Box className="name">{relatedCar.name}</Box>
                                  <Box className="price">{relatedCar.price}</Box>
                                  <Box>
                                    <Rating name="half-rating" value={4.6} precision={0.5} readOnly />
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Box>
                  </Link>
                </>
              )}
            </Grid>
          );
        })}
      </Grid>
      <Box className="intro-container">
        <div className="text-wrapper">
          <span className="related-cars-text">Blog liên quan</span>
        </div>
        <div className="black-line"></div>
      </Box>
      <Grid container spacing={1}>
        {relatedBlogs.map((relatedBlog: any, idx: any) => {
          return (
            <Grid key={idx} item sm={6} md={12} lg={12}>
              {fetchingCarInfos ? (
                <>
                  <Skeleton variant="rectangular" width={'100%'} height={140} />
                </>
              ) : (
                <>
                  <Link to={`/blog?title=${relatedBlog.title}&id=${relatedBlog.id}&total=${100}`} key={idx}>
                    <Box sx={{ marginTop: '5px' }}>
                      <Card>
                        <CardActionArea>
                          <CardContent>
                            <Grid container>
                              <Grid item sm={12} lg={7}>
                                <Box className="relatedCar-image">
                                  <img alt="" src={relatedBlog.descriptionImgs} />
                                </Box>
                              </Grid>
                              <Grid item sm={12} lg={5}>
                                <Box className="relatedBLogs-content-wrapper">
                                  <Box className="blog-title">{relatedBlog.title}</Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Box>
                  </Link>
                </>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default React.memo(RelatedCarsAndBlogs);
