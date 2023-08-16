import Chart from "chart.js/auto";

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

export function makeChart(ctx:HTMLCanvasElement) {
  const chartData = data();
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