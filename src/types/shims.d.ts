declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Allow importing .json files
declare module '*.json' {
  const value: any;
  export default value;
}

