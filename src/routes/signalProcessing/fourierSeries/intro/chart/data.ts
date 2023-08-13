function linspace(startValue:number , stopValue:number, cardinality:number) {
  const arr = [];
  const step = (stopValue - startValue) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) arr.push(startValue + (step * i));
  return arr;
}


export function data():{x:number,y:number}[] {
  const xs = linspace(-10,10,30);
  const ys = xs.map(x=> 9*x**3 - 8*x**2 + 7 * x - 6);
  const arr = [];
  for (let i = 0; i < xs.length; i++) arr.push({x:xs[i],y:ys[i]});
  return arr
}