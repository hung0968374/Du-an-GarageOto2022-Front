import React, { useEffect, useRef } from 'react';

import { Collada } from '../../../common/helper/collada';

const Coll = () => {
  const containerRef = useRef<any>();
  useEffect(() => {
    Collada(containerRef.current);
  }, []);
  return <div ref={containerRef}></div>;
};

export default Coll;
