function linspace(startValue:number , stopValue:number, cardinality:number) {
  const arr = [];
  const step = (stopValue - startValue) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) arr.push(startValue + (step * i));
  return arr;
}


export function data():{x:number,y:number}[] {
  const xs = linspace(-5,5,30);
  const ys = xs.map(x=> x**3 -12*x +16)// = (x-2)**2 * (x+4)*1 ;
  const arr = [];
  for (let i = 0; i < xs.length; i++) arr.push({x:xs[i],y:ys[i]});
  return arr
}