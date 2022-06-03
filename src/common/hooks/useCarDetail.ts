import { useCallback, useState } from 'react';

import { removeTagsFromString } from '../helper/string';
import { replaceDirtyImgUrls } from '../helper/image';

import { useFetchImgs } from './useFetchImgs';

const useCarDetail = () => {
  const { getImgFromFirebase } = useFetchImgs();
  const [fetchingCars, setFetchingCars] = useState(false);

  const reformatCars = useCallback(
    async (cars: Array<any>) => {
      setFetchingCars(true);
      const newCars = await Promise.all(
        cars?.map(async (car: any) => {
          const regExp = /[a-zA-Z]/g;
          const carImg: string = replaceDirtyImgUrls(car?.carAppearance?.introImgs)?.[0];
          const subCarImg: string = replaceDirtyImgUrls(car?.carAppearance?.imgs)?.[0];
          if (carImg) {
            car.introImg = await getImgFromFirebase(carImg);
          } else {
            car.introImg = await getImgFromFirebase(subCarImg);
          }
          car.introReview = removeTagsFromString(car.introReview)
            .split(`","`)
            .filter((str) => {
              return regExp.test(str);
            })
            .join()
            .replaceAll(`\\`, '')
            .replaceAll(`.,`, '. ')
            .replaceAll('&nbsp;', '');
          const firstTwo = car.introReview.slice(0, 2);
          if (firstTwo === `["`) {
            car.introReview = car.introReview.slice(2);
          }
          return car;
        }),
      );
      setFetchingCars(false);
      return newCars;
    },
    [getImgFromFirebase],
  );
  return { fetchingCars, reformatCars };
};

export default useCarDetail;
