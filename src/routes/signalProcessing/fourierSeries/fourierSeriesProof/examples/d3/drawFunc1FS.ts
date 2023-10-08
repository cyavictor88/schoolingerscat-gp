import { goto } from '$app/navigation';
import * as d3 from 'd3';
import katex from "katex";
import { genDataF1 } from './drawFunc1';

function latex(math: string) {
  const mathmlHtml = katex.renderToString(math, {
    throwOnError: false,
    output: "mathml",
  });
  return mathmlHtml;
}

const xlb = -4 * Math.PI;
const xub = -1 * xlb;

const yub = 30;
const ylb = 0;

const period = 2 * Math.PI;

const getPeriodBound = (lb: number, ub: number) => {
  const maxPeriod = Math.ceil(ub / period);
  const minPeriod = Math.floor(lb / period) - 1;
  return [maxPeriod * period, minPeriod * period, maxPeriod - minPeriod + 1];
}

interface MyData {
  x: number;
  y: number;
}

function linSpace(startValue: number, stopValue: number, cardinality: number) {
  const arr = [];
  const step = (stopValue - startValue) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) arr.push(startValue + (step * i));
  return arr;
}

function genData(xBounds?: number[]): MyData[] {
  let bounds = [xlb, xub];
  if (xBounds) bounds = xBounds;
  const xs = linSpace(bounds[0], bounds[1], 100 * (bounds[1] - bounds[0]));
  // function1 is here: y = 16 - 6sin(t) + 6sin(3t)
  const ys = xs.map(t => 16 -6 * Math.sin(t)+6* Math.sin(3*t) )
  const arr: MyData[] = [];
  for (let i = 0; i < xs.length; i++) arr.push({ x: xs[i], y: ys[i] });
  return arr;
}

export function drawFunc1FS() {
  const oriData: MyData[] = genDataF1();
  const data: MyData[] = genData();
  const width = 500;
  const height = 300;
  const marginTop = 30;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;
  const xDomain = [xlb, xub];
  const yDomain = [ylb, yub];

  // Declare the x (vertical position) scale.
  const xScale = d3.scaleLinear()
    .domain(xDomain)
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const yScale = d3.scaleLinear()
    .domain(yDomain)
    .range([height - marginBottom, marginTop]);

  // Create SVG
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .style('border', '1px black solid')
  // .attr("overflow", 'visible');

  // Add the x-axis.
  const xAxis = svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(xScale));

  // Add the y-axis.
  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(yScale));


  const drawLine = d3.line<{ x: number, y: number }>()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))



  const funcPath = svg.append('path')
    .style("stroke", "olive")
    .attr("stroke-dasharray","20,5")
    .style("fill", "none")
    .style('stroke-width','3px')
    .attr("d", drawLine(oriData))

  funcPath.datum<MyData[]>(data.filter(d => d.x >= xScale.domain()[0] && d.x <= xScale.domain()[1])).attr('d', drawLine.x(d => xScale(d.x)));

  const oriFuncPath = svg.append('path')
    .style("stroke", "green")
    .style("fill", "none")
    .attr("d", drawLine(data))

    oriFuncPath.datum<MyData[]>(data.filter(d => d.x >= xScale.domain()[0] && d.x <= xScale.domain()[1])).attr('d', drawLine.x(d => xScale(d.x)));




  const groupPeriodPath = svg.append('g').attr('class', 'periodPaths')
  let periodLines = linSpace(...getPeriodBound(xScale.domain()[0], xScale.domain()[1]) as [number, number, number])
    .map((x, i) => {
      return [{ x: x, y: ylb }, { x: x, y: yub }]
    });

  groupPeriodPath.selectAll('path')
    .data(periodLines)
    .join('path')
    .style("stroke", "black")
    .attr("stroke-dasharray", "5,5")
    .style("fill", "none")
    .attr("d", d => drawLine(d as MyData[]))

  function zoomed(event: d3.D3ZoomEvent<Element, any>) {
    const new_xScale = event.transform.rescaleX(xScale);
    xAxis.call(d3.axisBottom(new_xScale));

    funcPath.datum<MyData[]>(
      genData([new_xScale.domain()[0], new_xScale.domain()[1]])
    ).attr('d', drawLine.x(d => new_xScale(d.x)));


    oriFuncPath.datum<MyData[]>(
      genDataF1([new_xScale.domain()[0], new_xScale.domain()[1]])
    ).attr('d', drawLine.x(d => new_xScale(d.x)));

    const newPeriodLines = linSpace(...getPeriodBound(new_xScale.domain()[0], new_xScale.domain()[1]) as [number, number, number])
      .map((x, i) => {
        return [{ x: x, y: ylb }, { x: x, y: yub }]
      }).filter(lineData => {
        return lineData[0].x >= new_xScale.domain()[0] && lineData[0].x <= new_xScale.domain()[1]
      });

    const newDrawLine = d3.line<{ x: number, y: number }>()
      .x(d => new_xScale(d.x))
      .y(d => yScale(d.y))

    groupPeriodPath.selectAll('path')
      .data(newPeriodLines)
      .join('path')
      .style("stroke", "black")
      .attr("stroke-dasharray", "5,5")
      .style("fill", "none")
      .attr("d", d => newDrawLine(d as MyData[]))
  }

  const zoomBehavior: any = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.1, 10])
    .on('zoom', zoomed);

  d3.select(svg.node()).call(zoomBehavior)

  const drawLineRawPixel = d3.line<{ x: number, y: number }>()
    .x(d => (d.x))
    .y(d => (d.y));

    const legendPoints: MyData[] = [{ x: 80, y: 10 }, { x: 85, y: 10 }];
    const legendPoints2: MyData[] = [{ x: 87, y: 10 }, { x: 93, y: 10 }];
    const legendPoints3: MyData[] = [{ x: 95, y: 10 }, { x: 100, y: 10 }];

    const dashLegend = svg.append('g').attr('class', 'dashLegend')

    dashLegend.selectAll('path')
    .data([legendPoints,legendPoints2,legendPoints3])
    .join('path')
    .style('fill', 'olive')
    .style("stroke", "olive")
    .attr("d", d => drawLineRawPixel(d))

    const oriLegendPoints: MyData[] = [{ x: 300, y: 10 }, { x: 320, y: 10 }]

    svg.append('path')
      .style('fill', 'green')
      .style("stroke", "green")
      .attr("d", drawLineRawPixel(oriLegendPoints)) 
    svg
      .append("svg:foreignObject")
      .attr("width", 1)
      .attr("height", 1)
      .attr("overflow", 'visible')
      .style("font-size", '12px')
      .attr("x", 325)
      .attr("y", 2)
      .append("xhtml:div")
      .html(latex('\\color{green}y(t)=12cos(2t)sin(t)+16'))

  svg
    .append("svg:foreignObject")
    .attr("width", 1)
    .attr("height", 1)
    .attr("overflow", 'visible')
    .style("font-size", '12px')
    .attr("x", 105)
    .attr("y", 2)
    .append("xhtml:div")
    .html(latex('\\color{olive}y(t)=16-6sin(t)+6sin(3t)'))

  svg.append("text")
    .text("Figure 2")
    .attr("x", 5)
    .attr("y", 15);

  return svg.node();
}