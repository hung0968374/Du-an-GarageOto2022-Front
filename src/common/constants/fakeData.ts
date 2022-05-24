export interface TeamAttributes {
  name: string;
  description: string;
  facebookLink: string;
  shortHand: string;
}

export const OUR_TEAMS: TeamAttributes[] = [
  {
    name: 'Nguyễn Đức Quang',
    description: 'Team lead, Frontend Developer, Dev-ops',
    facebookLink: 'https://www.facebook.com/profile.php?id=100080053136869',
    shortHand: 'Quang',
  },
  {
    name: 'Bùi Trung Hùng',
    description: 'Data design, Data fetcher, Backend Developer',
    facebookLink: 'https://www.facebook.com/BTHung.2807',
    shortHand: 'Hung',
  },
  {
    name: 'Viết Minh Hiếu',
    description: 'Frontend Developer, Backend Developer',
    facebookLink: 'https://www.facebook.com/profile.php?id=100005054109835',
    shortHand: 'Hieu',
  },
  {
    name: 'Trần Quang Khiêm',
    description: 'Tester, Quality Assurance',
    facebookLink: 'https://www.facebook.com/khiemquangtran2312',
    shortHand: 'Khiem',
  },
  {
    name: 'Trần Hậu',
    description: 'Graphic design, UX/UI designer',
    facebookLink: 'https://www.facebook.com/tranhau.17',
    shortHand: 'Hau',
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
