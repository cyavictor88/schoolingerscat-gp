import { FIG_COLOR, getColor } from '$lib/theme/colors';
import * as d3 from 'd3';
import katex from "katex";

export interface Vec2D {
  x:number;
  y:number;
}

function getTicks(start: number, end: number) {
  const res = [];
  while (start <= end) {
    res.push(start);
    start += 1;
  }
  return res;
}

export function latex(math: string) {
  const mathmlHtml = katex.renderToString(math, {
    throwOnError: false,
    output: "mathml",
    displayMode: false,
  });
  return mathmlHtml;
}

export class GameObj{
  public xDomain = [-6, 6];
  public yDomain = [-6, 6];
  // Declare the chart dimensions and margins.
  public width = 450;
  public height = 300;
  public marginTop = 20;
  public marginRight = 20;
  public marginBottom = 30;
  public marginLeft = 150;

  public xTicks = getTicks(this.xDomain[0], this.xDomain[1]);
  public yTicks = getTicks(this.yDomain[0], this.yDomain[1]);
  public veca : Vec2D ={ x: 2, y: 4 };
  public vec0: Vec2D = {x:0,y:0};
  public vecb: Vec2D = { x: 5, y: 2 };
  public curveThetaRadius = 1;
  public theta_a:number; 
  public theta_b:number;
  public theta_ab:number;  //bTheta + 0.5 * (aTheta - bTheta);

  public toggleFixedRadius = false;

  public xScale = d3.scaleLinear().domain(this.xDomain).range([this.marginLeft, this.width - this.marginRight]);
  public yScale = d3.scaleLinear().domain(this.yDomain).range([this.height - this.marginBottom, this.marginTop]);
  public triangleDPoint:Vec2D = this.calcTriangleDPoint();
  public trianglePathString: string = this.calcTrianglePathString();


  constructor(veca?:Vec2D, vecb?:Vec2D){
    if(veca)this.veca = veca;
    if(vecb)this.vecb = vecb;
    this.theta_a = Math.atan(this.veca.y / this.veca.x);
    this.theta_b = Math.atan(this.vecb.y / this.vecb.x);
    this.theta_ab =  (this.theta_a + this.theta_b)/2;
  }


  calcTriangleDPoint(){
    let inter1 = {x:this.veca.x, y: this.vecb.y}
    let inter2 = {x:this.vecb.x, y: this.veca.y}
    let triangleDPoint = inter2;
    if(this.vecMag(inter1) < this.vecMag(inter2)){
      triangleDPoint = inter1;
    }
    return triangleDPoint
  }

  calcTrianglePathString(){
    this.triangleDPoint = this.calcTriangleDPoint();
    const vertices = [   [this.xScale(this.veca.x), this.yScale(this.veca.y)], [this.xScale(this.vecb.x), this.yScale(this.vecb.y)], [this.xScale(this.triangleDPoint.x), this.yScale(this.triangleDPoint.y)] ];
    return vertices.map(point => point.join(",")).join(" ");
  }

  fixedRadius(fixed:boolean){
    this.xScale =  d3.scaleLinear().domain(this.xDomain).range([this.marginLeft, this.width - this.marginRight]);
    this.yScale =  d3.scaleLinear().domain(this.yDomain).range([this.height - this.marginBottom, this.marginTop]);
    this.xTicks = getTicks(this.xDomain[0], this.xDomain[1]);
    this.yTicks = getTicks(this.yDomain[0], this.yDomain[1]);
    if(fixed){
      this.veca = {x:Math.cos(this.theta_a), y:Math.sin(this.theta_a)};
      this.vecb = {x:Math.cos(this.theta_b), y:Math.sin(this.theta_b)};
      this.curveThetaRadius = 0.5;
      this.toggleFixedRadius = fixed;
    }
    else {
      this.curveThetaRadius = 1;
      if(this.toggleFixedRadius!=fixed)
      {
        this.veca = {x:this.curveThetaRadius*5*Math.cos(this.theta_a), y:this.curveThetaRadius*5*Math.sin(this.theta_a)};
        this.vecb = {x:this.curveThetaRadius*5*Math.cos(this.theta_b), y:this.curveThetaRadius*5*Math.sin(this.theta_b)};
      }
      this.toggleFixedRadius=fixed;
    }
    this.trianglePathString = this.calcTrianglePathString();

  }


  calcAngleBetween(vec1:Vec2D, vec2:Vec2D){
    const innerProduct = vec1.x*vec2.x + vec1.y*vec2.y;
    const cosTheta = innerProduct / (  Math.sqrt(vec1.x**2+vec1.y**2) * Math.sqrt( vec2.x**2+vec2.y**2) );
    const theta = Math.acos(cosTheta);
    return theta
  }

  calc_thetas(){
    this.theta_a = this.veca.y > 0? this.calcAngleBetween(this.veca, {x:1,y:0}) : 2*Math.PI - this.calcAngleBetween(this.veca, {x:1,y:0});
    this.theta_b = this.vecb.y > 0? this.calcAngleBetween(this.vecb, {x:1,y:0}) : 2*Math.PI - this.calcAngleBetween(this.vecb, {x:1,y:0});
    this.theta_ab = (this.theta_a + this.theta_b)/2;
    if(Math.abs(this.theta_a-this.theta_b)>Math.PI) this.theta_ab = Math.PI+this.theta_ab;
    this.trianglePathString = this.calcTrianglePathString();
  }



  calcInnerProduct(){
    return this.veca.x*this.vecb.x + this.veca.y*this.vecb.y
  }

  vecStr(vec:Vec2D){
    return `(${vec.x.toFixed(2)},${vec.y.toFixed(2)})`
  }

  vecMag(vec:Vec2D){
    return Math.sqrt(vec.x**2+vec.y**2)
  }



}