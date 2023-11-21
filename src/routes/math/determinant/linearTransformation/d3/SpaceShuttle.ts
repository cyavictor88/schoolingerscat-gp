import * as d3 from 'd3';
import katex from "katex";
import EventEmitter from 'eventemitter3';
import * as mj from 'mathjs';



function latex(math: string) {
  const mathmlHtml = katex.renderToString(math, {
    throwOnError: false,
    output: "mathml",
  });
  return mathmlHtml;
}


interface Microcontroller {
    box: {
      x:number;
      y:number;
      width: number;
      height: number;
    };
    title:{
      x:number;
      y:number;
      text: string;
      font: number;
    };
    // texts: 
    //   {x: number, y:number, latex: string}[]
    
}

interface AdjustmentPanel {
  box :{
    x:number;
    y:number;
    width:number;
    height:number;
  };
  buttons:
    {latex: string; x:number; y:number; r:number}[]
}

interface Engine {
  wire: {
    line: {
      start: {x:number,y:number};
      end: {x:number,y:number}
    }
    text :{
      x:number,y:number,latex:string
    }
  };
  engine: {
    x:number;
    y:number;
  }
} 

export class SpaceShuttle {
  human: string = '👤';
  eventBroker: EventEmitter  = new EventEmitter();
  width: number = 500;
  height: number = 320;
  marginTop: number = 20;
  marginRight: number = 20;
  marginBottom: number = 20;
  marginLeft: number = 20;
  xDomain: number[] = [0, this.width];
  yDomain: number[] = [0, this.height];
  vec0 = {x:0,y:0};
  row: number = 4;
  col: number = 2;


  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
  svgNode!: SVGSVGElement | null;

  xScale: d3.ScaleLinear<number, number, never> ;
  yScale: d3.ScaleLinear<number, number, never> ;

  adjustmentPanels: AdjustmentPanel[]=[];
  engines: Engine[]=[];
  microcontrollers: Microcontroller[] = [];


  constructor(){

    // Declare the x (horizontal position) scale.
    this.xScale = d3.scaleLinear()
      .domain(this.xDomain)
      .range([this.marginLeft, this.width - this.marginRight]);

    // Declare the y (vertical position) scale.
    this.yScale = d3.scaleLinear()
      .domain(this.yDomain)
      .range([ this.marginBottom, this.height - this.marginTop]);

    const computerHeight = 300
    const computerWidth = 150
    let startMCX = 20;
    Array.from({length: this.row}, (_, i) =>i).forEach(i=>{
      const mcHeight = Math.round((computerHeight/(this.row))); 
      const boxHeight = Math.round(mcHeight/3);
      const boxWidth = Math.round(computerWidth * 0.8);
      const box = {x:startMCX, y:mcHeight*(i+1)- boxHeight *2 ,width:boxWidth,height:boxHeight};
      const titleText = 'micro-controller'+(i+1);
      const font = 12;
      const title= {x: startMCX, y: mcHeight*(i+1) - boxHeight *2, font, text:titleText}
      const mc : Microcontroller = { box,title};
      this.microcontrollers.push(mc);
    });


    // Create SVG
    const svg = d3.create("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .style('border', '1px black solid');

    this.svg = svg;
    this.svgNode = svg.node();
    const fontSize = 12;

    const mainframeComputer = svg.append('rect')
    .attr('x', this.xScale(0))
    .attr('y', this.yScale(0))
    .attr('width', this.xScale(computerWidth))
    .attr('height', this.yScale(computerHeight))
    .attr('stroke', 'black')
    .style('opacity','0.5')
    .attr('fill', '#69a3b2');


    const group_microcontrollers = svg.append('g').attr('class','microcontrollers');

    group_microcontrollers.selectAll('rect').data(this.microcontrollers).join('rect')
    .attr('x',(d,i)=>{return this.xScale(d.box.x)})
    .attr('y',(d,i)=>{return this.yScale(d.box.y)})
    .attr('width',(d,i)=>{return this.yScale(d.box.width)})
    .attr('height',(d,i)=>{return this.yScale(d.box.height)})
    .style('fill','grey')
    .style('opacity','0.5')


    group_microcontrollers.selectAll('text').data(this.microcontrollers).join('text')
    .attr('x',(d,i)=>{return this.xScale(d.title.x)})
    .attr('y',(d,i)=>{return this.yScale(d.title.y)})
    .style("font-size",(d,i)=>{return d.title.font + 'px'})
    // .attr("dy", (d,i)=>{return this.yScale.invert(d.title.font * 0.5)}) 
    .style('fill', 'black')
    .attr("text-anchor", "start")
    .text((d,i)=>{return d.title.text})


    const textYaxis = svg.append("text")
      .attr("x", this.xScale(4))
      .attr("y", this.yScale(10))
      .style("font-size", fontSize + "px")
      .attr("dy", this.yScale.invert(fontSize * 0.5))
      .style('fill', 'black')
      .attr("text-anchor", "start")
      .text('Mainframe Computer');



  svg
  .append("svg:foreignObject")
  .attr("width", 1)
  .attr("height", 1)
  .attr("overflow", 'visible')
  .style("font-size", '15px')
  .attr("x", this.xScale(200))
  .attr("y", this.yScale(0))
  .append("xhtml:div")
  .html(latex('m_{ij}'))

  }


}