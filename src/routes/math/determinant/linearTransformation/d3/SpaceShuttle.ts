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
  exhaust: {
    x:number;
    y:number;
  }
} 

export class SpaceShuttle {
  human: string = '👤';
  eventBroker: EventEmitter  = new EventEmitter();
  width: number = 700;
  height: number = 320;
  marginTop: number = 20;
  marginRight: number = 20;
  marginBottom: number = 20;
  marginLeft: number = 20;
  xDomain: number[] ;
  yDomain: number[] ;
  vec0 = {x:0,y:0};
  row: number = 4;
  col: number = 2;
  numInputCols: number;
  fireText = '🔥';
  exhaust = '◀';
  computerHeight = 300;
  computerWidth = 150;

  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
  svgNode!: SVGSVGElement | null;

  xScale: d3.ScaleLinear<number, number, never> ;
  yScale: d3.ScaleLinear<number, number, never> ;

  adjustmentPanels: AdjustmentPanel[] = [];
  engines: Engine[]=[];
  microcontrollers: Microcontroller[] = [];
  drawLine = d3.line<{ x: number, y: number }>()
    .x(d => this.xScale(d.x))
    .y(d => this.yScale(d.y))
  constructor(numInputCols: null|number){
    if(numInputCols) {
      this.numInputCols = numInputCols
    }
    else {
      this.width = 500;
      this.numInputCols = 1
    }
    this.xDomain= [0, this.width];
    this.yDomain= [0, this.height];


    // Declare the x (horizontal position) scale.
    this.xScale = d3.scaleLinear()
      .domain(this.xDomain)
      .range([this.marginLeft, this.width - this.marginRight]);

    // Declare the y (vertical position) scale.
    this.yScale = d3.scaleLinear()
      .domain(this.yDomain)
      .range([ this.marginBottom, this.height - this.marginTop]);

    const computerHeight = this.computerHeight;
    const computerWidth = this.computerWidth;

    // microcontrllers
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

    // adjustment boxes
    const adjustmentPanelBoxWidth = 40;
    const buttonHeight = 20;
    Array.from({length: this.numInputCols}, (_, c) =>c).forEach(c=>{ 
      const adjustmentPanelBox = {x: startMCX + computerWidth + c * this.xScale(adjustmentPanelBoxWidth) , y:Math.round(computerHeight/2) - buttonHeight/2*this.col, width:adjustmentPanelBoxWidth, height: buttonHeight*this.col }
      this.adjustmentPanels.push({box:adjustmentPanelBox,buttons:[],title:'Adjustment\nPanel '+(c+1)+' '+this.human});
      Array.from({length: this.col}, (_, i) =>i).forEach(i=>{ 
        const buttonX = adjustmentPanelBox.x + adjustmentPanelBox.width/3
        const numInterval = this.col*2+1;
        const textInterval = adjustmentPanelBox.height / numInterval;
        const buttonY = adjustmentPanelBox.y + textInterval * (2*i +1)
        const latex =  this.numInputCols > 1 ? 'a_{'+(i+1)+''+(c+1)+'}' : 'a_{'+(i+1)+'}' ;
        this.adjustmentPanels[c].buttons.push({latex,x:buttonX,y:buttonY});
      })
    })

    // engines
    const engineTriangleWidth = 40;
    const enginePadding = 30;
    const engineWidth = 10;//this.microcontrollers[0].box.width + 35;
    const engineStartX = enginePadding + startMCX + computerWidth + this.adjustmentPanels.length * this.xScale(adjustmentPanelBoxWidth)
    Array.from({length: this.numInputCols}, (_, c) =>c).forEach(c=>{
      Array.from({length: this.row}, (_,r)=>r).forEach(r=>{
        const tmpEngineStartX = enginePadding + startMCX + computerWidth + this.adjustmentPanels.length * this.xScale(adjustmentPanelBoxWidth) + c*(engineTriangleWidth + this.microcontrollers[r].box.width + enginePadding);
        const y = this.microcontrollers[r].box.y + this.microcontrollers[r].box.height;
        const textY = y - 1.2 *this.microcontrollers[r].box.height;
        const getLatex = ()=>{
          let text = ''
          const inputs = this.adjustmentPanels[0];
          this.adjustmentPanels[c].buttons.forEach((butt,i)=>{
            text+=  this.numInputCols > 1 ? 'm_{'+(r+1)+''+(i+1)+'}'+ 'a_{'+(c+1)+''+(i+1)+'}+' :'m_{'+(r+1)+''+(i+1)+'}'+ 'a_{'+(i+1)+'}+' 
          })
          text = text.slice(0,-1) ;
          const header = this.numInputCols > 1 ? 'p_{'+(r+1)+''+(c+1)+'}=' : 'p_{'+(r+1)+'}=';
          text = header + text;//this.numInputCols > 1 ? '=p_{'+(r+1)+''+(c+1)+'}' : '=p_{'+(r+1)+'}';
          return text;
        }
        const wire = {
          line: {
            start:{x:tmpEngineStartX, y:  y},
            end: {x:tmpEngineStartX+engineWidth, y:  y}
          },
          text: {
            x: tmpEngineStartX,
            y:  textY,
            latex: getLatex()
          }
        };
        const exhaust = {
          x : wire.line.start.x + 10,//tmpEngineStartX+engineWidth,
          y: y,
        }
        this.engines.push({exhaust,wire})
      });
    });

    // Create SVG
    const svg = d3.create("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .style('border', '1px black solid');

    this.svg = svg;
    this.svgNode = svg.node();

    this.makeMainframeComputer();
    this.makeMicrocontrollers(startMCX);
    this.makeAdjustmentPanel();
    this.makeEngines();





    // svg.append('path')
    // .attr('d',(d,i)=>{return this.drawLine([  {x: engineStartX, y: 40}, {x:engineStartX+30,y:40}     ])})
    // .style('stroke','black')


  }


  makeEngines(){
    const group = this.svg.append('g').attr('class','engines');

    const group_fire= group.append('g').attr('class','engine_fire');
    group_fire.selectAll('text').data(this.engines).join('text')
    .attr("x", (d)=>this.xScale(d.exhaust.x))
    .attr("y", (d)=>this.yScale(d.exhaust.y))
    .style("font-size","16px")
    .attr("dx", this.xScale.invert(18 * 0.6))
    .attr("dy", this.yScale.invert(18 *(0.6)))
    .text((d)=>this.fireText)
    .attr('transform',(d)=>`rotate(90,${this.xScale(d.exhaust.x)},${this.yScale(d.exhaust.y)})`);

    const exhaust= group.append('g').attr('class','engine_exhaust');
    exhaust.selectAll('text').data(this.engines).join('text')
    .attr("x", (d)=>this.xScale(d.exhaust.x))
    .attr("y", (d)=>this.yScale(d.exhaust.y))
    .style("font-size","18px")
    .attr("dx", this.xScale.invert(18 * (1)))
    .attr("dy", this.yScale.invert(18 *(1.45)))
    .text((d)=>this.exhaust)



    group.selectAll('path').data(this.engines).join('path')
    .attr('d',(d,i)=>{
      return this.drawLine([
        {x: d.wire.line.start.x , y:d.wire.line.start.y},
        {x: d.wire.line.end.x , y:d.wire.line.end.y},
      ])
    })
    .style('stroke','black');

    const group_latex = group.append('g').attr('class','engine_latexs');
    const svg_latex = group_latex.append('svg')
    svg_latex.selectAll('foreignObject')
      .data(this.engines).join('foreignObject')
      .attr("width", 1)
      .attr("height", 1)
      .attr("overflow", 'visible')
      .style("font-size", '12px')
      .attr("x", (d,i)=>{return this.xScale(d.wire.text.x)})
      .attr("y", (d,i)=>{return this.yScale(d.wire.text.y)})
      .append("xhtml:div")
      .html((d,i)=>{return latex(d.wire.text.latex)})
    

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




    group.selectAll('path').data(this.microcontrollers).join('path')
    .attr('d',(d,i)=>{return this.drawLine([  {x: d.box.x+d.box.width+startMCX, y: d.box.y+d.box.height}, {x:d.box.x+d.box.width+startMCX+10,y:d.box.y+d.box.height}     ])})
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

    makeMainframeComputer(){
    const fontSize = 12;

    const textMainframeComputer = this.svg.append("text")
      .attr("x", this.xScale(4))
      .attr("y", this.yScale(10))
      .style("font-size", fontSize + "px")
      .attr("dy", this.yScale.invert(fontSize * 0.5))
      .style('fill', 'black')
      .attr("text-anchor", "start")
      .text('Mainframe Computer');

    const mainframeComputer = this.svg.append('rect')
    .attr('x', this.xScale(0))
    .attr('y', this.yScale(0))
    .attr('width', this.xScale(this.computerWidth))
    .attr('height', this.yScale(this.computerHeight))
    .attr('stroke', 'black')
    .style('opacity','0.5')
    .attr('fill', '#69a3b2');
  }

}