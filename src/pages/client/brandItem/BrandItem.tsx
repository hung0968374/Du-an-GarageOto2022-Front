import { Container, Typography, Box } from '@mui/material';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import './BrandItem.scss';
import { TransparentButton } from '../../../components/MuiStyling/MuiStyling';
import clientService from '../../../services/clientService';
import { useFetchImgs } from '../../../common/hooks/useFetchImgs';
import { replaceDirtyImgUrls } from '../../../common/helper/image';
import { brandWallpapers } from '../../../common/constants/fakeData';
import { FilterBrandItemInput } from '../../../common/interfaces/Auth';

import { BrandItemIntroduce } from './components/BrandItemIntroduce';
import { BrandItemMain } from './components/BrandItemMain';
import { BrandItemDetail } from './components/BrandItemDetail';

export interface BrandItemAttributes {
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

type RatingPointAttrs = {
  carId: number;
  id: number;
  ratingPoint: string;
  userId: number;
};

export interface CarAttributes {
  id: string;
  name: string;
  price: string;
  seat: string;
  carAppearance: CarImgAttributes;
  ratingPoints: RatingPointAttrs;
}

export interface BodyTypeAttributes {
  design: string;
}

export interface SeatAttributes {
  seats: string;
}

const mainImgStyle = (brand: string | undefined) => {
  if (!brand) return;
  const temp: any = brandWallpapers;
  const carBrand: string = brand;
  const img = temp[carBrand];
  return {
    minHeight: '100vh',
    width: '100%',
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
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
  const [brandNameSelectValue, setBrandNameSelectValue] = React.useState<string | null>('');
  const [bodyTypeFormAPI, setBodyTypeFormAPI] = React.useState<Array<BodyTypeAttributes>>([]);
  const [seatFromAPI, setSeatFromAPI] = React.useState<Array<SeatAttributes>>([]);
  const [bodyTypeInForm, setBodyTypeInForm] = useState<string | null>('');
  const [priceInForm, setPriceInForm] = useState<string | null>('');
  const [seatInForm, setSeatInForm] = useState<string | null>('');
  const [radioASC, setRadioASC] = React.useState<string>('asc');
  const [filterCarAPI, setFilterCarAPI] = useState<Array<CarAttributes>>([]);
  const [loadingFirebaseImg, setLoadingFirebaseImg] = useState(false);

  const { imgObj, downloadImgsFromFirebase, getImgFromFirebase } = useFetchImgs();
  const params = useParams();

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
    if (filterCarAPI.length > 0) {
      setLoadingFirebaseImg(true);
      const newImgs = await Promise.allSettled(
        filterCarAPI.map((car: any) => {
          let carImg = '';
          let tinbanxeImg;
          if (car.carAppearance.newIntroImgs.length < 5) {
            const carIntroImgs = replaceDirtyImgUrls(car.carAppearance.imgs, false);
            if (carIntroImgs) {
              return Promise.resolve(carIntroImgs[0]);
            }
          }
          const firebaseImgUrls = replaceDirtyImgUrls(car.carAppearance.newIntroImgs);
          const tinbanxeImgs = replaceDirtyImgUrls(car.carAppearance.introImgs, false);
          if (tinbanxeImgs && firebaseImgUrls) {
            if (firebaseImgUrls?.length === 1) {
              carImg = firebaseImgUrls[0];
              tinbanxeImg = tinbanxeImgs[0];
            } else {
              carImg = firebaseImgUrls[1];
              tinbanxeImg = tinbanxeImgs[1];
            }
          }
          const carImgRes = getImgFromFirebase(carImg, tinbanxeImg);
          return carImgRes;
        }),
      );
      const availableImgs = newImgs.reduce((acc: any, promise: any) => {
        if (promise.status === 'fulfilled') {
          acc.push(promise.value);
          return acc;
        }
        return acc;
      }, []) as any;
      setImgFromFirebase(availableImgs);
      setLoadingFirebaseImg(false);
    }
  }, [getImgFromFirebase, filterCarAPI]) as any;
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

    const getBodyTypeApi = async (brand: string) => {
      try {
        const response = await clientService.getAllBrandItemAttribute(brand);
        setBodyTypeFormAPI(response.result.designAttribute);
        setSeatFromAPI(response.result.seatAttribute);
      } catch (error: any) {
        console.log(error.response);
      }
    };

    getBrandApi(brandName as string);
    getCarByBrandNameApi(brandName as string);
    getBodyTypeApi(brandName as string);
  }, [brandName]);

  useEffect(() => {
    const filterInBrandItemApi = async (param: FilterBrandItemInput) => {
      try {
        const response = await clientService.filterInBrandItem(param);
        setFilterCarAPI(response.filterCar);
      } catch (error: any) {
        console.log(error);
      }
    };

    filterInBrandItemApi({
      brandName: brandName as string,
      designType: bodyTypeInForm as string,
      price: priceInForm as string,
      seat: seatInForm as string,
      radio: radioASC,
    });
  }, [brandName, bodyTypeInForm, priceInForm, seatInForm, radioASC]);

  React.useEffect(() => {
    const fetchImgs = async () => {
      await downloadImgsFromFirebase({ brandImgs: brandImgUrls });
    };
    fetchImgs();
  }, [downloadImgsFromFirebase, brandImgUrls]);

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

      <BrandItemIntroduce
        discoverRef={discoverRef}
        brandItemRef={brandItemRef}
        brandItemAPI={brandItemAPI}
        imgObj={imgObj}
        brandNameSelectValue={brandNameSelectValue}
        setBrandNameSelectValue={setBrandNameSelectValue}
        brandName={brandName}
        bodyTypeFormAPI={bodyTypeFormAPI}
        bodyTypeInForm={bodyTypeInForm}
        setBodyTypeInForm={setBodyTypeInForm}
      />

      <BrandItemMain
        brandName={brandName}
        carInfoAPI={carInfoAPI}
        imgFromFirebase={imgFromFirebase}
        seatFromAPI={seatFromAPI}
        priceInForm={priceInForm}
        seatInForm={seatInForm}
        setPriceInForm={setPriceInForm}
        setSeatInForm={setSeatInForm}
        radioASC={radioASC}
        setRadioASC={setRadioASC}
        filterCarAPI={filterCarAPI}
        loadingFirebaseImg={loadingFirebaseImg}
      />

      <BrandItemDetail brandItemRef={brandItemRef} brandItemAPI={brandItemAPI} imgObj={imgObj} />
    </Container>
  );
};
