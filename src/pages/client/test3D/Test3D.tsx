import React from 'react';

import Coll from './Collada';
import ThreeDcomponent from './ThreeDcomponent';
import ThreeD_Test from './ThreeD_TestComponent';

const Test3D = () => {
  const threeRef = React.useRef<any>();
  return (
    <div ref={threeRef}>
      <ThreeD_Test />
      {/* <Coll /> */}
    </div>
  );
};

export default Test3D;
