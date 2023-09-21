import * as d3 from 'd3';
import katex from "katex";


function latex(math: string) {

  const mathmlHtml = katex.renderToString(math, {
    throwOnError: false,
    output: "mathml",
    // center: false,
  });
  return mathmlHtml;

}




export function svgF1() {
  // Declare the chart dimensions and margins.
  const width = 300;
  const height = 300;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  const veca = { x: 2, y: 4 };
  const vecb = { x: 4, y: 2 };
  const vecO = { x: 0, y: 0 };
  const r = 1;
  const aTheta = Math.atan(veca.y / veca.x);
  const bTheta = Math.atan(vecb.y / vecb.x);
  const controlPointTheta = bTheta + 0.5 * (aTheta - bTheta);

  const xDomain = [0, 5.5];
  const yDomain = [0, 5.5];
  // Declare the x (horizontal position) scale.
  const xScale = d3.scaleLinear()
    .domain(xDomain)
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const yScale = d3.scaleLinear()
    .domain(yDomain)
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("overflow", 'visible');

  // Add the x-axis.
  // svg.append("g")
  //   .attr("transform", `translate(0,${height - marginBottom})`)
  //   .call(d3.axisBottom(x).tickValues([]));

  // // Add the y-axis.
  // svg.append("g")
  //   .attr("transform", `translate(${marginLeft},0)`)
  //   .call(d3.axisLeft(y).tickValues([]));

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
  // textElement.attr("transform", `translate(0, ${textHeight / 2}px)`);


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
    .attr("x",  xScale(1.2 * r * Math.cos(controlPointTheta)))
    .attr("y", yScale(1.2 * r * Math.sin(controlPointTheta*2)))
    .append("xhtml:div")
    .html(latex('\\theta'))

  return svg.node();
}


export function svg3() {
  // Declare the chart dimensions and margins.
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  const x = d3.scaleLinear()
    .domain([0, 6])
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
    .domain([0, 10])
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

  // Add the x-axis.
  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickValues([]));

  // Add the y-axis.
  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickValues([]));



  return svg.node();
}

export function svg1() {
  // Declare the chart dimensions and margins.
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

  // Add the x-axis.
  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

  // Add the y-axis.
  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));



  return svg.node();
}


export function svg2() {
  // prep
  const a1 = [0, 0.33, 0.66, 1];
  const a2 = [0, 0.25, 0.5, 0.75, 1];
  const width = 500;
  const height = 180;
  const x = d3.scaleLinear().range([0, 200]).domain([0, 1])
  const y = d3.scaleLinear().range([150, 10]).domain([0, 1])
  const svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

  // set up axes - note setting label as ""
  const axis1 = d3.axisLeft(y).tickValues(a1).tickFormat(d => "");
  const axis2 = d3.axisBottom(x).tickValues(a2).tickFormat(d => "");

  // render axis and mathml conversion for fraction label
  const gAxis1 = svg
    .append("g")
    .attr("id", "axis1")
    .attr("transform", "translate(80, 10)")
    .style("font-size", 20)
    .call(axis1)
    .call(mathmlAxis, true);

  const gAxis2 = svg
    .append("g")
    .attr("id", "axis2")
    .attr("transform", "translate(150, 90)")
    .style("font-size", 20)
    .call(axis2)
    .call(mathmlAxis, false);

  function mathmlAxis(ax: any, vertical: boolean) {
    ax.selectAll("g")
      .append("svg:foreignObject")
      .attr("width", 40)
      .attr("height", 40)
      .attr("x", vertical ? -45 : -10)
      .attr("y", vertical ? -16 : 16)
      .append("xhtml:div")
      .html((d: number, i: number) => mathmlFractionFromDec(d));
  }

  // https://stackoverflow.com/questions/14002113/how-to-simplify-a-decimal-into-the-smallest-possible-fraction
  function mathmlFractionFromDec(x0: number) {
    var eps = 1.0E-15;
    var h, h1, h2, k, k1, k2, a, x;

    x = x0;
    a = Math.floor(x);
    h1 = 1;
    k1 = 0;
    h = a;
    k = 1;

    while (x - a > eps * k * k) {
      x = 1 / (x - a);
      a = Math.floor(x);
      h2 = h1; h1 = h;
      k2 = k1; k1 = k;
      h = h2 + a * h1;
      k = k2 + a * k1;
    }

    const mathmlHtml = katex.renderToString(`\\theta\\frac{${h}}{${k}}`, {
      throwOnError: false,
      output: "mathml",
      // center: false,
    });

    return mathmlHtml; `<math><mrow><mfrac><mn>${h}</mn><mn>${k}</mn></mfrac></mrow></math>`;
  }

  return svg.node();
}