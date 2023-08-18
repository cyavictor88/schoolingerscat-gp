import Chart from "chart.js/auto";
import { Simpson } from "./Simpson";

function linspace(startValue:number , stopValue:number, cardinality:number) {
  const arr = [];
  const step = (stopValue - startValue) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) arr.push(startValue + (step * i));
  return arr;
}

export function data():{x:number,y:number}[] {
  const xs = linspace(-5,5,100);
  const ys = xs.map(x=> x**3 -12*x +16)// = (x-2)**2 * (x+4)*1 ;
  const arr = [];
  for (let i = 0; i < xs.length; i++) arr.push({x:xs[i],y:ys[i]});
  return arr
}


function fsData(){
  const T = 12;
  const funcCos = (t:number,k:number) => ((t+0)**3-12*(t+0)+16) * Math.cos(k*(t+0)*2*Math.PI/T)*2/T;
  const funcSin = (t:number,k:number) => ((t+0)**3-12*(t+0)+16) * Math.sin(k*(t+0)*2*Math.PI/T)*2/T;
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
  const xs = linspace(-5,5,100);
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
          label: 'y(t) = t^3 - 12t + 16',
          data: chartData,
          borderWidth: 1,
          pointStyle: false,
          showLine: true,
          borderColor: 'red',
          backgroundColor: 'red'
        },
        {
          label: 'fourier series approx',
          data: chartData2,
          borderWidth: 2,
          pointStyle: false,
          showLine: true,
          borderColor: 'blue',
          backgroundColor: 'blue'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y :{
          min:chartData[0].y,
          max:chartData[chartData.length-1].y,
        }
        }
    }
  });
}