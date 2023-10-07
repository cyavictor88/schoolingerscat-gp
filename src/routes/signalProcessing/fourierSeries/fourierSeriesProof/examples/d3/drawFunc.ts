import * as d3 from 'd3';
import katex from "katex";

function latex(math: string) {
  const mathmlHtml = katex.renderToString(math, {
    throwOnError: false,
    output: "mathml",
  });
  return mathmlHtml;
}



let xlb = -4 * Math.PI;
let xub = -1 * xlb;

let yub = 30;
let ylb = 0;

interface MyData {
  x: number;
  y: number;
}

function linspace(startValue: number, stopValue: number, cardinality: number) {
  const arr = [];
  const step = (stopValue - startValue) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) arr.push(startValue + (step * i));
  return arr;
}

function genData(): MyData[] {
  const xs = linspace(xlb*2, xub*2, 599);
  const ys = xs.map(t => 12 * Math.cos(2 * t) * Math.sin(t) + 16)
  const arr: MyData[] = [];
  for (let i = 0; i < xs.length; i++) arr.push({ x: xs[i], y: ys[i] });
  return arr;
}

export function drawFunc() {
  const data: MyData[] = genData();
  const width = 500;
  const height = 300;
  const marginTop = 20;
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
    .style("stroke", "green")
    .style("fill", "none")
    .attr("d", drawLine(data))

  funcPath.datum<MyData[]>(data.filter(d => d.x >= xScale.domain()[0] && d.x <= xScale.domain()[1])).attr('d', drawLine.x(d => xScale(d.x)));


  const periodLines = linspace(-6 * Math.PI, 6 * Math.PI, 7).map((x, i) => {
    return [{ x: x, y: ylb }, { x: x, y: yub }]
  });

  const periodPaths = periodLines.map(lineData => {
    return  svg.append('path')
      .style("stroke", "black")
      .attr("stroke-dasharray", "5,5")
      .style("fill", "none")
      .attr("d", drawLine(lineData as MyData[]))
  });

  const zoomBehavior: any= d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0, 10])
    .on('zoom', zoomed);

  function zoomed(event: d3.D3ZoomEvent<Element, any>) {
    const new_xScale = event.transform.rescaleX(xScale);
    xAxis.call(d3.axisBottom(new_xScale));

    funcPath.datum<MyData[]>(data.filter(d => d.x >= new_xScale.domain()[0] && d.x <= new_xScale.domain()[1])).attr('d', drawLine.x(d => new_xScale(d.x)));
    periodPaths.forEach( (p,i)=>p.datum<MyData[]>(periodLines[i].filter(d => d.x >= new_xScale.domain()[0] && d.x <= new_xScale.domain()[1]) ).attr('d', drawLine.x(d => new_xScale(d.x))));
    
  }
  d3.select(svg.node()).call(zoomBehavior)
  // svg.call(zoomBehavior);


  return svg.node();
}