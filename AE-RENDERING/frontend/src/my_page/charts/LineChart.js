import React, { useRef, useEffect } from 'react';
import {Line} from '@antv/g2plot'

function LineChart (props)  {
  const data= props.chartData;
  const container = useRef(null);
  useEffect(() => {
    if (!container.current) {
      return;
    }
    const LinePlot = new Line(container.current, {
        data,
        xField: 'dataId',
        yField: 'value',
        seriesField: 'dataType',
        yAxis: {
          label: {
             
          },
        },
        legend: {
          position: 'top',
        },
        point: {
      size: 5,
      //animate:Boolean,
      shape: 'diamond',
      style: {
        stroke: '#FE740C',
        lineWidth: 2,
        fillOpacity: 0.6,
      },
    },
        smooth: true,
        // @TODO 后续会换一种动画方式
        animation: {
          appear: {
            animation: 'wave-in',
            duration: 5000,
          },
        },lineStyle:{
    lineWidth: 2,
    //lineDash: [4,5],
    strokeOpacity: 0.7,
    //shadowColor: 'black',
    //shadowBlur: 10,
    //shadowOffsetX: 5,
    //shadowOffsetY: 5,
    cursor: 'pointer'
  },
        annotations: [
      {
        type: 'text',
        position: ['min', 'median'],
        content: '辅助标记',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      
      {
        type: 'line',
        start: ['min', 'median'],
        end: ['max', 'median'],
        style: {
          stroke: 'red',
          lineDash: [2, 2],
        },
      },
      
    ],
      });
    LinePlot.render();
  }, []);

  return (
    <div>
      <div ref={container} />
    </div>
  ); 
};

export default LineChart;