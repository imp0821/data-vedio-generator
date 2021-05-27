import React, { useRef, useEffect } from 'react';
import {Column} from '@antv/g2plot'

function BarChart (props)  {
  const data = props.chartData;
  // console.log(data)
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }
    const plot = new  Column(container.current, {
          data,
          isGroup: true,
          xField: 'dataId',
          yField: 'value',
          seriesField: 'dataType',
          // 分组柱状图 组内柱子间的间距 (像素级别)
          dodgePadding: 2,
          //柱状的宽度
          maxColumnWidth:50,
          // 分组柱状图 组间的间距 (像素级别)
          intervalPadding: 20,
          columnStyle: {//圆角
            radius: [20, 20, 0, 0],
          },
          label: {
            // 可手动配置 label 数据标签位置
            position: 'top', // 'top', 'middle', 'bottom'
            // 可配置附加的布局方法
            offsetY:0,
            style: {
              
          fill: 'red',//字体颜色
          opacity: 0.6,
          fontSize: 12//字体大小
        },
          },
          xAxis: {//坐标轴
          line: {
            style: {
              stroke: 'white',
              lineWidth: 2,
          }
        }
      },
        yAxis: {
          line: {
            style: {
              stroke: 'white',
              lineWidth: 2,
          }
        }
      },
      animation: {//动画效果
            appear: {
              animation: 'scale-in-y',
              duration: 5000,
            },
        },
        annotations: [//辅助线
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
     
    plot.update({"theme":{"styleSheet":{"brandColor":"#5B8FF9","paletteQualitative10":["#ff0000","#78D3F8","#F6903D","#008685","#F08BB4"],"paletteQualitative20":["#5B8FF9","#CDDDFD","#61DDAA","#CDF3E4","#65789B","#CED4DE","#F6BD16","#FCEBB9","#7262fd","#D3CEFD","#78D3F8","#D3EEF9","#9661BC","#DECFEA","#F6903D","#FFE0C7","#008685","#BBDEDE","#F08BB4","#FFE0ED"]}}});
    plot.render();
  }, []);

  return (
    <div>
      <div ref={container} />
    </div>
  ); 
};

export default BarChart;