import * as d3 from 'd3';
import katex from "katex";
import EventEmitter from 'eventemitter3';

function latex(math: string) {
  const mathmlHtml = katex.renderToString(math, {
    throwOnError: false,
    output: "mathml",
  });
  return mathmlHtml;
}


export class Example2D {

  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
  svgNode!: SVGSVGElement | null;
  eventBroker: EventEmitter = new EventEmitter();
  width: number = 200;
  height: number = 200;
  marginTop: number = 20;
  marginRight: number = 20;
  marginBottom: number = 20;
  marginLeft: number = 20;
  xDomain = [-5, 5];
  yDomain = [-5, 5];
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  drawLine : d3.Line<{x:number, y:number}>;
  constructor() {
    // Create SVG
    const svg = d3.create("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      // .style('border', '1px black solid');

    this.svg = svg;
    this.svgNode = svg.node();



    // Declare the x (horizontal position) scale.
    this.xScale = d3.scaleLinear()
      .domain(this.xDomain)
      .range([this.marginLeft, this.width - this.marginRight]);

    // Declare the y (vertical position) scale.
    this.yScale = d3.scaleLinear()
      .domain(this.yDomain)
      .range([this.height - this.marginBottom, this.marginTop]);

    this.drawLine = d3.line<{ x: number, y: number }>()
      .x(d => this.xScale(d.x))
      .y(d => this.yScale(d.y))
      

    svg.append('path')
      .style("stroke", "black")
      .style("fill", "none")
      .attr("d", this.drawLine([{ x: -5, y: 0 }, { x: 5, y: 0 }]))
  
    svg.append('path')
      .style("stroke", "black")
      .style("fill", "none")
      .attr("d", this.drawLine([{ x: 0, y: -5 }, { x: 0, y: 5 }]))
  

  }
}