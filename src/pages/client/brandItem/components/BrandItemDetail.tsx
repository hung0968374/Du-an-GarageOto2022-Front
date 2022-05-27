import React from 'react';

import { BrandItemAttributes } from '../brand';
import { handleBrandDescription } from '../../../../common/helper/brand';
import { replaceDirtyImgUrls } from '../../../../common/helper/image';
import useBrandDetail from '../../../../common/hooks/useBrandDetail';
import { CarDetailImgs } from '../../../../common/hooks/useFetchImgs';
import { SecondContainerWhite } from '../../../../components/MuiStyling/MuiStyling';

interface BrandItemDetailProps {
  brandItemRef: React.RefObject<HTMLDivElement>;
  brandDetailInfos: BrandItemAttributes;
  imgObj: CarDetailImgs;
}

export const BrandItemDetail: React.FC<BrandItemDetailProps> = ({ brandItemRef, brandDetailInfos, imgObj }) => {
  const { modifiedDescription } = useBrandDetail();

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
    <SecondContainerWhite>
      <div className="brand_item-detail  mt-12" ref={brandItemRef}>
        <div className="brand-detail-description p-4">
          <div className="render-detail mb-4 leading-7" dangerouslySetInnerHTML={{ __html: brandDescription }}></div>
        </div>
      </div>
    </SecondContainerWhite>
  );
};
