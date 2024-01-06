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

export class RowSumArea {
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

  toggleGroupNewArea : d3.Selection<SVGGElement, undefined, null, undefined>;
  toggleGroupOldArea : d3.Selection<SVGGElement, undefined, null, undefined>;

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
    .y(d => this.yScale(d.y));
    this.makeShade(veca,vecb);

    this.makeLine(veca,'#b3b3cc');
    this.makeLine(veca,'#b3b3cc',vecb);
    this.makeSeg(vecbPrime, vecb,'black');
    this.makeSeg(vecbPrime, {x:veca.x*2,y:veca.y*2},'black');
    // this.makeLine(veca,'#b3b3cc');
    this.makeHeight(veca,vecb);



    this.makeVec({x:veca.x*2,y:veca.y*2},'2v','#e066ff', `2\\overrightarrow{v}`);
    this.makeVec(vecbPrime,'2v+b','purple', `\\overrightarrow{b\\prime}`);

    this.makeVec(veca,'v','Red',`\\overrightarrow{v}`);
    this.makeVec(vecb,'b','Blue',`\\overrightarrow{b}`);
    const fontSize = 20;
   

    this.toggleGroupOldArea = this.makeToggleGroup(veca,vecb);
    this.toggleGroupNewArea = this.makeToggleGroup(veca,vecbPrime);
    // this.makeVecaDecomp(veca);
  
    this.eventBroker.addListener('toggleShowOldArea',()=>{
      const showing =  this.toggleGroupOldArea.style('display');
      if(showing!=='none'){
        this.toggleGroupOldArea.style('display','none');
      }
      else{
        this.toggleGroupOldArea.style('display','inline');
      }

    })
    this.eventBroker.addListener('toggleShowNewArea',()=>{
      const showing =  this.toggleGroupNewArea.style('display');
      if(showing!=='none'){
        this.toggleGroupNewArea.style('display','none');
      }
      else{
        this.toggleGroupNewArea.style('display','inline');
      }

    })
  }
  makeHeight(veca: Coord, vecb:Coord){
    const magA = Math.sqrt(veca.x*veca.x + veca.y*veca.y);
    const magB = Math.sqrt(vecb.x*vecb.x + vecb.y*vecb.y);
    const dot =  mj.dot([veca.x,veca.y], [vecb.x,vecb.y]);
    const scale = Math.abs(dot/(magA*magA));
    const scaledA = {x:veca.x*scale,y:veca.y*scale};
    const heightVec = {x:scaledA.x +vecb.x, y:scaledA.y + vecb.y};
    const svg = this.svg;
    svg
      .append('path')
      .attr('d', this.drawLine([this.vec0, heightVec]))
      .attr('stroke','grey')
      .attr('fill', 'none');
      console.log(heightVec,'heightVec')

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


    const groupAreaPath = toggleGroup.append('g')//.attr('class', 'areaPaths')
    const areaLines = [ {x:0,y:0},veca,  {x:vecSum[0], y:vecSum[1]},vecb  ];
    groupAreaPath
      .append('path')
      .style("stroke", "none")
      .style("fill", "white")
      .style('opacity','0.5')
      .attr("d", d => this.drawLine(areaLines))
    return toggleGroup
  }

  makeSeg(vec0:Coord,vec1:Coord,color:string){
    const svg = this.svg;
    svg
      .append('path')
      .attr('d', this.drawLine([vec0, vec1]))
      .attr('stroke',color)
      .style("stroke-dasharray", ("3, 3"))
      .attr('fill', 'none');
  }

  makeShade(veca:Coord,vecb:Coord){
    const data = [

      {
        // line1 data
        x:[veca.x*10,-veca.x*10],
        y:[veca.y*10,-veca.y*10],
      },
      {
        // line2 data
        x:[veca.x*10+vecb.x,-veca.x*10+vecb.x],
        y:[veca.y*10+vecb.y,-veca.y*10+vecb.y],
      }
      ];
      const areaLines = [ {x:veca.x*10,y:veca.y*10},{x:-veca.x*10,y:-veca.y*10},{x:-veca.x*10+vecb.x,y:-veca.y*10+vecb.y},{x:veca.x*10+vecb.x,y:veca.y*10+vecb.y }  ];
      this.svg
        .append('path')
        .style("stroke", "none")
        .style("fill", "yellow")
        .style('opacity','0.5')
        .attr("d", d => this.drawLine(areaLines))
  }

  makeLine(vec:Coord, color:string, offset?:Coord){
    const svg = this.svg;
    const vec0 = {x:0,y:0};
    const vecPos = {x:vec.x*10,y:vec.y*10};
    const vecNeg = {x:vec.x*-10,y:vec.y*-10};
    if(offset){
      vecPos.x += offset.x;
      vecPos.y += offset.y;
      vecNeg.x += offset.x;
      vecNeg.y += offset.y;
    }
    svg
      .append('path')
      .attr('d', this.drawLine([vecNeg, vecPos]))
      .attr('stroke',color)
      .attr('fill', 'none');
  }

  makeVec(vec:{x:number,y:number},vecName:string,color:string,latex:string){
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
    let xPos = (vec.x*1.2)
    let yPos =(vec.y *1.2)
    if(vecName === 'b'){
      xPos = (vec.x*1.2)
      yPos =(-1.2)
    }
    if(vecName === '2v+b') {
      xPos = (-vec.x*0.)
      yPos =(vec.y *1.3)
    }
    this.makeLatex(svg, {x:xPos,y:yPos},`\\color{${color}}${latex}`)
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


  // makeVecaDecomp(vec: Coord){
  //   const vec0 = this.vec0;
  //   const vecDecompLines = [ 
  //     [vec0, {x:0,y:vec.y}],
  //     [{x:0,y:vec.y}, vec]
  //   ];
  
  //   this.toggleGroup.append('g').selectAll('path')
  //     .data(vecDecompLines)
  //     .join('path')
  //     .style("stroke", "green")
  //     .style("fill", "none")
  //     .style('opacity','0.5')
  //     .attr('stroke-width','2')
  //     .attr("d", d => this.drawLine(d as Coord[]));
  // }

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