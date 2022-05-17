import React, { useEffect, useState } from 'react';

import './Loading.scss';
import { MobileLoading } from './mobile/MobileLoading';
import { ComputerLoading } from './computer/ComputerLoading';

export const Loading = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [renderView, setRenderView] = useState<'Mobile' | 'PC'>(window.innerWidth > 768 ? 'PC' : 'Mobile');

  window.addEventListener('resize', function () {
    setInnerWidth(window.innerWidth);
  });

  useEffect(() => {
    if (innerWidth < 768) {
      setRenderView('Mobile');
    } else {
      setRenderView('PC');
    }
  }, [innerWidth]);

  return <div className="loading">{renderView === 'PC' ? <ComputerLoading /> : <MobileLoading />}</div>;
};
