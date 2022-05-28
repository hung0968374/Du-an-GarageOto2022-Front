import React, { useState, useEffect, memo, useMemo } from 'react';
import { Box, Container, Button, Grid, IconButton, Typography, Skeleton } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import './CarDetail.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

import { setWishList } from '../../../redux/common/User/ClientSlice';
import { setPaymentId } from '../../../redux/common/General/GeneralSlice';
import useBlog from '../../../common/hooks/useBlog';
import { getAverageStarPoint } from '../../../common/helper/starRating';
import { UndefinedObject } from '../../../common/interfaces/Client';
import { DarkAccordion } from '../../../common/components/MuiStyling/MuiStyling';
import { useFetchImgs } from '../../../common/hooks/useFetchImgs';
import clientService from '../../../services/clientService';
import { ImageGallary } from '../../../common/components/ImageGallary/ImageGallery';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/ReduxHook';
import { restructureCarComments } from '../../../common/helper/comment';
import useCarDetail from '../../../common/hooks/useCarDetail';
import MessengerComponent from '../../../common/components/MessengerChat/MessengerComponent';
import CustomImage from '../../../common/components/Image/CustomImage';
import { setCarAttributes } from '../../../redux/car/CarSlice';

import RelatedCarsAndBlogs from './components/RelatedCarsAndBlogs';
import CarDetailComment, { CommentReaction } from './components/CommentField';

const accordionProps: Array<UndefinedObject> = [
  {
    title: '1. Giới thiệu',
    propName: 'introReview',
  },
  { title: '2. Nội thất', propName: 'interiorReview' },
  { title: '3. Ngoại thất', propName: 'exteriorReview' },
  { title: '4. Tiện nghi', propName: 'amenityReview' },
  { title: '5. An toàn', propName: 'safetyReview' },
];
const mainParams: UndefinedObject = {
  design: 'Thiết kế',
  engine: 'Động cơ',
  gear: 'Hộp số',
  capacity: 'Dung tích(cc)',
  seats: 'Chỗ ngồi',
  yearOfManufacture: 'Năm sản xuất',
};

export interface RatingInterFace {
  id: number;
  carId: number;
  userId: number;
  ratingPoint: number;
}
export type RatingCreation = Omit<RatingInterFace, 'id'>;

const CarDetail: React.FC = () => {
  const { imgObj, downloadImgsFromFirebase } = useFetchImgs();
  const { reformatCars } = useCarDetail();
  const { reformatBlogs } = useBlog();
  const navigate = useNavigate();
  const params: any = useParams();
  const carInfos = useAppSelector((state) => state.baseItemInfos.car.cars);
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((globalState) => globalState.clientInfo);
  const userStatus: any = useAppSelector((globalState) => globalState.login.status);

  const carInfo = useMemo(() => {
    return carInfos[+params.id]?.info;
  }, [params?.id, carInfos]);

  const relatedCars = carInfos[+params.id]?.relatedCars || [];
  const relatedBlogs = carInfos[+params.id]?.relatedBlogs || [];

  const currCarId = +params.id;
  const [carComments, setCarComments] = useState<any>([]);
  const [commentReactions, setCommentReactions] = useState<Array<CommentReaction>>([]);
  const [currUserRating, setCurrUserRating] = useState<number | null>(0);
  const [ratingPoints, setRatingPoints] = useState<Array<RatingInterFace>>([]);
  const [fetching, setFetching] = useState(false);
  const fetchingCarInfos = fetching && !carInfo;

  const unauthorized = userStatus === 'Unauthorized';
  const userWishList: Array<any> = userInfo.wishlist;

  const averagePoint = React.useMemo(() => {
    return getAverageStarPoint(ratingPoints);
  }, [ratingPoints]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currCarId]);

  useEffect(() => {
    const fetchCar = async () => {
      setFetching(true);
      const { comments, carInfo, commentReactions, relatedCars, relatedBlogs, ratingPoints } =
        await clientService.getCar(params.brandName, params.car as string, +params?.id as any);
      const sortedComments = comments.sort((a: any, b: any) => {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);
        return bDate.getTime() - aDate.getTime();
      });
      const cars = await reformatCars(relatedCars);
      const blogs = await Promise.all(reformatBlogs(relatedBlogs) as any);
      if (!Object.keys(carInfos).includes(params.id) || !relatedCars || !relatedBlogs) {
        dispatch(
          setCarAttributes({
            [carInfo.id]: {
              info: carInfo,
              relatedBlogs: blogs,
              relatedCars: cars,
            },
          }),
        );
      }
      setRatingPoints(ratingPoints);
      const newReactions = commentReactions.map((reaction: any) => {
        delete reaction.car_id;
        delete reaction.comment_id;
        delete reaction.user_id;
        return reaction;
      });
      setCommentReactions(newReactions);
      setFetching(false);

      ///handle comment
      const newComments = restructureCarComments(sortedComments);
      setCarComments(() => newComments);
      for (const rating of ratingPoints) {
        if (rating.userId === userInfo?.id && rating.carId === +params.id) {
          setCurrUserRating(rating.ratingPoint);
        }
      }
    };
    fetchCar();
  }, [
    params.car,
    params.id,
    params.brandName,
    reformatCars,
    dispatch,
    unauthorized,
    userInfo?.id,
    carInfos,
    reformatBlogs,
  ]);

  useEffect(() => {
    const fetchAllImgs = async () => {
      if (carInfo !== undefined) {
        downloadImgsFromFirebase({
          imgs: carInfo.carAppearance.newImgs.split(`","`),
          introImgs: carInfo.carAppearance.newIntroImgs.split(`","`),
          exteriorReviewImgs: carInfo.carAppearance.newExteriorReviewImgs.split(`","`),
          interiorReviewImgs: carInfo.carAppearance.newInteriorReviewImgs.split(`","`),
        });
      }
    };
    fetchAllImgs();
  }, [carInfo, downloadImgsFromFirebase]);

  const handleUserRatingCar = async (_e: any, value: number | null) => {
    if (unauthorized) {
      navigate('/auth/user/log-in');
      return;
    }
    setCurrUserRating(value);
    const response = await clientService.rateCar({ carId: +params.id, ratingPoint: value || 0, userId: userInfo.id });
    const ratingResponse = response.data.result;
    setRatingPoints((ratingPoints: Array<RatingInterFace>) => {
      ratingPoints = ratingPoints.filter((element: any) => {
        return element.id !== ratingResponse.id;
      });
      return [...ratingPoints, ratingResponse] as any;
    });
  };

  const handleUserToggleWishList = async () => {
    if (unauthorized) {
      navigate('/auth/user/log-in');
      return;
    }
    let newWishList;
    if (userWishList.includes(currCarId)) {
      newWishList = userWishList.filter((el: number) => {
        return el !== currCarId;
      });
    } else {
      newWishList = [...userWishList, currCarId];
    }
    dispatch(setWishList(newWishList));
    await clientService.updateUserWishList({ listCarId: newWishList, takeAction: true });
  };

  const handleUserBuyingCar = async () => {
    if (unauthorized) {
      return;
    }
    dispatch(setPaymentId(currCarId));
    await clientService.callPaymentApi({ carId: currCarId, quantity: 1 });
    return;
  };

  return (
    <Container maxWidth={false}>
      <Box sx={{ marginTop: '154px' }}>
        <Container maxWidth="lg" className="car-container">
          {fetchingCarInfos ? (
            <>
              <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
            </>
          ) : (
            <>
              <Grid
                container
                sx={{
                  height: '100%',
                  borderColor: '#C3CAD8',
                  borderWidth: '1px',
                  borderRadius: '5px',
                  padding: '15px',
                }}
              >
                <Grid item sm={12} md={7}>
                  <ImageGallary urls={imgObj.imgs} />
                </Grid>
                <Grid item sm={12} md={5}>
                  <div className="car-main-params-wrapper">
                    <div className="car-main-params">
                      <Box className="title-wrapper">
                        <h1 className="car-title">
                          <strong>{carInfo?.name}</strong>
                        </h1>
                        <IconButton onClick={handleUserToggleWishList}>
                          {userWishList.includes(+params.id) ? (
                            <>
                              <FavoriteIcon sx={{ color: 'red' }} />
                            </>
                          ) : (
                            <>
                              <FavoriteBorderIcon />
                            </>
                          )}
                        </IconButton>
                      </Box>
                      <p className="car-price">{carInfo?.price}</p>
                      <div className="table-title">
                        <strong>Thông số chính</strong>
                      </div>
                      <table className="car-table-main-param">
                        <tbody>
                          {Object.keys(mainParams)?.map((carParam, idx) => {
                            return (
                              <tr key={idx}>
                                <td className="table-first-el">
                                  <strong>{mainParams[carParam]}</strong>
                                </td>
                                {carInfo && <td className="table-second-el">{carInfo?.[carParam]}</td>}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <Box onClick={handleUserBuyingCar} className="payment-area">
                        {unauthorized ? (
                          <>
                            <Link to="/auth/user/log-in">
                              <Button variant="contained">Thanh toán</Button>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link to="/auth/my-account" target="_blank">
                              <Button variant="contained">Thanh toán</Button>
                            </Link>
                          </>
                        )}
                      </Box>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
        <Container maxWidth="lg" sx={{ marginTop: '5rem' }}>
          <Grid container>
            <Grid item sm={12} md={8}>
              {fetchingCarInfos ? (
                <Skeleton variant="rectangular" width={'100%'} height={2000} />
              ) : (
                <div className="car-descriptions">
                  {carInfo !== undefined && (
                    <>
                      {accordionProps?.map((element, idx) => {
                        return (
                          <DarkAccordion
                            disableGutters={true}
                            defaultExpanded={[0, 1].includes(idx) ? true : false}
                            key={idx}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon color="primary" />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>{element.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {carInfo?.[element.propName]?.split(`","`)?.map((el: string, idx: number) => {
                                return (
                                  <p
                                    key={idx}
                                    className={`${el.includes('strong') && 'car-p-strong'}`}
                                    dangerouslySetInnerHTML={{ __html: el.replaceAll(`"]`, '').replaceAll(`["`, '') }}
                                  ></p>
                                );
                              })}
                              {accordionProps[idx].propName === 'interiorReview' ||
                              accordionProps[idx].propName === 'exteriorReview' ? (
                                <div style={{ marginTop: '2rem' }}>
                                  <ImageGallary
                                    urls={
                                      accordionProps[idx].propName === 'interiorReview'
                                        ? imgObj.interiorReviewImgs
                                        : imgObj.exteriorReviewImgs
                                    }
                                  />
                                </div>
                              ) : (
                                <>
                                  {accordionProps[idx].propName === 'introReview' && (
                                    <Grid container spacing={1}>
                                      {imgObj.introImgs?.map((img, idx) => {
                                        let gridSize = undefined;
                                        if (imgObj.introImgs) {
                                          gridSize = 12 / imgObj?.introImgs?.length;
                                        }
                                        return (
                                          <Grid key={idx} item sm={12} md={gridSize}>
                                            <CustomImage source={img} style={{ width: '100%', height: '100%' }} />
                                          </Grid>
                                        );
                                      })}
                                    </Grid>
                                  )}
                                </>
                              )}
                            </AccordionDetails>
                          </DarkAccordion>
                        );
                      })}
                    </>
                  )}
                </div>
              )}
            </Grid>
            <Grid item sm={12} md={4}>
              <Box className="starring-container">
                {fetchingCarInfos ? (
                  <Skeleton variant="rectangular" width={'100%'} height={75} />
                ) : (
                  <Box className="car-staring">
                    <Box className="starring-text">
                      <p>ĐIỂM ĐÁNH GIÁ</p>
                      <Box className="star-rating-area">
                        <Rating
                          className="curr-rating"
                          name="half-rating"
                          value={currUserRating}
                          precision={0.5}
                          onChange={handleUserRatingCar}
                        />
                        <Rating
                          className="others-rated"
                          name="half-rating"
                          disabled={true}
                          value={+averagePoint}
                          precision={0.5}
                          readOnly
                        />
                      </Box>
                    </Box>
                    <Box className="starring-right">
                      <Box className="starring-number">
                        <Box className="text-lg text-red-500">{+averagePoint}</Box>
                        <Box> / 5</Box>
                      </Box>
                      <Box>({ratingPoints.length} đánh giá tất cả)</Box>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box className="intro-container">
                <div className="text-wrapper">
                  <span className="related-cars-text">Xe liên quan</span>
                </div>
                <div className="black-line"></div>
              </Box>
              <RelatedCarsAndBlogs
                fetchingCarInfos={fetchingCarInfos}
                params={params}
                relatedCars={relatedCars}
                relatedBlogs={relatedBlogs}
              />
            </Grid>
          </Grid>
        </Container>

        <CarDetailComment
          unauthorized={unauthorized}
          carInfo={carInfo}
          userInfo={userInfo}
          carComments={carComments}
          setCarComments={setCarComments}
          commentReactions={commentReactions}
          setCommentReactions={setCommentReactions}
          params={params}
          fetchingCarInfos={fetchingCarInfos}
        />
      </Box>
      <MessengerComponent />
    </Container>
  );
};

export default memo(CarDetail);
