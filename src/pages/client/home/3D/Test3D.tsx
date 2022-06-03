import React from 'react';

import Gtlf from './Gtlf';
import './threeD.scss';

const Test3D = () => {
  const brand = 'tesla';
  return (
    <div className="scene">
      <Gtlf brand={brand} />
    </div>
  );
};

export default Test3D;
