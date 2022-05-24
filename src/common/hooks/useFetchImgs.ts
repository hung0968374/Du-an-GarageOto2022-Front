import { useState, useCallback } from 'react';
import 'firebase/compat/storage';
import { ref, getDownloadURL } from 'firebase/storage';

import { storage } from '../../common/config/firebase/config';

type UndefinedUrlObject = {
  [key: string]: Array<string>;
};

export type CarDetailImgs = {
  imgs?: Array<string>;
  introImgs?: Array<string>;
  exteriorReviewImgs?: Array<string>;
  interiorReviewImgs?: Array<string>;
  [key: string]: any;
};

export function useFetchImgs() {
  const [imgObj, setImgObj] = useState<CarDetailImgs>({});

  const listItem = async (starsRef: any, tinbanxeImg?: string) => {
    try {
      return await getDownloadURL(starsRef);
    } catch (error) {
      return Promise.resolve(tinbanxeImg);
    }
  };

  const downloadImgsFromFirebase = useCallback<any>(async (urlObject: CarDetailImgs | UndefinedUrlObject) => {
    try {
      if (typeof urlObject !== 'object') {
        return;
      }
      Object.entries(urlObject).map(async ([key, imgUrls]) => {
        imgUrls = imgUrls.map((url: string) => {
          return url.replaceAll(`\"]`, '').replaceAll(`[\"`, '');
        });
        const firebaseUrls = await Promise.all(
          imgUrls.map((url: string) => {
            const starsRef = ref(storage, url);
            return listItem(starsRef);
          }),
        );
        setImgObj((img: any) => {
          return { ...img, [key]: firebaseUrls };
        });
      });
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const getImgFromFirebase = useCallback((originUrl: string, returnImg = '') => {
    // returnImg: the image will be returned by the function
    //if firebase fails to find its own image based on the given url
    const starsRef = ref(storage, originUrl);
    const img = listItem(starsRef, returnImg);
    return img;
  }, []);

  return { imgObj, downloadImgsFromFirebase, getImgFromFirebase };
}
