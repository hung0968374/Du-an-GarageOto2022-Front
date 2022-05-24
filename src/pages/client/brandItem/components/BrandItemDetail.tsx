import React from 'react';

import { replaceDirtyImgUrls } from '../../../../common/helper/image';
import { CarDetailImgs } from '../../../../common/hooks/useFetchImgs';
import { SecondContainerWhite } from '../../../../components/MuiStyling/MuiStyling';
import { BrandItemAttributes } from '../BrandItem';

interface BrandItemDetailProps {
  brandItemRef: React.RefObject<HTMLDivElement>;
  brandItemAPI: BrandItemAttributes;
  imgObj: CarDetailImgs;
}

export const BrandItemDetail: React.FC<BrandItemDetailProps> = ({ brandItemRef, brandItemAPI, imgObj }) => {
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
  return (
    <SecondContainerWhite>
      <div className="brand_item-detail  mt-12" ref={brandItemRef}>
        <div className="brand-detail-description p-4">
          <div className="render-detail mb-4 leading-7" dangerouslySetInnerHTML={{ __html: modifiedDescription }}></div>
        </div>
      </div>
    </SecondContainerWhite>
  );
};
