import React, { useCallback, useState, useMemo } from 'react';

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
  return { setCarsImgsFromFirebase };
};

export default useBrandDetail;
