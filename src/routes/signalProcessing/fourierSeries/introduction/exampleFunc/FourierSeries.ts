import { Simpson } from "./Simpson";

type OriginalFunc = {
  (x: number): number;
};

export class FourierSeries { 
  period: number;
  originalFunc: OriginalFunc;
  ak: number[] | null = null;
  bk: number[] | null = null;
  cosK :( (x:number,k:number)=> number ) | null = null;
  sinK :( (x:number,k:number)=> number ) | null = null;
  maxK: number = 30;
  constructor( func: OriginalFunc, period: number, maxK?: number ){
    this.cosK = (x,k)=> Math.cos(k*x*2*Math.PI/period);
    this.sinK = (x,k)=> Math.sin(k*x*2*Math.PI/period);
    this.originalFunc = func;
    this.period = period;
    if(maxK) this.maxK = maxK;
    this.setFS();
  }

  linspace(startValue:number , stopValue:number, cardinality:number) {
    const arr = [];
    const step = (stopValue - startValue) / (cardinality - 1);
    for (let i = 0; i < cardinality; i++) arr.push(startValue + (step * i));
    return arr;
  }

  setFS(){
    const T = this.period;
    const funcCos = (t:number,k:number) => {return this.originalFunc(t) * this.cosK!(t,k)};
    const funcSin = (t:number,k:number) => {return this.originalFunc(t) * this.sinK!(t,k)};
    const simpCos = new Simpson(funcCos);
    const simpSin = new Simpson(funcSin);
    const ks = Array.from({length: this.maxK},(_,i)=>i);
    const ak:number[] = [];
    const bk:number[] = [];
    ks.forEach(k=>{
      ak.push(simpCos.integrate(-T/2,T/2,k,1000) *2/T );
      bk.push(simpSin.integrate(-T/2,T/2,k,1000) *2/T);
    });
    ak[0] = ak[0]/2;
    this.ak = ak;
    this.bk = bk;
  }

  getOriginalFunc(lb:number, ub:number ,numPoints: number) {
    const xs = this.linspace(lb,ub,numPoints);
    const ys = xs.map(x=> this.originalFunc(x) )
    return xs.map((x,i)=> {return {x,y:ys[i]}});
  }

  getFSFunc(lb:number, ub:number ,numPoints: number) {
    const ks = Array.from({length:this.maxK},(_,i)=>i);
    const xs = this.linspace(lb,ub,numPoints);
    const ys = xs.map((x,i)=>{
      let cos = 0;
      let sin = 0;
      ks.forEach(k=>{
        cos += this.ak![k]*this.cosK!(x,k);
        sin += this.bk![k]*this.sinK!(x,k);
      })
      return cos+sin;
    });
    return xs.map((x,i)=> {return {x,y:ys[i]}});
  }

}