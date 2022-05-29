import { Autocomplete, Grid, TextField } from '@mui/material';
import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { allBrand } from '../../../../common/constants/fakeData';
import { handleBrandInURL, handleBrandName, shortcutDescription } from '../../../../common/helper/brand';
import { replaceDirtyImgUrls } from '../../../../common/helper/image';
import useBrandDetail from '../../../../common/hooks/useBrandDetail';
import { CarDetailImgs } from '../../../../common/hooks/useFetchImgs';
import { SecondContainerWhite, TransparentBrandButton } from '../../../../common/components/MuiStyling/MuiStyling';
import { BodyTypeAttributes, BrandItemAttributes } from '../brand';

type Props = {
  discoverRef: React.RefObject<HTMLDivElement>;
  brandItemRef: React.RefObject<HTMLDivElement>;
  brandDetailInfos: BrandItemAttributes;
  imgObj: CarDetailImgs;
  brandNameSelectValue: string | null;
  bodyTypeInForm: string | null;
  setBrandNameSelectValue: React.Dispatch<React.SetStateAction<string | null>>;
  setBodyTypeInForm: React.Dispatch<React.SetStateAction<string | null>>;
  brandName?: string;
  availableBodyTypes: BodyTypeAttributes[];
};

const BrandItemIntroduce = (
  {
    discoverRef,
    brandItemRef,
    brandDetailInfos,
    imgObj,
    brandNameSelectValue,
    bodyTypeInForm,
    brandName,
    setBrandNameSelectValue,
    setBodyTypeInForm,
    availableBodyTypes,
  }: Props,
  brandCarsRef: any,
) => {
  const navigate = useNavigate();
  const { modifiedDescription } = useBrandDetail();

  const allBodyType = availableBodyTypes.map((item) => item.design);
  const originalImgs = React.useMemo(() => {
    return replaceDirtyImgUrls(brandDetailInfos?.descriptionImgs)?.map((url: string) => {
      return '..' + url;
    });
  }, [brandDetailInfos.descriptionImgs]);

  const brandDescription = modifiedDescription({
    brandDetailInfos,
    originalImgs,
    imgObj,
  });

  return (
    <SecondContainerWhite maxWidth={false} ref={discoverRef}>
      <div className="brand_item-introduction">
        <div className="all-brand-body_type py-4">
          <Autocomplete
            value={
              brandNameSelectValue !== '' && brandNameSelectValue !== null
                ? brandNameSelectValue
                : handleBrandName(brandName)
            }
            onChange={(event: any, newValue: string | null) => {
              setBrandNameSelectValue(newValue);
              newValue !== null && navigate(`${handleBrandInURL(newValue as string)}`);
            }}
            sx={{ width: '15rem', marginLeft: '1rem' }}
            options={allBrand}
            renderInput={(params) => <TextField {...params} label="Hãng" />}
            blurOnSelect={true}
          />
          <Autocomplete
            value={bodyTypeInForm}
            onChange={(_event: any, newValue: string | null) => {
              const element = brandCarsRef.current?.getBoundingClientRect()?.top + window.scrollY - 150;
              window.scroll({
                top: element,
                behavior: 'smooth',
              });

              if (newValue === null) newValue = '';
              setBodyTypeInForm(newValue);
            }}
            sx={{ width: '15rem', marginLeft: '1rem' }}
            options={allBodyType}
            renderInput={(params) => <TextField {...params} label="Thiết kế" />}
            blurOnSelect={true}
          />
        </div>

        <div className="brand-short-description p-4">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <img src={brandDetailInfos?.brandImg} alt="" />
            </Grid>
            <Grid item xs={12} md={8}>
              <div
                className="mb-4 text-justify leading-6"
                dangerouslySetInnerHTML={{ __html: shortcutDescription(brandDescription) }}
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

export default forwardRef(BrandItemIntroduce);
