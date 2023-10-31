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

interface D3Base {
  width?: number,
  height?: number,
  marginTop?: number,
  marginRight?: number,
  marginBottom?: number,
  marginLeft?: number,
  xDomain?: number[],
  yDomain?: number[],
}

type Coord = {
  x:number;
  y:number;
}

export class Fig4d {
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

  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>
  svgNode!: SVGSVGElement | null;

  xScale: d3.ScaleLinear<number, number, never> ;
  yScale: d3.ScaleLinear<number, number, never> ;

  drawLine: d3.Line<{
    x: number;
    y: number;
  }>

  toggleGroup : d3.Selection<SVGGElement, undefined, null, undefined>;

  constructor(
    veca:Coord,vecb:Coord, vecbPrime:Coord,    d3Base?: D3Base
  ) {
    if (d3Base) {
      this.width = d3Base.width ?? this.width;
      this.height = d3Base.height ?? this.height;
      this.marginTop = d3Base.marginTop ?? this.marginTop;
      this.marginLeft = d3Base.marginLeft ?? this.marginLeft;
      this.marginBottom = d3Base.marginBottom ?? this.marginBottom;
      this.marginRight = d3Base.marginRight ?? this.marginRight;
      this.xDomain = d3Base.xDomain ?? this.xDomain;
      this.yDomain = d3Base.yDomain ?? this.yDomain;
    }

    this.vec0 = {x:0,y:0};
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

    // Add the x-axis.
    const xAxis = svg.append("g")
      .attr("transform", `translate(0,${this.height/2})`)
      .call(d3.axisBottom(this.xScale).tickFormat(()=>'').ticks(Math.abs(this.xDomain[0]-this.xDomain[1])));

    // Add the y-axis.
    const yAxis = svg.append("g")
      .attr("transform", `translate(${this.width/2},0)`)
      .call(d3.axisLeft(this.yScale).tickFormat(()=>"").ticks(Math.abs(this.yDomain[0]-this.yDomain[1])));

    this.initArrow();

    this.drawLine = d3.line<{ x: number, y: number }>()
    .x(d => this.xScale(d.x))
    .y(d => this.yScale(d.y))

    this.makeVec(veca,'a','Green');
    this.makeVec(vecb,'b','Blue');

    const fontSize = 20;
   

    this.toggleGroup = this.makeToggleGroup(veca,vecb);
    this.makeVecaDecomp(veca);
    this.makeLatex(this.toggleGroup, {x: .3,y: veca.y*0.8},'\\color{green} a_2 ' );
    this.makeLatex(this.toggleGroup, {x: veca.x*0.8, y: veca.y*1.6},'\\color{green} a_3 ' );
    this.makeLatex(this.toggleGroup, {x: vecb.x*0.6, y: 0},'\\color{blue} b_3 ' );
    
  
    this.eventBroker.addListener('toggleShow',()=>{
      const showing =  this.toggleGroup.style('display');
      if(showing!=='none'){
        this.toggleGroup.style('display','none');
      }
      else{
        this.toggleGroup.style('display','inline');
      }

    })
  }

  makeToggleGroup(veca: Coord,vecb:Coord){

    const vecSum = mj.add([veca.x, veca.y],[vecb.x,vecb.y]); 
      
    const toggleGroup = this.svg.append('g').style('display','none');

    toggleGroup.append('path')
    .attr('d', this.drawLine([ veca, {x:vecSum[0], y:vecSum[1]} ]))
    .attr('stroke', 'grey');
    
    toggleGroup.append('path')
    .attr('d', this.drawLine([ vecb, {x:vecSum[0], y:vecSum[1]} ]))
    .attr('stroke', 'grey');


    const groupAreaPath = toggleGroup.append('g').attr('class', 'areaPaths')
    const areaLines = [ {x:0,y:0},veca,  {x:vecSum[0], y:vecSum[1]},vecb  ];
    groupAreaPath
      .append('path')
      .style("stroke", "none")
      .style("fill", "white")
      .style('opacity','0.5')
      .attr("d", d => this.drawLine(areaLines))
    return toggleGroup
  }

  makeVec(vec:{x:number,y:number},vecName:string,color:string){
    const svg = this.svg;
    const vec0 = {x:0,y:0};
    // make arrow
    const arrow = svg.select('#arrow').clone(true)
    arrow.attr('fill',color)
    arrow.attr('id', 'arrow'+vecName)
    // make line
    svg
      .append('path')
      .attr('d', this.drawLine([vec0, vec]))
      .attr('stroke',color)
      .attr('marker-end', `url(#arrow${vecName})`)
      .attr('fill', 'none');

    // make latex
    let xPos = (vec.x*1.6)
    let yPos =(vec.y *1.6)
    if(vecName === 'b'){
      xPos = (vec.x*1.2)
      yPos =(-0.8)
    }
    this.makeLatex(svg, {x:xPos,y:yPos},`\\color{${color}}\\overrightarrow{${vecName}}`)
  }

  initArrow(){
    const arrowSize = 10;
    const markerBoxWidth = arrowSize;
    const markerBoxHeight = arrowSize;
    const refX = markerBoxWidth / 1;
    const refY = markerBoxHeight / 2;
    // const arrowPoints :[number,number][]= [[0, 0], [0, arrowSize], [arrowSize, arrowSize/2]];
    const arrowPoints: [number, number][] = [[0, 0], [arrowSize, arrowSize / 2], [0, arrowSize], [arrowSize / 2, arrowSize / 2]];
  
  
    const arrowLine = d3.line<[number, number]>().x(d => (d[0])).y(d => (d[1]));
    // arrow
    const arrow = this.svg
    .append('defs')
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
    .attr('refX', refX)
    .attr('refY', refY)
    .attr('markerWidth', markerBoxWidth)
    .attr('markerHeight', markerBoxHeight)
    .attr('orient', 'auto-start-reverse')
    .append('path')
    .attr('d', arrowLine(arrowPoints))
  }


  makeVecaDecomp(vec: Coord){
    const vec0 = this.vec0;
    const vecDecompLines = [ 
      [vec0, {x:0,y:vec.y}],
      [{x:0,y:vec.y}, vec]
    ];
  
    this.toggleGroup.append('g').selectAll('path')
      .data(vecDecompLines)
      .join('path')
      .style("stroke", "green")
      .style("fill", "none")
      .style('opacity','0.5')
      .attr('stroke-width','2')
      .attr("d", d => this.drawLine(d as Coord[]));
  }

  makeLatex(node:  d3.Selection<SVGGElement, undefined, null, undefined> |d3.Selection<SVGSVGElement, undefined, null, undefined> , pos:Coord, latexStr:string){
    node
    .append("svg:foreignObject")
    .attr("width", 1)
    .attr("height", 1)
    .attr("overflow", 'visible')
    .style("font-size", '15px')
    .attr("x", this.xScale(pos.x))
    .attr("y", this.yScale(pos.y))
    .append("xhtml:div")
    .html(latex(latexStr))
  }


}