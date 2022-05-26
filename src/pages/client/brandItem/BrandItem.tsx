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
import MessengerComponent from '../../../components/MessengerChat/MessengerComponent';
import useBrandDetail from '../../../common/hooks/useBrandDetail';

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
  const { imgObj, downloadImgsFromFirebase, getImgFromFirebase } = useFetchImgs();
  const { setCarsImgsFromFirebase } = useBrandDetail();
  const params = useParams();

  const discoverRef = React.useRef<HTMLDivElement>(null);
  const brandItemRef = React.useRef<HTMLDivElement>(null);
  const { brandName } = useParams<string>();
  const [brandDetailInfos, setBrandDetailInfos] = React.useState<BrandItemAttributes>({
    id: '',
    name: '',
    descriptions: '',
    shortDescriptions: '',
    brandImg: '',
    descriptionImgs: '',
  });
  const [carsImgsFromFirebase, setCarsImgsUsingFirebase] = useState<Array<any>>([]);
  const [filterCarAPI, setFilterCarAPI] = useState<Array<CarAttributes>>([]);
  const [loadingFirebaseImg, setLoadingFirebaseImg] = useState(false);

  //// begin filter values
  const [brandNameSelectValue, setBrandNameSelectValue] = React.useState<string | null>('');
  const [availableBodyTypes, setAvailableBodyTypes] = React.useState<Array<BodyTypeAttributes>>([]);
  const [availableSeats, setAvailableSeats] = React.useState<Array<SeatAttributes>>([]);
  const [bodyTypeInForm, setBodyTypeInForm] = useState<string | null>('');
  const [priceInForm, setPriceInForm] = useState<string | null>('');
  const [seatInForm, setSeatInForm] = useState<string | null>('');
  const [radioASC, setRadioASC] = React.useState<string>('asc');
  //// end filter values
  console.log('filterCarAPI', filterCarAPI);

  const brandImgUrls = useMemo(() => {
    return brandDetailInfos.descriptionImgs.split(`","`);
  }, [brandDetailInfos.descriptionImgs]);

  React.useEffect(() => {
    const fetchImgs = async () => {
      await downloadImgsFromFirebase({ brandImgs: brandImgUrls });
    };
    fetchImgs();
  }, [downloadImgsFromFirebase, brandImgUrls]);

  useEffect(() => {
    setCarsImgsFromFirebase({ filterCarAPI, setLoadingFirebaseImg, setCarsImgsUsingFirebase, getImgFromFirebase });
  }, [setCarsImgsFromFirebase, filterCarAPI, setLoadingFirebaseImg, getImgFromFirebase]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const getBrandApi = async (brand: string) => {
      try {
        const response = await clientService.getBrand(brand);
        setBrandDetailInfos(response.brandInfo);
      } catch (error: any) {
        console.log(error.response);
      }
    };

    const getBodyTypeApi = async (brand: string) => {
      try {
        const response = await clientService.getAllBrandItemAttribute(brand);
        setAvailableBodyTypes(response.result.designAttribute);
        setAvailableSeats(response.result.seatAttribute);
      } catch (error: any) {
        console.log(error.response);
      }
    };

    getBrandApi(brandName as string);
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
        brandDetailInfos={brandDetailInfos}
        imgObj={imgObj}
        brandNameSelectValue={brandNameSelectValue}
        setBrandNameSelectValue={setBrandNameSelectValue}
        brandName={brandName}
        availableBodyTypes={availableBodyTypes}
        bodyTypeInForm={bodyTypeInForm}
        setBodyTypeInForm={setBodyTypeInForm}
      />

      <BrandItemMain
        brandName={brandName}
        carsImgsFromFirebase={carsImgsFromFirebase}
        availableSeats={availableSeats}
        priceInForm={priceInForm}
        seatInForm={seatInForm}
        setPriceInForm={setPriceInForm}
        setSeatInForm={setSeatInForm}
        radioASC={radioASC}
        setRadioASC={setRadioASC}
        filterCarAPI={filterCarAPI}
        loadingFirebaseImg={loadingFirebaseImg}
      />

      <BrandItemDetail brandItemRef={brandItemRef} brandDetailInfos={brandDetailInfos} imgObj={imgObj} />
      <MessengerComponent />
    </Container>
  );
};
