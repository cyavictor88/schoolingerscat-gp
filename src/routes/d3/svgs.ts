import * as d3 from 'd3';
import katex from "katex";







export function svgF1() {
  // Declare the chart dimensions and margins.
  const width = 300;
  const height = 300;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;


  const xDomain = [0,5.5];
  const yDomain = [0,5.5];
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
    .attr("height", height);

  // Add the x-axis.
  // svg.append("g")
  //   .attr("transform", `translate(0,${height - marginBottom})`)
  //   .call(d3.axisBottom(x).tickValues([]));

  // // Add the y-axis.
  // svg.append("g")
  //   .attr("transform", `translate(${marginLeft},0)`)
  //   .call(d3.axisLeft(y).tickValues([]));

  function drawPath(context: d3.Path) {
    context.moveTo(10, 10); // move current point to ⟨10,10⟩
    context.lineTo(100, 10); // draw straight line to ⟨100,10⟩
    context.arcTo(150, 150, 300, 10, 40); // draw an arc, the turtle ends up at ⟨194.4,108.5⟩
    context.lineTo(300, 10); // draw straight line to ⟨300,10⟩
    // etc.
    return context; // not mandatory, but will make it easier to chain operations
  }

  const drawLine = d3.line<{x:number,y:number}>()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y))

  // svg.append('path')
  //   .style("stroke", "black")
  //   .style("fill", "none")
  //   .attr("d", drawPath(d3.path()).toString())

    svg.append('path')
    .style("stroke", "black")
    .style("fill", "none")
    .attr("d", drawLine([{x:0,y:0},{x:5,y:0}]))

    svg.append('path')
    .style("stroke", "black")
    .style("fill", "none")
    .attr("d", drawLine([{x:0,y:0},{x:0,y:5}]))


    const fontSize = 20;
    const textXaxis = svg.append("text")
    .attr("x", xScale(5))
    .attr("y", yScale(-0))
    .style("font-size", fontSize + "px")
    .attr("dy", yScale.invert(fontSize * 0.5))
    .style('fill','black')
    .attr("text-anchor", "start")
    .text("X");

    const textYaxis = svg.append("text")
    .attr("x", xScale(0))
    .attr("y", yScale(5.1))
    .style("font-size", fontSize + "px")
    .style('fill','black')
    .attr("text-anchor", "middle")
    .text("Y");
    // textElement.attr("transform", `translate(0, ${textHeight / 2}px)`);


  svg.selectAll('text').style('fill', 'black')


  const markerBoxWidth = 20;
  const markerBoxHeight = 20;
  const refX = markerBoxWidth/2;
  const refY = markerBoxHeight/2;
  const arrowPoints :[number,number][]= [[0, 0], [0, 20], [20, 10]];


  const arrowLine = d3.line<[number,number]>().x(d=>(d[0])).y(d=>(d[0]));

  svg
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
    .attr('fill', 'black')
    .attr('stroke', 'black');


    svg
    .append('path')
    .attr('d', drawLine([{x:0,y:0},{x:3,y:3}]))
    .attr('stroke', 'black')
    .attr('marker-end', 'url(#arrow)')
    .attr('fill', 'none');


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
    .domain([0,6])
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
      displayMode: false,
    });

    return mathmlHtml; `<math><mrow><mfrac><mn>${h}</mn><mn>${k}</mn></mfrac></mrow></math>`;
  }

  return svg.node();
}