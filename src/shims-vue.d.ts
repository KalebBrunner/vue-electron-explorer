declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<[], [], any>;
  export default component;
}

export {};

declare global {
  interface Window {
    myAPI: {
      findPrime: (upperLimit: number) => Promise<number>;
    };
  }
}
