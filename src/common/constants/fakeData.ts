export interface TeamAttributes {
  name: string;
  facebookLink: string;
  shortHand: string;
  imgLink: string;
}

export const OUR_TEAMS: TeamAttributes[] = [
  {
    name: 'Bùi Quang Khải',
    facebookLink: 'https://www.facebook.com/buiquangkhai297',
    shortHand: 'Khai',
    imgLink: '../../../../public/imgs/members/Khai.png',
  },
  {
    name: 'Nguyễn Hữu Hùng',
    facebookLink: 'https://www.facebook.com/BTHung.2807',
    shortHand: 'Hung',
    imgLink: '../../../../public/imgs/members/Hung.jpg',
  },
  {
    name: 'Nguyễn Hoàng Long',
    facebookLink: 'https://www.facebook.com/long.nguyenhoang.9237',
    shortHand: 'Long',
    imgLink: '../../../../public/imgs/members/Long.jpg',
  },
  {
    name: 'Phùng Tiến Hưng',
    facebookLink: 'https://www.facebook.com/tienhung2k',
    shortHand: 'Hungw',
    imgLink: '../../../../public/imgs/members/Hungw.jpg',
  },
  {
    name: 'Vũ Minh Hiếu',
    facebookLink: 'https://www.facebook.com/vuminhhieu1305',
    shortHand: 'Hieu',
    imgLink: '../../../../public/imgs/members/Hieu.jpg',
  },
];

export const brandWallpapers = {
  bentley: 'https://wallpaperaccess.com/full/4099993.jpg',
  bmw: 'https://wallpaperaccess.com/full/1125033.jpg',
  mercedes: 'https://wallpaperaccess.com/full/797996.jpg',
  porsche: 'https://wallpaperaccess.com/full/1217137.jpg',
  'rolls-royce': 'https://www.hdcarwallpapers.com/walls/rolls_royce_wraith_2014-wide.jpg',
  bugatti: 'https://wallpaper.dog/large/20505665.jpg',
  lamborghini: 'https://wallpaperaccess.com/full/1214161.jpg',
  tesla: 'https://wallpaperaccess.com/full/486595.jpg',
  ferrari: 'https://wallpaperaccess.com/full/35833.jpg',
  vinfast: 'https://wallpapercave.com/wp/wp8806155.jpg',
};

export const allBrand = [
  'Bentley',
  'BMW',
  'Mercedes',
  'Porsche',
  'Rolls Royce',
  'Bugatti',
  'Lamborghini',
  'Tesla',
  'Ferrari',
  'Vinfast',
];

export const allPrice = [
  'Under 100,000USD',
  '100,000USD to 200,000USD',
  '200,000USD to 300,000USD',
  '300,000USD to 500,000USD',
  '500,000USD to 1,000,000USD',
  'Over 1,000,000USD',
];

export const allSeat = [{ label: '2' }, { label: '4' }, { label: '5' }, { label: '7' }];
