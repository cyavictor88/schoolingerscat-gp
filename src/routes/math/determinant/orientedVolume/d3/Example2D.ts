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


interface PointVec {
  x:number,
  y:number
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
  drawLine : d3.Line<PointVec>;

  vectors: PointVec[];
  constructor(vectors:number[][]) {
    this.vectors = vectors.map(v=>{return {x:v[0],y:v[1]}});
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

    this.drawLine = d3.line<PointVec>()
      .x(d => this.xScale(d.x))
      .y(d => this.yScale(d.y))
    
    this.makeGrid();
    this.makeAxis();
    this.makeShape();
    this.defArrow();
    this.makeVectors();




  }

  makeShape(){
    const vertices : [number,number][]= [[this.xScale(0),this.yScale(0)]];
    this.vectors.forEach(vec=>{
      vertices.push( [this.xScale(vec.x), this.yScale(vec.y)])
    })
    vertices.push([this.xScale(this.vectors[0].x+this.vectors[1].x),this.yScale(this.vectors[0].y+this.vectors[1].y)])
    const convexVerts = d3.polygonHull(vertices)
    if(convexVerts)
    this.svg.append("polygon")
    .attr("points", convexVerts.join(" "))
    .attr("fill", "lightgreen")
    .attr("opacity","0.5")

  }
  defArrow(){
    const arrowSize = 10;
    const markerBoxWidth = arrowSize;
    const markerBoxHeight = arrowSize;
    const refX = markerBoxWidth / 1;
    const refY = markerBoxHeight / 2;
    const arrowPoints: PointVec[] = [{x:0,y:0}, {x:arrowSize, y:arrowSize / 2}, {x:0, y:arrowSize}, {x:arrowSize / 2, y:arrowSize / 2}];
    const arrowLine = d3.line<PointVec>().x(d => (d.x)).y(d => (d.y));
   
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

  makeVectors(){

    const vec0 = {x:0,y:0};
    const vec1 = this.vectors[0]!;
    const vec2 = this.vectors[1]!;
    const arrowRed = this.svg.select('#arrow').clone(true)
    arrowRed.attr('fill', 'red')
    arrowRed.attr('id', 'arrowRed')
  
    this.svg
      .append('path')
      .attr('d', this.drawLine([vec0, vec1]))
      .attr('stroke', 'red')
      .attr('marker-end', 'url(#arrowRed)')
      .attr('fill', 'none');

      const arrowBlue = this.svg.select('#arrow').clone(true)
      arrowBlue.attr('fill', 'blue')
      arrowBlue.attr('id', 'arrowBlue')
    
      this.svg
        .append('path')
        .attr('d', this.drawLine([vec0, vec2]))
        .attr('stroke', 'blue')
        .attr('marker-end', 'url(#arrowBlue)')
        .attr('fill', 'none');

  }
  makeGrid(){
    const maxXTick = this.xDomain[1]-1;
    const maxYTick = this.yDomain[1]-1;
    const xs = Array.from({length: 2*(maxXTick)+1},(_,i)=> i-(maxXTick));
    const ys = Array.from({length: 2*(maxYTick)+1},(_,i)=> i-(maxYTick));
    const gridLines :{start : PointVec, end: PointVec}[] = [];
    xs.forEach(x=>{gridLines.push({start: {x,y:ys[0]-1} ,end:{x,y:ys[ys.length-1]+1} })});
    ys.forEach(y=>{gridLines.push({start: {y,x:xs[0]-1} ,end:{y,x:xs[xs.length-1]+1} })});
    const group= this.svg.append('g').attr('class','gridLines');
    group.selectAll('path').data(gridLines).join('path')
    .style("stroke", "black")
    .style("fill", "none")
    .style("opacity",'0.5')
    .attr("d", (d)=>this.drawLine([d.start, d.end]))

  }


  makeAxis(){
    const xAxis = this.svg.append('path')
      .style("stroke", "black")
      .style("fill", "none")
      .attr("d", this.drawLine([{ x: this.xDomain[0], y: 0 }, { x: this.xDomain[1], y: 0 }]))
  
    const yAxis = this.svg.append('path')
      .style("stroke", "black")
      .style("fill", "none")
      .attr("d", this.drawLine([{ x: 0, y: this.yDomain[0] }, { x: 0, y: this.yDomain[1] }]))  
  }
}