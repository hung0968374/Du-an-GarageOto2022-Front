import { routerPath } from '../constants/routerPath';

type Brand = {
  [key: string]: string;
};
const availableBrands: Brand = {
  1: 'bentley',
  2: 'bmw',
  3: 'mercedes',
  4: 'porsche',
  5: 'rolls',
  6: 'bugatti',
  7: 'lamborghini',
  8: 'tesla',
  9: 'ferrari',
  10: 'vinfast',
};

export const mapBrandIdToName = (id: number) => {
  if (id) {
    return availableBrands[id.toString()];
  }
  return '';
};

export const handleBrandDescription = (description: string) => {
  let newDes: any = description?.slice(1, -1);
  newDes = newDes.split('\\n').map((el: any) => {
    return el;
  });
  const temp = newDes.splice(0, newDes.length / 2);
  return [...temp, ...newDes].join();
};

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const handleBrandInURL = (brandName: string) => {
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

export const shortcutDescription = (des: string) => {
  if (des?.length >= 400) return des?.slice(0, 400) + '...';
  return des + '...';
};

export const handleBrandName = (brandName: string | undefined) => {
  if (brandName === 'bmw') return 'BMW';
  if (brandName === 'rolls-royce') return 'Rolls Royce';
  return capitalizeFirstLetter(brandName as string);
};
