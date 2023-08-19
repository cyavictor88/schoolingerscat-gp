export function linspace(startValue:number , stopValue:number, cardinality:number) {
  const arr = [];
  const step = (stopValue - startValue) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) arr.push(startValue + (step * i));
  return arr;
}

type IntegralFunc = {
  (x: number, k:number): number;
};

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
}