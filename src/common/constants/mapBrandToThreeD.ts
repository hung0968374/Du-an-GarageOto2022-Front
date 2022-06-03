type CamPosition = {
  x: number;
  y: number;
  z: number;
};
type CameraType = {
  position?: CamPosition;
};
type ScaleType = {
  x: number;
  y: number;
  z: number;
};
export type MapBrandTo3DValue = {
  link: string;
  camera?: CameraType;
  scale?: ScaleType;
};
export type MapBrandToThreeDInfo = {
  [key: string]: MapBrandTo3DValue[];
};
export const mapBrandsToThreeDInfo: MapBrandToThreeDInfo = {
  bentley: [
    {
      link: 'models/bentley/scene.gltf',
    },
  ],
  bmw: [
    {
      link: 'models/bmw/scene.gltf',
    },
  ],
  bugatti: [
    {
      link: 'models/bugatti/scene.gltf',
    },
  ],
  ferrari: [
    {
      link: 'models/ferrari/challenge/scene.gltf',
    },
  ],
  lamborghini: [
    {
      link: 'models/lamborghini/scene.gltf',
    },
  ],
  mercedes: [
    {
      link: 'models/mercedes/amg/scene.gltf',
    },
    {
      link: 'models/mercedes/concept/scene.gltf',
    },
    {
      link: 'models/mercedes/mclaren/scene.gltf',
    },
  ],
  porsche: [
    {
      link: 'models/porsche/scene.gltf',
    },
  ],
  'rolls-royce': [
    {
      link: 'models/rolls-royce/scene.gltf',
    },
  ],
  tesla: [
    {
      link: 'models/tesla/scene.gltf',
      camera: {
        position: {
          x: -50,
          y: 300,
          z: 1000,
        },
      },
      scale: {
        x: 2,
        y: 2,
        z: 2,
      },
    },
  ],
};
