import React from 'react';

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  //currently using Quang's throttle, if do update to world's throttle
  React.useEffect(() => {
    const temp = () =>
      window.addEventListener('resize', function () {
        setWindowWidth(window.innerWidth);
      });

    setTimeout(() => {
      temp();
    }, 3000);
  }, [window.innerWidth]);

  return [windowWidth];
};
