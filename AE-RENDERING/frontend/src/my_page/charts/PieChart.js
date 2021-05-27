import React, { useRef, useEffect } from 'react';
import {Chart} from '@antv/g2'
import {DataSet} from '@antv/data-set'

function PieChart (props)  {
 
  const data = props.chartData;
  //console.log(data2)
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }
    // const sum=data[0].value+data[1].value+data[2].value+data[3].value;
    let sum = 0;
    for(let i=0;i<data.length;i++){
      sum += data[i].value;
    }
    const ds = new DataSet();
    const dv = ds.createView();
    dv.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'percent',
    });

    const colorMap = {
      data0: '#1890ff',
      data1: '#13c2c2',
      data2: '#ffc53d',
      data3: '#73d13d',
      data4: '#73d13d',
      data5: '#73d13d',
    };

    const chart = new Chart({
      container: container.current,
      autoFit: true,
      height: 500,
    });
    chart.data(dv.rows);
    chart.legend(false);
    chart.coordinate('theta', {
      radius: 0.8,
      innerRadius: 0,
    });
    chart.tooltip({
      showMarkers: false
    });
    chart
      .interval()
      .adjust('stack')
      .position('percent')
      .color('pink', (val) => colorMap[val])
      .style({
        stroke: 'black',
        lineWidth: 0,
      })
      .label("value",(xValue) => {
      return {
        content: parseInt(sum/sum*100) + '%',//中心字
      };}, {
        offsetX: 10, // 在 offset 的基础上 x 方向的偏移量
        offsetY: -40,
        rotate: 0,
        style: {
          fontSize: '70', // 文本大小
          fontWeight: 'bold',
          fill: 'black',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      })
      ;
  
    chart.animate({
      enter: {
        animation: 'fade-in', // 动画名称
        easing: 'easeQuadIn', // 动画缓动效果
        delay: 100, // 动画延迟执行时间
        duration: 600 // 动画执行时间
      }
    });
    const ds2 = new DataSet();
    const dv2 = ds2.createView();
    dv2.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'name',
      as: 'percent',
    });
    const outterView = chart.createView();
    outterView.data(dv2.rows);
    outterView.coordinate('theta', {
      innerRadius: 0.75 / 0.8,
      radius: 0.9,
    });
    outterView
      .interval()
      .adjust('stack')
      .position('percent')
      .color('type*name', (type, name) => colorMap[type])
      .style({
        stroke: 'white',
        lineWidth: 0,
      })
      .label('value',(xValue) => {
      return {
        content: parseInt(xValue/sum*100) + '%',
      };}, {
        offset: 10,
        style: {
          fill: 'black',
          shadowBlur: 0,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      })
      .label(false);

    chart.interaction('element-active')
    chart.render();
  }, []);

  return (
    <div>
      <div ref={container} />
    </div>
  ); 
};

export default PieChart;