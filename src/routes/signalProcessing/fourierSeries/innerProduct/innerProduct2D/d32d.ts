import { FIG_COLOR, getColor } from '$lib/theme/colors';
import * as d3 from 'd3';
import katex from "katex";




function getTicks(start: number, end: number) {
  const res = [];
  while (start <= end) {
    res.push(start);
    start += 1;
  }
  return res;
}


const veca = { x: 2, y: 4 };
const vecb = { x: 5, y: 2 };
const vec0 = { x: 0, y: 0 };
const r = 1;
const aTheta = Math.atan(veca.y / veca.x);
const bTheta = Math.atan(vecb.y / vecb.x);
const controlPointTheta =  (aTheta + bTheta)/2 //bTheta + 0.5 * (aTheta - bTheta);


const xDomain = [-6, 6];
const yDomain = [-6, 6];

// Declare the chart dimensions and margins.
const width = 400;
const height = 300;
const marginTop = 20;
const marginRight = 100;
const marginBottom = 30;
const marginLeft = 40;

const xTicks = getTicks(xDomain[0], xDomain[1]);
const yTicks = getTicks(yDomain[0], yDomain[1]);




// Declare the x (horizontal position) scale.
const xScale = d3.scaleLinear()
  .domain(xDomain)
  .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const yScale = d3.scaleLinear()
  .domain(yDomain)
  .range([height - marginBottom, marginTop]);

function latex(math: string) {

  const mathmlHtml = katex.renderToString(math, {
    throwOnError: false,
    output: "mathml",
    displayMode: false,
  });
  return mathmlHtml;
}

const drawLine = d3.line<{ x: number, y: number }>()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y))

export function baseFig() {

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border","1px black solid")

  function drawCurve(context: d3.Path) {

    context.moveTo(xScale(r * Math.cos(aTheta)), yScale(r * Math.sin(aTheta))); // move current point to ⟨10,10⟩
    context.quadraticCurveTo(xScale(1.2 * r * Math.cos(controlPointTheta)), yScale(1.2 * r * Math.sin(controlPointTheta)), xScale(r * Math.cos(bTheta)), yScale(r * Math.sin(bTheta))); // draw an arc, the turtle ends up at ⟨194.4,108.5⟩
    return context; // not mandatory, but will make it easier to chain operations
  }


  for (let i = 1; i < xTicks.length-1; i++) {
    const p0 = { x: xTicks[i], y: yTicks[0] }
    const p1 = { x: xTicks[i], y: yTicks[yTicks.length - 1] }
    svg.append('path')
    .style("stroke", "grey")
    .style("fill", "none")
    .attr("d", drawLine([p0, p1]))
  }

  for (let j = 1; j < yTicks.length-1; j++) {
    const p0 = { x: xTicks[0], y: yTicks[j] }
    const p1 = { x: xTicks[xTicks.length-1], y: yTicks[j] }
    svg.append('path')
    .style("stroke", "grey")
    .style("fill", "none")
    .attr("d", drawLine([p0, p1]))
  }



  svg.append('path')
    .style("stroke", "black")
    .style("fill", "none")
    .attr("d", drawCurve(d3.path()).toString())

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
    .attr("x", xScale(6))
    .attr("y", yScale(-0))
    .style("font-size", fontSize + "px")
    .attr("dy", yScale.invert(fontSize * 0.5))
    .style('fill', 'black')
    .attr("text-anchor", "start")
    .text("X");

  const textYaxis = svg.append("text")
    .attr("x", xScale(0))
    .attr("y", yScale(6.1))
    .style("font-size", fontSize + "px")
    .style('fill', 'black')
    .attr("text-anchor", "middle")
    .text("Y");


  svg.selectAll('text').style('fill', 'black')


  const arrowSize = 10;
  const markerBoxWidth = arrowSize;
  const markerBoxHeight = arrowSize;
  const refX = markerBoxWidth / 1;
  const refY = markerBoxHeight / 2;
  // const arrowPoints :[number,number][]= [[0, 0], [0, arrowSize], [arrowSize, arrowSize/2]];
  const arrowPoints: [number, number][] = [[0, 0], [arrowSize, arrowSize / 2], [0, arrowSize], [arrowSize / 2, arrowSize / 2]];


  const arrowLine = d3.line<[number, number]>().x(d => (d[0])).y(d => (d[1]));

  const arrow = svg
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
  // .attr('d', d3.line()(arrowPoints))
  // .attr('fill', 'black')
  // .attr('stroke', 'red');


  const arrowRed = svg.select('#arrow').clone(true)
  arrowRed.attr('fill', 'red')
  arrowRed.attr('id', 'arrowRed')





interface LineData {
  x: number,
  y:number
}




function dragLineStart(this: SVGPathElement, event:d3.D3DragEvent<SVGPathElement, LineData, any>, d: LineData) {
  d3.select(this).raise().classed("active", true);
}

function dragLineDraging(this:SVGPathElement,event:d3.D3DragEvent<SVGPathElement, LineData, any>, d: LineData) {
console.log(this)
console.log(d3.select(this))
  d3.select(this)
  .attr('d', drawLine([vec0, {x:xScale.invert(event.x), y:yScale.invert(event.y)}]))
      
}

function dragLineEnd(this:SVGPathElement,event: d3.D3DragEvent<SVGPathElement, LineData, any>) {
  d3.select(this).classed("active", false);
}


// Create drag behavior
const dragLine = d3.drag<SVGPathElement, LineData>()
    .on("start", dragLineStart)
    .on("drag", dragLineDraging)
    .on("end", dragLineEnd);


  svg
    .append('path')
    .attr('d', drawLine([vec0, veca]))
    .attr('stroke', 'red')
    .attr('marker-end', 'url(#arrowRed)')
    .attr('fill', 'red')
    .attr('id','veca')
    // .call(dragLine as any);

  const arrowBlue = svg.select('#arrow').clone(true)
  arrowBlue.attr('fill', 'Blue')
  arrowBlue.attr('id', 'arrowBlue')

  svg
    .append('path')
    .attr('d', drawLine([vec0, vecb]))
    .attr('stroke', 'blue')
    .attr('marker-end', 'url(#arrowBlue)')
    .attr('fill', 'blue');

  svg
    .append('path')
    .attr('d', drawLine([vecb, veca]))
    .attr('stroke', 'brown')
    .style("stroke-dasharray", ("3, 3"))
    .attr('fill', 'brown');







  svg
    .append("svg:foreignObject")
    .attr("width", 1)
    .attr("height", 1)
    .attr("overflow", 'visible')
    .style("font-size", '12px')
    .attr("x", xScale(1.3 * r * Math.cos(1.*controlPointTheta)))
    .attr("y", yScale(1.3 * r * Math.sin(1.*controlPointTheta)))
    .append("xhtml:div")
    .html(latex('\\theta'))
    .style("transform","translateY(-50%)")




    interface CircleData {
      cx: number;
      cy: number;
      radius: number;
    }


    const initialCircleData : CircleData = {
      cx: xScale(veca.x),
      cy: yScale(veca.y),
      radius: 2,
    }

    function drajstarted(this: SVGCircleElement, event:d3.D3DragEvent<SVGCircleElement, CircleData, any>, d: CircleData) {
        d3.select(this).raise().classed("active", true);
    }
    
    function draggedC(this:SVGCircleElement,event:d3.D3DragEvent<SVGCircleElement, CircleData, any>, d: CircleData) {
        d3.select(this)
            .attr("cx", (event.x))
            .attr("cy", (event.y));
        d3.select('#veca').attr('d',drawLine([vec0, {x:xScale.invert(event.x),y:yScale.invert(event.y)}]))
    }
    
    function dragendedC(this:SVGCircleElement,event: d3.D3DragEvent<SVGCircleElement, CircleData, any>) {
        d3.select(this).classed("active", false);
    }
    


// Create drag behavior
const dragC = d3.drag<SVGCircleElement, CircleData>()
    .on("start", drajstarted)
    .on("drag", draggedC)
    .on("end", dragendedC);



    const circle = svg.append("circle")
    .attr("class", "draggable-circle")
    .attr("cx", initialCircleData.cx)
    .attr("cy", initialCircleData.cy)
    .attr("r", initialCircleData.radius*3)
    .call(dragC as any);



  return svg.node();
}
