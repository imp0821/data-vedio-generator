import React from 'react';
import ReactDOM from 'react-dom';

export const paras = {
    pie: {
      stroke1:10,
      stroke2:10,
      r1:10,
      r2:10,
      textSize:10
    },
    dark: {
      foreground: '#000000',
      background: '#eeeeee',
    },
  };

// 确保默认值按类型传递
// createContext() 匹配的属性是 Consumers 所期望的
export const ParaContext = React.createContext({
    togglePara: (e,name) => {},
});