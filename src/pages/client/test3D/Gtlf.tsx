import React, { useCallback, useEffect, useRef } from 'react';

import { gltdLoader } from '../../../common/helper/gltf/gltf';
import { gltfLoader } from '../../../common/helper/gltf/gltfYou';

const Gtlf = () => {
  const containerRef = useRef<any>();
  useEffect(() => {
    gltfLoader(containerRef.current);
    // gltdLoader(containerRef.current);
  }, []);

  return (
    <>
      <div ref={containerRef}></div>
    </>
  );
};

export default Gtlf;
