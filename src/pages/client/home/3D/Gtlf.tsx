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
    if (containerRef.current) {
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.lastChild);
      }
      gltfLoader({ container: containerRef.current, obj });
    }
  }, [obj]);

  return (
    <>
      <div ref={containerRef}></div>
    </>
  );
};

const MemoGtlf = React.memo(Gtlf);

export default MemoGtlf;
