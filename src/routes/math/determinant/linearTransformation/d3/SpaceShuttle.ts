import * as d3 from 'd3';
import katex from "katex";
import EventEmitter from 'eventemitter3';
import * as mj from 'mathjs';


export class SpaceShuttle {
  eventBroker: EventEmitter  = new EventEmitter();
  width: number = 300;
  height: number = 300;
  marginTop: number = 20;
  marginRight: number = 20;
  marginBottom: number = 20;
  marginLeft: number = 20;
  xDomain: number[] = [-10, 10];
  yDomain: number[] = [-10, 10];
  vec0 = {x:0,y:0};

  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
  svgNode!: SVGSVGElement | null;

  xScale: d3.ScaleLinear<number, number, never> ;
  yScale: d3.ScaleLinear<number, number, never> ;

  constructor(){
    // Declare the x (horizontal position) scale.
    this.xScale = d3.scaleLinear()
      .domain(this.xDomain)
      .range([this.marginLeft, this.width - this.marginRight]);

    // Declare the y (vertical position) scale.
    this.yScale = d3.scaleLinear()
      .domain(this.yDomain)
      .range([this.height - this.marginBottom, this.marginTop]);

    // Create SVG
    const svg = d3.create("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .style('border', '1px black solid');

    this.svg = svg;
    this.svgNode = svg.node();
    const fontSize = 12;
    
    const textYaxis = svg.append("text")
      .attr("x", this.xScale(1))
      .attr("y", this.yScale(10))
      .style("font-size", fontSize + "px")
      .attr("dy", this.yScale.invert(fontSize * 0.5))
      .style('fill', 'black')
      .attr("text-anchor", "start")
      .text("Y");
  }
}