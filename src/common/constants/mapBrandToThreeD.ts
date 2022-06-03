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
      camera: {
        position: {
          x: -50,
          y: 300,
          z: 1000,
        },
      },
      scale: {
        x: 0.1,
        y: 0.1,
        z: 0.1,
      },
    },
  ],
  bmw: [
    {
      link: 'models/bmw/scene.gltf',
      camera: {
        position: {
          x: -50,
          y: 50,
          z: 100,
        },
      },
      scale: {
        x: 20,
        y: 20,
        z: 20,
      },
    },
  ],
  bugatti: [
    {
      link: 'models/bugatti/scene.gltf',
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
  ferrari: [
    {
      link: 'models/ferrari/challenge/scene.gltf',
      camera: {
        position: {
          x: -50,
          y: 100,
          z: 200,
        },
      },
      scale: {
        x: 30,
        y: 30,
        z: 30,
      },
    },
  ],
  lamborghini: [
    {
      link: 'models/lamborghini/scene.gltf',
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
  mercedes: [
    {
      link: 'models/mercedes/amg/scene.gltf',
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
    {
      link: 'models/mercedes/concept/scene.gltf',
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
    {
      link: 'models/mercedes/mclaren/scene.gltf',
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
  porsche: [
    {
      link: 'models/porsche/scene.gltf',
      camera: {
        position: {
          x: -50,
          y: 100,
          z: 300,
        },
      },
      scale: {
        x: 20,
        y: 20,
        z: 20,
      },
    },
  ],
  'rolls-royce': [
    {
      link: 'models/rolls-royce/scene.gltf',
      camera: {
        position: {
          x: -50,
          y: 100,
          z: 300,
        },
      },
      scale: {
        x: 100,
        y: 100,
        z: 100,
      },
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
