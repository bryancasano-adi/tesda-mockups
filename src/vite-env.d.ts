/// <reference types="vite/client" />

declare module '*.css' {
  const content: string;
  export default content;
}

declare module 'react-quill' {
  import { Component } from 'react';
  
  interface ReactQuillProps {
    theme?: string;
    value: string;
    onChange: (value: string) => void;
    modules?: Record<string, any>;
    formats?: string[];
    placeholder?: string;
    readOnly?: boolean;
    [key: string]: any;
  }
  
  class ReactQuill extends Component<ReactQuillProps> {}
  export default ReactQuill;
}

declare module 'react-quill/dist/quill.snow.css' {
  const content: string;
  export default content;
}
