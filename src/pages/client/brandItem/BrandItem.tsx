import {
  Autocomplete,
  Container,
  TextField,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Chip,
  Box,
  CardActions,
} from '@mui/material';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import './BrandItem.scss';
import {
  ColorSchema,
  ContainerGrey,
  MuiBrandButton,
  SecondContainerWhite,
  SubmitButtonStyle,
  TransparentBrandButton,
  TransparentButton,
} from '../../../components/MuiStyling/MuiStyling';
import clientService from '../../../services/clientService';
import { useFetchImgs } from '../../../common/hooks/useFetchImgs';
import { replaceDirtyImgUrls } from '../../../common/helper/image';
import { Loading } from '../../../components/loading/Loading';
import { allBrand, allPrice, allSeat, brandWallpapers } from '../../../common/constants/fakeData';

const allBodyType = [
  { label: 'Convertible' },
  { label: 'SUV' },
  { label: 'Sedan' },
  { label: 'Coupe' },
  { label: 'Hatchback' },
];

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface BrandItemAttributes {
  id: string;
  name: string;
  descriptions: string;
  shortDescriptions: string;
  brandImg: string;
  descriptionImgs: string;
}

interface CarImgAttributes {
  introImgs: string;
  imgs: string;
}

interface CarAttributes {
  id: string;
  name: string;
  price: string;
  seat: string;
  carAppearance: CarImgAttributes;
}

const mainImgStyle = (brand: string | undefined) => {
  if (!brand) return;
  const temp: any = brandWallpapers;
  const carBrand: string = brand;
  const img = temp[carBrand];
  return {
    'min-height': '100vh',
    width: '100%',
    'background-image': `url(${img})`,
    'background-size': 'cover',
  };
};

export const BrandItem: React.FC = () => {
  const discoverRef = React.useRef<HTMLDivElement>(null);
  const brandItemRef = React.useRef<HTMLDivElement>(null);
  const { brandName } = useParams<string>();
  const [brandItemAPI, setBrandItemAPI] = React.useState<BrandItemAttributes>({
    id: '',
    name: '',
    descriptions: '',
    shortDescriptions: '',
    brandImg: '',
    descriptionImgs: '',
  });
  const [carInfoAPI, setCarInfoAPI] = React.useState<Array<CarAttributes>>([]);
  const [imgFromFirebase, setImgFromFirebase] = useState<Array<any>>([]);
  const { imgObj, downloadImgsFromFirebase, getImgFromFirebase } = useFetchImgs();
  const params = useParams();

  const originalImgs = useMemo(() => {
    return replaceDirtyImgUrls(brandItemAPI?.descriptionImgs)?.map((url: string) => {
      return '..' + url;
    });
  }, [brandItemAPI.descriptionImgs]);

  const brandImgUrls = useMemo(() => {
    return brandItemAPI.descriptionImgs.split(`","`);
  }, [brandItemAPI.descriptionImgs]);

  React.useEffect(() => {
    const fetchImgs = async () => {
      await downloadImgsFromFirebase({ brandImgs: brandImgUrls });
    };
    fetchImgs();
  }, [downloadImgsFromFirebase, brandImgUrls]);

  const carFirebaseImgs = useCallback(async () => {
    const newImgs = await Promise.allSettled(
      carInfoAPI.map((car: any) => {
        let carImg = '';
        let tinbanxeImg;
        if (car.carAppearance.newIntroImgs.length < 5) {
          const carIntroImgs = replaceDirtyImgUrls(car.carAppearance.imgs);
          if (carIntroImgs) {
            return Promise.resolve(carIntroImgs[0]);
          }
        }
        const originalImgs = replaceDirtyImgUrls(car.carAppearance.newIntroImgs);
        const tinbanxeImgs = replaceDirtyImgUrls(car.carAppearance.introImgs);
        if (tinbanxeImgs && originalImgs) {
          if (originalImgs?.length === 1) {
            carImg = originalImgs[0];
            tinbanxeImg = tinbanxeImgs[0];
          } else {
            carImg = originalImgs[1];
            tinbanxeImg = tinbanxeImgs[1];
          }
        }
        const carImgRes = getImgFromFirebase(carImg, tinbanxeImg);
        return carImgRes;
      }),
    );
    const availableImgs = newImgs.reduce((acc: any, promise: any) => {
      if (promise.status === 'fulfilled' && promise.value !== '') {
        acc.push(promise.value);
        return acc;
      }
      return acc;
    }, []) as any;
    setImgFromFirebase(availableImgs);
  }, [getImgFromFirebase, carInfoAPI]) as any;

  useEffect(() => {
    carFirebaseImgs();
  }, [carFirebaseImgs]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const getBrandApi = async (brand: string) => {
      try {
        const response = await clientService.getBrand(brand);
        setBrandItemAPI(response.brandInfo);
      } catch (error: any) {
        console.log(error.response);
      }
    };

    const getCarByBrandNameApi = async (brand: string) => {
      try {
        const response = await clientService.getCarByBrandName(brand);
        setCarInfoAPI(response.cars);
      } catch (error: any) {
        console.log(error.response);
      }
    };

    getBrandApi(brandName as string);
    getCarByBrandNameApi(brandName as string);
  }, [brandName]);

  React.useEffect(() => {
    const fetchImgs = async () => {
      await downloadImgsFromFirebase({ brandImgs: brandImgUrls });
    };
    fetchImgs();
  }, [downloadImgsFromFirebase, brandImgUrls]);

  const handleBrandName = () => {
    if (brandName === 'bmw') return 'BMW';
    if (brandName === 'rolls-royce') return 'Rolls Royce';
    return capitalizeFirstLetter(brandName as string);
  };

  const shortcutDescription = (des: string) => {
    if (des?.length >= 400) return des?.slice(0, 400) + '...';
    return des + '...';
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleBrandDescription = (description: string) => {
    let newDes: any = description?.slice(1, -1);
    newDes = newDes.split('\\n').map((el: any) => {
      return el;
    });
    const temp = newDes.splice(0, newDes.length / 2);
    return [...temp, ...newDes].join();
  };

  const modifiedDescription = useMemo(() => {
    let temp = handleBrandDescription(brandItemAPI?.descriptions as string)
      .replaceAll('>,', '>')
      .replaceAll(`\\`, '');
    originalImgs?.forEach((originalImg, idx) => {
      if (imgObj?.brandImgs?.length > 0) {
        temp = temp
          .replaceAll(originalImg, imgObj?.brandImgs[idx])
          .replaceAll(originalImg.split('..')[1], imgObj?.brandImgs[idx]);
      }
    });
    temp = temp.slice(1, -1);
    if (temp[temp.length - 1] === `"`) {
      temp = temp.slice(0, -1);
    }
    return temp;
  }, [brandItemAPI.descriptions, imgObj.brandImgs, originalImgs]);

  // const getImgFromAPI = (img: string) => {
  //   const handleImg1 = img.split(',');
  //   const handleImg2 = handleImg1.map((item) =>
  //     item.replaceAll('"', '').replaceAll('"', '').replace('[', '').replace(']', ''),
  //   );
  //   return handleImg2[1];
  // };

  return (
    <Container maxWidth={false} className="brand_item-container mt-12">
      <div style={mainImgStyle(params?.brandName)}>
        <Box
          sx={{
            paddingTop: '28vh',
            paddingLeft: '4vw',
          }}
        >
          <Typography variant="h2" color={'#ffffff'} mb={3} fontFamily="ui-serif">
            The new S-Brand
          </Typography>
          <Typography sx={{ opacity: '0.8' }} variant="h6" color={'#ffffff'} mb={10}>
            Cares for what matters.
          </Typography>
          <TransparentButton
            onClick={() => discoverRef.current?.scrollIntoView({ behavior: 'smooth' })}
            variant="outlined"
          >
            Discover
          </TransparentButton>
        </Box>
      </div>

      <SecondContainerWhite maxWidth={false} ref={discoverRef}>
        <div className="brand_item-introduction">
          <div className="all-brand-body_type py-4">
            <Autocomplete
              disablePortal
              sx={{ width: '15rem', marginLeft: '1rem' }}
              options={allBrand}
              renderInput={(params) => <TextField {...params} label="Brand" />}
            />
            <Autocomplete
              disablePortal
              sx={{ width: '15rem', marginLeft: '1rem' }}
              options={allBodyType}
              renderInput={(params) => <TextField {...params} label="Bodytype" />}
            />
          </div>
          <div className="brand-short-description p-4">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <img src={brandItemAPI?.brandImg} alt="" />
              </Grid>
              <Grid item xs={12} md={8}>
                <div
                  className="mb-4 text-justify leading-6"
                  dangerouslySetInnerHTML={{ __html: shortcutDescription(modifiedDescription) }}
                ></div>
                <TransparentBrandButton
                  className="see-more"
                  onClick={() => brandItemRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  variant="outlined"
                >
                  See more
                </TransparentBrandButton>
              </Grid>
            </Grid>
          </div>
        </div>
      </SecondContainerWhite>

      <ContainerGrey maxWidth={false}>
        <div className="brand_item-main">
          <Typography
            variant="h3"
            sx={{ textAlign: 'left', color: ColorSchema.Black, marginBottom: '2rem' }}
            fontFamily="ui-serif"
          >
            {handleBrandName()}
          </Typography>

          {carInfoAPI.length === 0 ? (
            <Loading />
          ) : (
            <Grid container>
              <Grid item lg={12} xl={12 / 5} className="filer-responsive">
                <div className="filer-select">
                  <Autocomplete
                    disablePortal
                    sx={{ paddingRight: '2rem', maxWidth: '20rem', marginBottom: '1rem' }}
                    options={allPrice}
                    renderInput={(params) => <TextField {...params} label="Price" />}
                  />
                  <Autocomplete
                    disablePortal
                    sx={{ paddingRight: '2rem', maxWidth: '20rem', marginBottom: '2rem' }}
                    options={allSeat}
                    renderInput={(params) => <TextField {...params} label="Seat" />}
                  />
                </div>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Order by</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="asc" control={<Radio />} label="ASC" />
                    <Stack direction="row" spacing={1} className="flex-wrap">
                      <Chip label="Car name" variant="outlined" />
                      <Chip label="Price" variant="outlined" onDelete={handleDelete} />
                      <Chip label="Seat" variant="outlined" onDelete={handleDelete} />
                    </Stack>
                    <FormControlLabel value="desc" control={<Radio />} label="DESC" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid container lg={12} xl={(12 / 5) * 4}>
                {carInfoAPI.map((item, index) => {
                  const cutBrandName = item.name.split(' ')[0].toLowerCase();
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} sx={{ padding: '0.5rem' }} key={index} spacing={2}>
                      <Card>
                        <CardActionArea>
                          <CardMedia
                            className="h-36 "
                            component="img"
                            image={
                              // item.carAppearance.introImgs.length > 5
                              //   ? getImgFromAPI(item.carAppearance.introImgs)
                              //   : getImgFromAPI(item.carAppearance.imgs)
                              imgFromFirebase[index]
                            }
                            alt="green iguana"
                          />
                          <CardContent sx={{ paddingInline: '1.5rem', minHeight: '8rem' }}>
                            <Typography gutterBottom variant="h6" component="div">
                              {item.name}
                            </Typography>
                            <Typography fontSize="0.875rem" color="text.secondary">
                              {`From: ${item.price}`}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Link
                            to={`/brand/${cutBrandName}/${item.name.toLocaleLowerCase()}/${item.id}`}
                            className="flex w-full"
                          >
                            <MuiBrandButton variant="contained" type="button" style={SubmitButtonStyle}>
                              Discover more
                            </MuiBrandButton>
                          </Link>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          )}
        </div>
      </ContainerGrey>

      <SecondContainerWhite>
        <div className="brand_item-detail  mt-12" ref={brandItemRef}>
          <div className="brand-detail-description p-4">
            <div
              className="render-detail mb-4 leading-7"
              dangerouslySetInnerHTML={{ __html: modifiedDescription }}
            ></div>
          </div>
        </div>
      </SecondContainerWhite>
    </Container>
  );
};
