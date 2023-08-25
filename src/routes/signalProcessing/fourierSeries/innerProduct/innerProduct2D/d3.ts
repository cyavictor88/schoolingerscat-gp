import * as d3 from 'd3';
import katex from "katex";


const veca = { x: 2, y: 4 };
const vecb = { x: 5, y: 2 };
const vecO = { x: 0, y: 0 };
const r = 1;
const aTheta = Math.atan(veca.y / veca.x);
const bTheta = Math.atan(vecb.y / vecb.x);
const controlPointTheta = bTheta + 0.5 * (aTheta - bTheta);

const xDomain = [0, 5.5];
const yDomain = [0, 5.5];

// Declare the chart dimensions and margins.
const width = 400;
const height = 300;
const marginTop = 20;
const marginRight = 100;
const marginBottom = 30;
const marginLeft = 40;


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


export function baseFig() {

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)

  function drawPath(context: d3.Path) {

    context.moveTo(xScale(r * Math.cos(aTheta)), yScale(r * Math.sin(aTheta))); // move current point to ⟨10,10⟩
    context.quadraticCurveTo(xScale(1.2 * r * Math.cos(controlPointTheta)), yScale(1.2 * r * Math.sin(controlPointTheta)), xScale(r * Math.cos(bTheta)), yScale(r * Math.sin(bTheta))); // draw an arc, the turtle ends up at ⟨194.4,108.5⟩
    return context; // not mandatory, but will make it easier to chain operations
  }

  const drawLine = d3.line<{ x: number, y: number }>()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))

  svg.append('path')
    .style("stroke", "black")
    .style("fill", "none")
    .attr("d", drawPath(d3.path()).toString())

  svg.append('path')
    .style("stroke", "black")
    .style("fill", "none")
    .attr("d", drawLine([{ x: 0, y: 0 }, { x: 5, y: 0 }]))

  svg.append('path')
    .style("stroke", "black")
    .style("fill", "none")
    .attr("d", drawLine([{ x: 0, y: 0 }, { x: 0, y: 5 }]))


  const fontSize = 20;
  const textXaxis = svg.append("text")
    .attr("x", xScale(5))
    .attr("y", yScale(-0))
    .style("font-size", fontSize + "px")
    .attr("dy", yScale.invert(fontSize * 0.5))
    .style('fill', 'black')
    .attr("text-anchor", "start")
    .text("X");

  const textYaxis = svg.append("text")
    .attr("x", xScale(0))
    .attr("y", yScale(5.1))
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



  svg
    .append('path')
    .attr('d', drawLine([vecO, veca]))
    .attr('stroke', 'red')
    .attr('marker-end', 'url(#arrowRed)')
    .attr('fill', 'none');

  const arrowBlue = svg.select('#arrow').clone(true)
  arrowBlue.attr('fill', 'Blue')
  arrowBlue.attr('id', 'arrowBlue')

  svg
    .append('path')
    .attr('d', drawLine([vecO, vecb]))
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
    .style("font-size", '15px')
    .style("border", "1px black solid")
    .attr("x", xScale(veca.x / 2 + vecb.x / 2 + 0.1))
    .attr("y", yScale(veca.y / 2 + vecb.y / 2 + 0.3))
    .append("xhtml:div")
    .html(latex('\\color{brown}d'))

  svg
    .append("svg:foreignObject")
    .attr("width", 1)
    .attr("height", 1)
    .attr("overflow", 'visible')
    .style("font-size", '15px')
    .style("border", "1px black solid")
    .attr("x", xScale(veca.x - 0.3))
    .attr("y", yScale(veca.y + 0.5))
    .append("xhtml:div")
    .html(latex('\\color{red}\\overrightarrow{a}=(a_x,a_y)'))


  svg
    .append("svg:foreignObject")
    .attr("width", 1)
    .attr("height", 1)
    .attr("overflow", 'visible')
    .style("font-size", '15px')
    .style("border", "1px black solid")
    .attr("x", xScale(vecb.x + 0.1))
    .attr("y", yScale(vecb.y + 0.5))
    .append("xhtml:div")
    .html(latex('\\color{blue}\\overrightarrow{b}=(b_x,b_y)'))

  svg
    .append("svg:foreignObject")
    .attr("width", 1)
    .attr("height", 1)
    .attr("overflow", 'visible')
    .style("font-size", '15px')
    .style("border", "1px black solid")
    .attr("x", xScale(1.2 * r * Math.cos(controlPointTheta)))
    .attr("y", yScale(1.2 * r * Math.sin(controlPointTheta * 2)))
    .append("xhtml:div")
    .html(latex('\\theta'))

  return svg;
}


export function getFig1(){
  return baseFig().node();
}

export function getFig2(){
  const svg = baseFig();
  svg
  .append("svg:foreignObject")
  .attr("width", 1)
  .attr("height", 1)
  .attr("overflow", 'visible')
  .style("font-size", '11px')
  .style("border", "1px black solid")
  .attr("x", xScale(veca.x/2*1.1))
  .attr("y", yScale(veca.y/2*1.1))
  .append("xhtml:div")
  .html(latex('\\color{red}||a||=({a_x}^2 + {a_y}^2)^{0.5}'));

  svg
  .append("svg:foreignObject")
  .attr("width", 1)
  .attr("height", 1)
  .attr("overflow", 'visible')
  .style("font-size", '11px')
  .style("border", "1px black solid")
  .attr("x", xScale(vecb.x/2*0.9))
  .attr("y", yScale(vecb.y/2*0.9))
  .append("xhtml:div")
  .html(latex('\\color{blue}||b||=({b_x}^2 + {b_y}^2)^{0.5}'));

  return svg.node();

}
