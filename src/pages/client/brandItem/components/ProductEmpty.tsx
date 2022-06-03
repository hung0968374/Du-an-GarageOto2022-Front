import React from 'react';

export const ProductEmpty: React.FC = () => {
  return (
    <div className="flex-col">
      <img src="/imgs/brandItem/emptyProduct.svg" className="m-auto w-4/5 xl:w-8/12 2xl:w-3/5 mt-16 mb-6" alt="" />
      <h1 className="text-center font-black sm:text-3xl xl:text-5xl">No car satisfy the condition</h1>
    </div>
  );
};
