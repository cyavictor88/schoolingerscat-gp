import { Chart } from "chart.js";
import { Simpson } from "./Simpson";


function linspace(startValue:number , stopValue:number, cardinality:number) {
  const arr = [];
  const step = (stopValue - startValue) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) arr.push(startValue + (step * i));
  return arr;
}

export function data():{x:number,y:number}[] {
  const xs = linspace(-4*Math.PI,4*Math.PI,199);
  const ys = xs.map(t=> 12*Math.cos(2*t)*Math.sin(t) +16)// = (x-2)**2 * (x+4)*1 ;
  const arr = [];
  for (let i = 0; i < xs.length; i++) arr.push({x:xs[i],y:ys[i]});
  return arr
}

function fsData(){
  const T = 2*Math.PI;
  const funcCos = (t:number,k:number) => (12*Math.cos(2*t)*Math.sin(t) +16) * Math.cos(k*(t+0)*2*Math.PI/T)*2/T;
  const funcSin = (t:number,k:number) => (12*Math.cos(2*t)*Math.sin(t) +16) * Math.sin(k*(t+0)*2*Math.PI/T)*2/T;
  const simpCos = new Simpson(funcCos);
  const simpSin = new Simpson(funcSin);
  const ks = Array.from({length:45},(_,i)=>i);
  const ak:number[] = [];
  const bk:number[] = [];
  ks.forEach(k=>{
    ak.push(simpCos.integrate(-T/2,T/2,k,1000));
    bk.push(simpSin.integrate(-T/2,T/2,k,1000));
  });
  ak[0] = ak[0]/2;

  // console.log('ak',ak.map(x=>x.toFixed(0)))
  // console.log('bk',bk.map(x=>x.toFixed(0)))
  const xs = linspace(-4*Math.PI,4*Math.PI,199);
  const ys = xs.map((x,i)=>{
    let cos = 0;
    let sin = 0;
    ks.forEach(k=>{
      cos += ak[k]*Math.cos(2*Math.PI*k*x/T);
      sin += bk[k]*Math.sin(2*Math.PI*k*x/T);
    })
    return cos+sin;
  });
  const arr = [];
  for (let i = 0; i < xs.length; i++) arr.push({x:xs[i],y:ys[i]});
  return arr
}

export function makeChart(ctx:HTMLCanvasElement) {
  const chartData = data();
  const chartData2 = fsData();
  return new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'y(t) =  12cos(2t)sin(t) + 16',
          data: chartData,
          borderWidth: 5,
          pointStyle: false,
          showLine: true,
          borderColor: 'rgba(0, 255, 0, 0.5)',
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
        },
        {
          label: 'fourier series decomposition',
          data: chartData2,
          borderWidth: 2,
          pointStyle: false,
          showLine: true,
          borderColor: 'black',
          backgroundColor: 'black'
        }
      ]
    },
    options: {
      // plugins: {
      //   zoom: {
      //     zoom: {
      //       wheel: {
      //         enabled: true,
      //       },
      //       pinch: {
      //         enabled: true
      //       },
      //       mode: 'xy',
      //     }
      //   }
      // },
      responsive: true,
      maintainAspectRatio: false,
      // scales: {
      //   y :{
      //     min:chartData[0].y,
      //     max:chartData[chartData.length-1].y,
      //   }
      //   }
    }
  });
}