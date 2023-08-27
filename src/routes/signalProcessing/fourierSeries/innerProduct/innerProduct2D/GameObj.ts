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
  public width = 400;
  public height = 300;
  public marginTop = 20;
  public marginRight = 100;
  public marginBottom = 30;
  public marginLeft = 40;

  public xTicks = getTicks(this.xDomain[0], this.xDomain[1]);
  public yTicks = getTicks(this.yDomain[0], this.yDomain[1]);
  public veca : Vec2D ={ x: 2, y: 4 };
  public vec0: Vec2D = {x:0,y:0};
  public vecb: Vec2D = { x: 5, y: 2 };
  public radius = 1;
  public theta_a:number; 
  public theta_b:number;
  public theta_ab:number;  //bTheta + 0.5 * (aTheta - bTheta);

  public xScale = d3.scaleLinear().domain(this.xDomain).range([this.marginLeft, this.width - this.marginRight]);
  public yScale = d3.scaleLinear().domain(this.yDomain).range([this.height - this.marginBottom, this.marginTop]);



  constructor(veca?:Vec2D, vecb?:Vec2D){
    if(veca)this.veca = veca;
    if(vecb)this.vecb = vecb;
    this.theta_a = Math.atan(this.veca.y / this.veca.x);
    this.theta_b = Math.atan(this.vecb.y / this.vecb.x);
    this.theta_ab =  (this.theta_a + this.theta_b)/2;
  }


  baseFig() {

    // Create the SVG container.
    const svg = d3.select("svg")

  

  
    const drawLine = d3.line<{ x: number, y: number }>()
    .x(d => this.xScale(d.x))
    .y(d => this.yScale(d.y))



    svg.append('path')
      .style("stroke", "black")
      .style("fill", "none")
      .attr("d", drawLine([{ x: -6, y: 0 }, { x: 6, y: 0 }]))
  
    svg.append('path')
      .style("stroke", "black")
      .style("fill", "none")
      .attr("d", drawLine([{ x: 0, y: -6 }, { x: 0, y: 6 }]))
  
  
    const fontSize = 20;
    const textXaxis = svg.append("text")
      .attr("x", this.xScale(6))
      .attr("y", this.yScale(-0))
      .style("font-size", fontSize + "px")
      .attr("dy", this.yScale.invert(fontSize * 0.5))
      .style('fill', 'black')
      .attr("text-anchor", "start")
      .text("X");
  
    const textYaxis = svg.append("text")
      .attr("x", this.xScale(0))
      .attr("y", this.yScale(6.1))
      .style("font-size", fontSize + "px")
      .style('fill', 'black')
      .attr("text-anchor", "middle")
      .text("Y");
  
  
    svg.selectAll('text').style('fill', 'black')
  
    return svg;
  }

}