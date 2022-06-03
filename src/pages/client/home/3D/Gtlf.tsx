import React, { useEffect, useRef } from 'react';

import { mapBrandsToThreeDInfo } from '../../../../common/constants/mapBrandToThreeD';
import { gltfLoader } from '../../../../common/helper/gltf/gltfYou';

type GLTF = {
  brand: string;
};

const Gtlf = ({ brand }: GLTF) => {
  const containerRef = useRef<any>();
  const obj = mapBrandsToThreeDInfo[brand];
  useEffect(() => {
    gltfLoader({ container: containerRef.current, obj });
  }, [obj]);

  return (
    <>
      <div ref={containerRef}></div>
    </>
  );
};

export default Gtlf;
