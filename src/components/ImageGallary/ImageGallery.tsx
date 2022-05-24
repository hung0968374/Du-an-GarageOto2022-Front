import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import './ImgStyle.scss';
const TempImageGallary: React.FC<any> = ({ urls = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        spaceBetween={5}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="img-swiper-container-1"
      >
        {urls.map((imgUrl: string, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <img className="img-style-1" src={imgUrl} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper as any}
        slidesPerView={4}
        spaceBetween={5}
        pagination={{
          clickable: false,
        }}
        modules={[Pagination]}
        className="img-swiper-container-2"
      >
        {urls.map((imgUrl: string, idx: any) => {
          return (
            <SwiperSlide key={idx}>
              <div className="img-2-wrapper">
                <img className="img-style-2" src={imgUrl} alt="" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

const ImageGallary = React.memo(TempImageGallary);
export { ImageGallary };
