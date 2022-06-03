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
  camera: CameraType;
  scale: ScaleType;
  directLightIntensity?: number;
  needAdditionalLight?: boolean;
};
export type MapBrandToThreeDInfo = {
  [key: string]: MapBrandTo3DValue[];
};
export const mapBrandsToThreeDInfo: MapBrandToThreeDInfo = {
  bentley: [
    {
      directLightIntensity: 1,
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
      directLightIntensity: -1,
      link: 'models/bmw/scene.gltf',
      camera: {
        position: {
          x: -50,
          y: 50,
          z: 200,
        },
      },
      scale: {
        x: 1,
        y: 1,
        z: 1,
      },
    },
  ],
  bugatti: [
    {
      needAdditionalLight: true,
      directLightIntensity: 500,
      link: 'models/bugatti/scene.gltf',
      camera: {
        position: {
          x: -50,
          y: 50,
          z: 100,
        },
      },
      scale: {
        x: 18,
        y: 18,
        z: 18,
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
      directLightIntensity: 1,
      link: 'models/lamborghini/scene.gltf',
      camera: {
        position: {
          x: -50,
          y: 300,
          z: 1000,
        },
      },
      scale: {
        x: 1.5,
        y: 1.5,
        z: 1.5,
      },
    },
  ],
  mercedes: [
    {
      directLightIntensity: 1,
      link: 'models/mercedes/amg/scene.gltf',
      camera: {
        position: {
          x: -50,
          y: 300,
          z: 1000,
        },
      },
      scale: {
        x: 1,
        y: 1,
        z: 1,
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
      directLightIntensity: 200,
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
