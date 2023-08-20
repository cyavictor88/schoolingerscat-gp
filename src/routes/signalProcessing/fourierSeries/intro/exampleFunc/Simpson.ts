export function linspace(startValue:number , stopValue:number, cardinality:number) {
  const arr = [];
  const step = (stopValue - startValue) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) arr.push(startValue + (step * i));
  return arr;
}

type IntegralFunc = {
  (x: number, k:number): number;
};
type MathFunction = (x: number) => number;

export class Simpson {
  func: IntegralFunc;
  constructor( func: IntegralFunc ){
    this.func = func;
  }

  integrate(lb:number, ub:number, k:number, partitions?:number){
    let n = 1000;
    if(partitions) n = partitions;
    return this.simpsons(lb,ub,n,k);
  }

  simpsons(ll:number, ul:number, n:number, k:number) {

    // Calculating the value of h
    let h = (ul - ll) / n;
  
    // Array for storing value of x
    // and f(x)
    let x = [];
    let fx = [];
  
    // Calculating values of x and f(x)
    for (let i = 0; i <= n; i++) {
      x[i] = ll + i * h;
      fx[i] = this.func(x[i],k);
    }
  
    // Calculating result
    let res = 0;
    for (let i = 0; i <= n; i++) {
      if (i == 0 || i == n)
        res += fx[i];
      else if (i % 2 != 0)
        res += 4 * fx[i];
      else
        res += 2 * fx[i];
    }
  
    res = res * (h / 3);
    return res;
  }
  // from chat gpt
  integrateSimpsons(
    func: MathFunction,
    lowerBound: number,
    upperBound: number,
    numSegments: number = 1000
  ): number {
    const segmentSize = (upperBound - lowerBound) / numSegments;
    let integral = 0;
  
    for (let i = 0; i < numSegments; i++) {
      const x0 = lowerBound + i * segmentSize;
      const x1 = lowerBound + (i + 1) * segmentSize;
      const xMid = (x0 + x1) * 0.5;
      integral += (func(x0) + 4 * func(xMid) + func(x1)) * (segmentSize / 6);
    }
  
    return integral;
  }
}