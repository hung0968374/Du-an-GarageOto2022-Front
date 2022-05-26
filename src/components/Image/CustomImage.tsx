import React from 'react';

type CustomImage = {
  source: string;
  alt?: string;
  style?: any;
};

const CustomImage = ({ source, alt = '', style = {} }: CustomImage) => {
  return (
    <img
      style={style}
      alt={alt}
      src={source}
      onError={({ currentTarget }: any) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png';
      }}
    />
  );
};

export default CustomImage;
