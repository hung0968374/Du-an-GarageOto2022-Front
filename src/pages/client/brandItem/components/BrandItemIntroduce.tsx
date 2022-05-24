import { Autocomplete, Grid, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { allBrand } from '../../../../common/constants/fakeData';
import { routerPath } from '../../../../common/constants/routerPath';
import { replaceDirtyImgUrls } from '../../../../common/helper/image';
import { CarDetailImgs } from '../../../../common/hooks/useFetchImgs';
import { SecondContainerWhite, TransparentBrandButton } from '../../../../components/MuiStyling/MuiStyling';
import { BodyTypeAttributes, BrandItemAttributes } from '../BrandItem';

import { capitalizeFirstLetter } from './BrandItemMain';

interface BrandItemIntroduceProps {
  discoverRef: React.RefObject<HTMLDivElement>;
  brandItemRef: React.RefObject<HTMLDivElement>;
  brandItemAPI: BrandItemAttributes;
  imgObj: CarDetailImgs;
  brandNameSelectValue: string | null;
  bodyTypeInForm: string | null;
  setBrandNameSelectValue: React.Dispatch<React.SetStateAction<string | null>>;
  setBodyTypeInForm: React.Dispatch<React.SetStateAction<string | null>>;
  brandName?: string;
  bodyTypeFormAPI: BodyTypeAttributes[];
}

export const BrandItemIntroduce: React.FC<BrandItemIntroduceProps> = ({
  discoverRef,
  brandItemRef,
  brandItemAPI,
  imgObj,
  brandNameSelectValue,
  bodyTypeInForm,
  brandName,
  setBrandNameSelectValue,
  setBodyTypeInForm,

  bodyTypeFormAPI,
}) => {
  const navigate = useNavigate();

  const allBodyType = bodyTypeFormAPI.map((item) => item.design);

  const handleBrandDescription = (description: string) => {
    let newDes: any = description?.slice(1, -1);
    newDes = newDes.split('\\n').map((el: any) => {
      return el;
    });
    const temp = newDes.splice(0, newDes.length / 2);
    return [...temp, ...newDes].join();
  };

  const originalImgs = React.useMemo(() => {
    return replaceDirtyImgUrls(brandItemAPI?.descriptionImgs)?.map((url: string) => {
      return '..' + url;
    });
  }, [brandItemAPI.descriptionImgs]);

  const modifiedDescription = React.useMemo(() => {
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

  const shortcutDescription = (des: string) => {
    if (des?.length >= 400) return des?.slice(0, 400) + '...';
    return des + '...';
  };

  const handleBrandName = () => {
    if (brandName === 'bmw') return 'BMW';
    if (brandName === 'rolls-royce') return 'Rolls Royce';
    return capitalizeFirstLetter(brandName as string);
  };

  const handleBrandInURL = (brandName: string) => {
    const numberOfString = brandName.split(' ');
    if (numberOfString.length === 1) {
      return `${routerPath.common.BRAND}/${brandName.toLocaleLowerCase()}`;
    } else {
      const handleBrandName = numberOfString.reduce(
        (previousValue, currentValue) => previousValue + currentValue + '-',
        '',
      );
      const newBrandName = handleBrandName.slice(0, handleBrandName.length - 1); //xoá phần tử cuối của string
      return `${routerPath.common.BRAND}/${newBrandName.toLocaleLowerCase()}`;
    }
  };

  return (
    <SecondContainerWhite maxWidth={false} ref={discoverRef}>
      <div className="brand_item-introduction">
        <div className="all-brand-body_type py-4">
          <Autocomplete
            value={
              brandNameSelectValue !== '' && brandNameSelectValue !== null ? brandNameSelectValue : handleBrandName()
            }
            onChange={(event: any, newValue: string | null) => {
              setBrandNameSelectValue(newValue);
              newValue !== null && navigate(`${handleBrandInURL(newValue as string)}`);
            }}
            sx={{ width: '15rem', marginLeft: '1rem' }}
            options={allBrand}
            renderInput={(params) => <TextField {...params} label="Brand" />}
          />
          <Autocomplete
            value={bodyTypeInForm}
            onChange={(event: any, newValue: string | null) => {
              if (newValue === null) newValue = '';
              setBodyTypeInForm(newValue);
            }}
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
  );
};
