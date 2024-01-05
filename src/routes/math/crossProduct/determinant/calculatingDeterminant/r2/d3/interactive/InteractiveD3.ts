import * as d3 from 'd3';
import katex from "katex";
import EventEmitter from 'eventemitter3';
import * as mj from 'mathjs';
export enum RowOp {
  Mult,
  Swap,
  Add,
  All
}

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

export class InteractiveD3 {

  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
  svgNode!: SVGSVGElement | null;
  eventBroker: EventEmitter = new EventEmitter();
  width: number = 300;
  height: number = 300;
  marginTop: number = 20;
  marginRight: number = 20;
  marginBottom: number = 20;
  marginLeft: number = 20;
  xDomain = [-10, 10];
  yDomain = [-10, 10];
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  drawLine : d3.Line<PointVec>;
  snap2Grid: boolean = false;

  vectors: PointVec[];
  oriVectors: number[][];
  // circles: PointVec[];
  dragCircles!: SVGCircleElement[];
  swapRow: Boolean = false;

  mult: number[] = [1,1];

  vectorsCache : PointVec[] | null = null;
  rowOp!: RowOp;



  constructor(vectors:number[][],showOrientation:boolean,zoomIn:boolean, rowOp: RowOp) {
    console.log('rowOp',rowOp)
    this.rowOp = rowOp;
    this.oriVectors = vectors.map(v=>v.map(x=>x));
    if(zoomIn){
      this.xDomain=[-2,2];
      this.yDomain=[-2,2];
    }
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
    this.makeDragCircles();
    if(this.rowOp  === RowOp.Mult){
      this.makeBases();
    }
    if(showOrientation)this.makeOrientationCurve();

    this.eventBroker.addListener('toggleSnap2Grid',()=>{
      // this.snap2Grid=!this.snap2Grid;
      console.log(this.snap2Grid)
    });


    this.eventBroker.addListener('swapRow',()=>{
      this.swapRow = !this.swapRow;
      const newVec1 = this.vectors[1];
      const newVec2 = this.vectors[0];
      this.eventBroker.emit('newCirclesLocation',[newVec1, newVec2]);
      this.vectors = [newVec1, newVec2];
      this.makeShape();
      this.makeVectors();
      this.makeDragCircles();
      if(showOrientation)this.makeOrientationCurve();

    })
    this.eventBroker.addListener('reset',()=>{
      this.vectors = this.oriVectors.map(v=>{return {x:v[0],y:v[1]}});

      this.vectorsCache = {...this.vectors}; 
      this.eventBroker.emit('newCirclesLocation',[...this.vectors]);
      this.makeShape();
      this.makeVectors();
      this.makeDragCircles();
      if(this.rowOp  === RowOp.Mult){
        this.makeBases();
      }
      if(showOrientation)this.makeOrientationCurve();

    });
    this.eventBroker.addListener('mult',(c1:number,c2:number)=>{

      let newVec1 = {x:this.vectors[0].x*this.mult[0]*c1,y:this.vectors[0].y*this.mult[0]*c1};
      let newVec2 = {x:this.vectors[1].x*this.mult[1]*c2,y:this.vectors[1].y*this.mult[1]*c2};

      if(newVec1.x ===0 && newVec1.y===0 && this.vectorsCache){
        newVec1 = {x:c1 * this.vectorsCache[0].x , y:c1 * this.vectorsCache[0].y}
      }
      if(newVec2.x ===0 && newVec2.y===0 && this.vectorsCache){
        newVec2 = {x:c2 * this.vectorsCache[1].x , y:c2 * this.vectorsCache[1].y}
      }

      if(c1) this.mult[0]=1/c1;
      else this.mult[0]=1;
      if(c2) this.mult[1]=1/c2;
      else this.mult[1]=1;

      this.vectorsCache = [...this.vectors]; 
      this.eventBroker.emit('newCirclesLocation',[newVec1, newVec2]);
      this.vectors = [newVec1, newVec2];
      this.makeShape();
      this.makeVectors();
      this.makeDragCircles();
      if(this.rowOp  === RowOp.Mult){
        this.makeBases();
      }
      if(showOrientation)this.makeOrientationCurve();


    })

  }

  makeBases(){

    const ms = this.vectors.map((vec)=>vec.y/vec.x);
    const negX = this.xDomain[0]-1;
    const posX = this.xDomain[1]+1;
    const line1 = [{x:negX,y:ms[0]*negX},{x:posX,y:ms[0]*posX}];
    const line2 = [{x:negX,y:ms[1]*negX},{x:posX,y:ms[1]*posX}];

    this.svg.selectAll(".bases").remove();
    const group = this.svg.append('g').attr('class','bases');
    group.selectAll('path')
    .data([line1,line2])
    .join('path')
    .attr('d', (d)=>this.drawLine(d))
    .attr('stroke',(d,i)=>this.getColor(i,['red','blue']))
    .attr('fill', 'none')
    .attr("opacity","0.5")
  }

  makeDragCircles(){
    const data = this.vectors.map(p=> {return {x: this.xScale(p.x),y:this.yScale(p.y)}});
    this.svg.selectAll(".dragCircles").remove();
    const group = this.svg.append('g').attr('class','dragCircles');
    const updateCircles = (data:PointVec[])=>{
      if(this.snap2Grid)
      data.forEach(p=>{
        const gridX = this.xScale(Math.round(this.xScale.invert(p.x)));
        const gridY = this.yScale(Math.round(this.yScale.invert(p.y)));
        p.x = gridX;
        p.y = gridY;
      });
      group
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d)=> { return (d.x); })
      .attr('cy', (d)=> { return (d.y); })
      .attr('r',(d)=> 5)
      .attr('fill',(d,i)=>this.getColor(i,['red','blue']))
      .attr('fill-opacity',0.4)
      .on('mouseover', function (d, i) {
        d3.select(this).transition()
        .duration(499)
        .attr('r', (d)=>7);
        d3.select(this).style("cursor", "pointer"); 
      })
      .on('mouseout', function (d, i) {
        d3.select(this).transition()
        .duration(499)
        .attr('r', (d)=>5);
        d3.select(this).style("cursor", "default"); 
      })
    }


    const handleDrag = (event: d3.D3DragEvent<SVGCircleElement, any, any>) => {
      const update = () => {
        updateCircles(data);
        // this.eventBroker.emit('newCirclesLocation',this.dragCircles!.map(ci=>{return {x:ci.cx.baseVal.value,y:ci.cy.baseVal.value}}))
        this.eventBroker.emit('newCirclesLocation',data.map(p=>{
          return {
            x:this.xScale.invert(p.x),
            y:this.yScale.invert(p.y)
        }}))
      }
      if(this.rowOp===RowOp.Mult){
        this.makeBases();
      }
      event.subject.x = event.x;
      event.subject.y = event.y;
      update();
      // this.dragCircles.forEach(c=>console.log('circles',c))
    }
    const drag = d3.drag().on('drag', handleDrag);
    const initDrag = ()=>{
      updateCircles(data);
      group.selectAll('circle').call(drag as any);
    }

    initDrag();
    this.dragCircles = group.selectAll('circle').nodes() as SVGCircleElement[];

    const eventListen = this.eventBroker.addListener('toggleSnap2Grid',()=>{
      if(this.snap2Grid){
        data.forEach(p=>{
          const gridX = this.xScale(Math.round(this.xScale.invert(p.x)));
          const gridY = this.yScale(Math.round(this.yScale.invert(p.y)));
          p.x = gridX;
          p.y = gridY;
        })
        group
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', (d)=> { return (d.x); })
        .attr('cy', (d)=> { return (d.y); })
        .attr('r',(d)=> 5)
        .attr('fill',(d,i)=>this.getColor(i,['red','blue']))
        .attr('fill-opacity',0.4);
        this.dragCircles = group.selectAll('circle').nodes() as SVGCircleElement[];
        this.eventBroker.emit('newCirclesLocation',data.map(p=>{
          return {
            x:this.xScale.invert(p.x),
            y:this.yScale.invert(p.y)
          }
        }))
      }
    })

  }

  makeOrientationCurve(){

    const sum ={x:this.vectors[0].x+this.vectors[1].x, y:(this.vectors[0].y+this.vectors[1].y)};
    const curves = [[this.vectors[0], sum,   this.vectors[1]]];
    const curveFunc = d3.line<PointVec>()
    .x((d) => this.xScale(d.x*0.5))
    .y((d) => this.yScale(d.y*0.5))
    .curve(d3.curveCatmullRom.alpha(0.5));


    const det = mj.det([[this.vectors[0].x,this.vectors[0].y],[this.vectors[1].x,this.vectors[1].y]]);

    this.svg.selectAll('.orientationCurve').remove();
    const group = this.svg.append('g').attr('class','orientationCurve');
    group
    .selectAll('path')
    .data(curves)
    .join('path')
    // .data(curves)
    .attr("d", curveFunc)
    .attr('stroke',  det < 0 ?'black':'red')
    .attr('stroke-dasharray',"5,5")
    .attr('marker-end',  det < 0 ? 'url(#arrowBlack)' : 'url(#arrowRed)')
    .attr('fill', 'none');


  
    this.eventBroker.addListener('newCirclesLocation', (newPointVecs: PointVec[])=>{
      const det = mj.det([[newPointVecs[0].x,newPointVecs[0].y],[newPointVecs[1].x,newPointVecs[1].y]]);
      const vectors = newPointVecs.map(p=>p);
      const sum ={x:vectors[0].x+vectors[1].x, y:(vectors[0].y+vectors[1].y)};
      const curves = [[vectors[0], sum,   vectors[1]]]
      group
      .selectAll('path')
      .data(curves)
      .join('path')
      .attr("d", curveFunc)
      .attr('stroke',   det < 0 ?'black':'red')
      .attr('stroke-dasharray',"5,5")
      .attr('marker-end', det < 0 ? 'url(#arrowBlack)' : 'url(#arrowRed)')
      .attr('fill', 'none');
    })
  
  }

  makeShape(){
    this.svg.selectAll(".shape").remove();
    const group = this.svg.append('g').attr('class','shape');

    const vertices : [number,number][]= [[this.xScale(0),this.yScale(0)]];
    this.vectors.forEach(vec=>{
      vertices.push( [this.xScale(vec.x), this.yScale(vec.y)])
    })
    vertices.push([this.xScale(this.vectors[0].x+this.vectors[1].x),this.yScale(this.vectors[0].y+this.vectors[1].y)])
    const convexVerts = d3.polygonHull(vertices)
    if(convexVerts){
      // this.svg.append("polygon")
      group.selectAll('polygon')
      .data([convexVerts])
      .join('polygon')
      .attr("points", (d)=> d.join(" "))
      .attr("fill", "white")
      .attr("opacity","0.5")
    }

    this.eventBroker.addListener('newCirclesLocation', (newPointVecs: PointVec[])=>{
      const vertices : [number,number][]= [[this.xScale(0),this.yScale(0)]];
      newPointVecs.forEach(vec=>{
        vertices.push( [this.xScale(vec.x), this.yScale(vec.y)])
      })
      vertices.push([this.xScale(newPointVecs[0].x+newPointVecs[1].x),this.yScale(newPointVecs[0].y+newPointVecs[1].y)])
      const convexVerts = d3.polygonHull(vertices)

      if(convexVerts){
        // this.svg.append("polygon")
        group.selectAll('polygon')
        .data([convexVerts])
        .join('polygon')
        .attr("points", (d)=> d.join(" "))
        .attr("fill", "white")
        .attr("opacity","0.5")
      }
    })
  


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


    const arrowRed = this.svg.select('#arrow').clone(true)
    arrowRed.attr('fill', 'red')
    arrowRed.attr('id', 'arrowRed')

    const arrowBlue = this.svg.select('#arrow').clone(true)
    arrowBlue.attr('fill', 'blue')
    arrowBlue.attr('id', 'arrowBlue')


    const arrowBlack = this.svg.select('#arrow').clone(true)
    arrowBlack.attr('fill', 'black')
    arrowBlack.attr('id', 'arrowBlack')
  }


  getColor(idx:number, colors:string[]){
    if(this.swapRow) colors.reverse();
    return colors[idx];
  }

  makeVectors(){
    this.svg.selectAll(".vecs").remove();

    const group = this.svg.append('g').attr('class','vecs'); 
    
    // const groups = [group1,group2];

    const vec0 = {x:0,y:0};
    const vec1 =  this.vectors[0]! ;
    const vec2 =  this.vectors[1]! ;

    // this.svg
      // .append('path')
      group.selectAll('path')
      .data([  [vec0,vec1],[vec0,vec2]])
      .join('path')
      .attr('d', (d)=>this.drawLine(d))
      .attr('stroke',(d,i)=>this.getColor(i,['red','blue']))
      .attr('marker-end',(d,i)=>this.getColor(i,['url(#arrowRed)','url(#arrowBlue)']))
      .attr('fill', 'none');

    this.eventBroker.addListener('newCirclesLocation', (newPointVecs: PointVec[])=>{
      const vec0 = {x:0,y:0};
      const vec1 = newPointVecs[0]!;
      const vec2 = newPointVecs[1]!;
      this.vectors[0]=vec1;
      this.vectors[1]=vec2;
      group.selectAll('path')
      .data([  [vec0,vec1],[vec0,vec2]])
      .join('path')
      .attr('d', (d)=>this.drawLine(d))
      .attr('stroke',(d,i)=>this.getColor(i,['red','blue']))
      .attr('marker-end',(d,i)=>this.getColor(i,['url(#arrowRed)','url(#arrowBlue)']))
      .attr('fill', 'none');
    })
  
    // this.svg
    //   .append('path')
    //   .attr('d', this.drawLine([vec0, vec2]))
    //   .attr('stroke', 'blue')
    //   .attr('marker-end', 'url(#arrowBlue)')
    //   .attr('fill', 'none');

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