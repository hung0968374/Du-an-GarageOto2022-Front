import React, { useCallback } from 'react';

import { handleBrandDescription } from '../helper/brand';
import { replaceDirtyImgUrls } from '../helper/image';

const useBrandDetail = () => {
  const setCarsImgsFromFirebase = useCallback(
    async ({ filterCarAPI, setLoadingFirebaseImg, setCarsImgsUsingFirebase, getImgFromFirebase }: any) => {
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
        setCarsImgsUsingFirebase(availableImgs);
        setLoadingFirebaseImg(false);
      }
    },
    [],
  );

  const modifiedDescription = React.useCallback(({ brandDetailInfos, originalImgs, imgObj }: any) => {
    let temp = handleBrandDescription(brandDetailInfos?.descriptions as string)
      .replaceAll('>,', '>')
      .replaceAll(`\\`, '');
    originalImgs?.forEach((originalImg: any, idx: number) => {
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
  }, []);

  return { setCarsImgsFromFirebase, modifiedDescription };
};

export default useBrandDetail;
