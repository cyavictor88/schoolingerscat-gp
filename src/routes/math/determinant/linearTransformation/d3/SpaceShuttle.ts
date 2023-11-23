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
    texts: 
      {x: number, y:number, latex: string}[]
    
}

interface AdjustmentPanel {
  box :{
    x:number;
    y:number;
    width:number;
    height:number;
  };
  buttons:
    {latex: string; x:number; y:number; }[];
  title: string;   
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
  width: number = 600;
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
  numInputCols: number = 2;


  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
  svgNode!: SVGSVGElement | null;

  xScale: d3.ScaleLinear<number, number, never> ;
  yScale: d3.ScaleLinear<number, number, never> ;

  adjustmentPanels: AdjustmentPanel[] = [];
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
    const startMCX = 20;
    Array.from({length: this.row}, (_, i) =>i).forEach(i=>{
      const mcHeight = Math.round((computerHeight/(this.row))); 
      const boxHeight = Math.round(mcHeight/3);
      const boxWidth = Math.round(computerWidth - 2*startMCX);
      const box = {x:startMCX, y:mcHeight*(i+1)- boxHeight *2 ,width:boxWidth,height:boxHeight};
      const titleText = 'micro-controller'+(i+1);
      const font = 12;
      const title= {x: startMCX, y: mcHeight*(i+1) - boxHeight *2, font, text:titleText}

      const latexes = Array.from({length: this.col}, (_, j) =>j).map( j => 'm_{'+(i+1)+''+(j+1)+'}')
      const numInterval = this.col*2+1;
      const textInterval = boxWidth / numInterval;
      const textsXs = Array.from({length: this.col}, (_, j) =>2*j +1).map( odd => startMCX + (odd) *textInterval)
      const textsYs = Array.from({length: this.col}, (_, j) =>j).map(j=> Math.round(box.y + boxHeight/2))
      const texts =  Array.from({length: this.col}, (_, j) =>j).map(j=>{return  {latex:latexes[j],x:textsXs[j],y:textsYs[j]} })
      const mc : Microcontroller = { box,title,texts};
      this.microcontrollers.push(mc);
    });

    const adjustmentPanelBoxWidth = 40;
    const buttonHeight = 20;
    Array.from({length: this.numInputCols}, (_, c) =>c).forEach(c=>{ 
      const adjustmentPanelBox = {x: startMCX + computerWidth + c * this.xScale(adjustmentPanelBoxWidth) , y:Math.round(computerHeight/2) - buttonHeight/2*this.col, width:adjustmentPanelBoxWidth, height: buttonHeight*this.col }
      this.adjustmentPanels.push({box:adjustmentPanelBox,buttons:[],title:'Adjustment\nPanel '+(c+1)});
      Array.from({length: this.col}, (_, i) =>i).forEach(i=>{ 
        const buttonX = adjustmentPanelBox.x + adjustmentPanelBox.width/3
        const numInterval = this.col*2+1;
        const textInterval = adjustmentPanelBox.height / numInterval;
        const buttonY = adjustmentPanelBox.y + textInterval * (2*i +1)
        const latex = 'a_{'+(c+1)+''+(i+1)+'}';
        this.adjustmentPanels[c].buttons.push({latex,x:buttonX,y:buttonY});
      })
    })

    // Create SVG
    const svg = d3.create("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .style('border', '1px black solid');

    this.svg = svg;
    this.svgNode = svg.node();
    const fontSize = 12;

    const textMainframeComputer = svg.append("text")
      .attr("x", this.xScale(4))
      .attr("y", this.yScale(10))
      .style("font-size", fontSize + "px")
      .attr("dy", this.yScale.invert(fontSize * 0.5))
      .style('fill', 'black')
      .attr("text-anchor", "start")
      .text('Mainframe Computer');

    const mainframeComputer = svg.append('rect')
    .attr('x', this.xScale(0))
    .attr('y', this.yScale(0))
    .attr('width', this.xScale(computerWidth))
    .attr('height', this.yScale(computerHeight))
    .attr('stroke', 'black')
    .style('opacity','0.5')
    .attr('fill', '#69a3b2');

    this.makeMicrocontrollers(startMCX);
    this.makeAdjustmentPanel();





  }

  makeAdjustmentPanel(){

    const group = this.svg.append('g').attr('class','adjustmentPanel');
    group.selectAll('rect').data(this.adjustmentPanels).join('rect')
    .attr('x',(d,i)=>{return this.xScale(d.box.x)})
    .attr('y',(d,i)=>{return this.yScale(d.box.y)})
    .attr('width',(d,i)=>{return this.yScale(d.box.width)})
    .attr('height',(d,i)=>{return this.yScale(d.box.height)})
    .style('fill','blue')
    .attr('stroke', 'black')
    .style('opacity','0.5')

    const texts = group.selectAll('text').data(this.adjustmentPanels).join('text')
    .attr('x',(d,i)=>{return this.xScale(d.box.x)})
    .attr('y',(d,i)=>{return this.yScale(d.box.y)})
    .style("font-size",(d,i)=>{return  '10px'})
    // .attr("dy", (d,i)=>{return this.yScale.invert(d.title.font * 0.5)}) 
    .style('fill', 'black')
    .attr("text-anchor", "start")
    // .text((d,i)=>{return 'Adjustment\nPanel '+i})

    const xScale = this.xScale;
    const yScale = this.yScale;
    texts.each(function(d) {
      const lines = d.title.split("\n");

      d3.select(this).append("tspan")
        .text(lines[0])
        .attr("x", xScale(d.box.x))
        .attr("dy", -16);

      d3.select(this).append("tspan")
        .text(lines[1])
        .attr("x", xScale(d.box.x))
        .attr("dy",12);
    });
    for (let c = 0; c < this.numInputCols; c++) {
      const group_latex = group.append('g').attr('class','adjustmentPanel_latexs');
      const svg_latex = group_latex.append('svg')
      svg_latex.selectAll('foreignObject')
        .data(this.adjustmentPanels[c].buttons).join('foreignObject')
        .attr("width", 1)
        .attr("height", 1)
        .attr("overflow", 'visible')
        .style("font-size", '15px')
        .attr("x", (d,i)=>{return this.xScale(d.x)})
        .attr("y", (d,i)=>{return this.yScale(d.y)})
        .append("xhtml:div")
        .html((d,i)=>{return latex(d.latex)})
    }

  }


  makeMicrocontrollers(startMCX:number){
    const group = this.svg.append('g').attr('class','microcontrollers');

    group.selectAll('rect').data(this.microcontrollers).join('rect')
    .attr('x',(d,i)=>{return this.xScale(d.box.x)})
    .attr('y',(d,i)=>{return this.yScale(d.box.y)})
    .attr('width',(d,i)=>{return this.xScale(d.box.width)})
    .attr('height',(d,i)=>{return this.yScale(d.box.height)})
    .style('fill','grey')
    .style('opacity','0.5')
    .style('stroke','black')


    const drawLine = d3.line<{ x: number, y: number }>()
    .x(d => this.xScale(d.x))
    .y(d => this.yScale(d.y))

    group.selectAll('path').data(this.microcontrollers).join('path')
    .attr('d',(d,i)=>{return drawLine([  {x: d.box.x+d.box.width+startMCX, y: d.box.y+d.box.height}, {x:d.box.x+d.box.width+startMCX+10,y:d.box.y+d.box.height}     ])})
    .style('stroke','black')

    group.selectAll('text').data(this.microcontrollers).join('text')
    .attr('x',(d,i)=>{return this.xScale(d.title.x)})
    .attr('y',(d,i)=>{return this.yScale(d.title.y)})
    .style("font-size",(d,i)=>{return d.title.font + 'px'})
    // .attr("dy", (d,i)=>{return this.yScale.invert(d.title.font * 0.5)}) 
    .style('fill', 'black')
    .attr("text-anchor", "start")
    .text((d,i)=>{return d.title.text})

    for (let r = 0; r < this.row; r++) {
      const group_latex = group.append('g').attr('class','microcontrollers_latexs');
      const svg_latex = group_latex.append('svg')
      svg_latex.selectAll('foreignObject')
      .data(this.microcontrollers[r].texts).join('foreignObject')
      .attr("width", 1)
      .attr("height", 1)
      .attr("overflow", 'visible')
      .style("font-size", '15px')
      .attr("x", (d,i)=>{return this.xScale(d.x)})
      .attr("y", (d,i)=>{return this.yScale(d.y)})
      .append("xhtml:div")
      .html((d,i)=>{return latex(d.latex)})
    }

  }

}