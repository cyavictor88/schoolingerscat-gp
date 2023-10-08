import { goto } from '$app/navigation';
import * as d3 from 'd3';
import katex from "katex";
import { genDataF2 } from './drawFunc2';

const aks = [8, 2.5195845410053154e-14, 3.750244559341809e-14, -3.1818103707337285e-14, -1.445243924536044e-14, -1.2434497875801753e-14, 1.4637180356658065e-15, -2.6005864128819666e-15, 6.693312570860144e-15, -3.169020601490047e-15, 4.874323167314288e-15, -2.0321522242738868e-15, -1.8332002582610585e-15, 1.2747136679536198e-14, -8.711253940418828e-15, -6.23856521997368e-15, -2.913225216616411e-15, 1.2860823517257814e-14, -4.277467269275803e-15, 1.1326051208015998e-14, -1.1155520951433573e-14, 1.06439301816863e-14, -2.7071678232459817e-14, 4.8387960305262826e-14, -3.639399892563233e-14, 1.9340973267389927e-14, -1.3429257705865894e-14, 3.5996094993606674e-14, -9.166001291305293e-15, 2.7185365070181434e-14, -8.313350008393172e-15, 1.553246420371579e-14, -1.4338752407638823e-14, 5.4711790653527716e-15, -2.5877966436382848e-14, 2.3206325749924872e-14, -1.757882728270488e-14, 1.5489831639570184e-15, -5.584865903074388e-15, 1.49071865962469e-14, -3.4347635846643247e-14, 3.765876499528531e-15, -1.1510792319313623e-15, 2.4002133613976185e-14, -1.5987211554602254e-14]

const bks = [0, 8.077269968700913, -35.387126456116235, 27.461601782973844, -21.612124702804795, 17.66588171454967, -14.891856282068705, 12.852458381235454, -11.29588289868696, 10.071244794756025, -9.083729517227482, 8.271125703699951, -7.5910613131919815, 7.0137399068180875, -6.517626230515892, 6.0867832853748185, -5.709171997451221, 5.375532561147933, -5.0786287606224905, 4.812725381474768, -4.573219182230743, 4.356373376641195, -4.159123343986174, 3.9789322748211298, -3.8136824216349132, 3.6615921305082413, -3.5211518051683592, 3.391073954960767, -3.2702538453133405, 3.1577382180247566, -3.052700216518596, 2.9544191274615286, -2.8622638939349603, 2.7756796063591866, -2.694176362565592, 2.6173200264290997, -2.544724518266469, 2.4760453489646403, -2.41097417003871, 2.3492341582602014, -2.290576089551802, 2.234774985041379, -2.1816272343547958, 2.1309481187968173, -2.082569671068844]
  
function latex(math: string) {
  const mathmlHtml = katex.renderToString(math, {
    throwOnError: false,
    output: "mathml",
  });
  return mathmlHtml;
}

const xlb = -4 * Math.PI;
const xub = -1 * xlb;

const yub = 200;
const ylb = -200;

const period = 12;

const getPeriodBound = (lb: number, ub: number) => {
  const maxPeriod = Math.ceil(ub / period) ;
  const minPeriod = Math.floor(lb / period) - 1 ;
  return [maxPeriod * period- period/2, minPeriod * period- period/2, maxPeriod - minPeriod + 1];
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

function genDataF2FS(xBounds?: number[]): MyData[] {
  let bounds = [xlb, xub];
  if (xBounds) bounds = xBounds;
  const xs = linSpace(bounds[0], bounds[1], 100 * (bounds[1] - bounds[0]));
  const a0 = 8;
  const ys = xs.map(t => {
    const initialValue = 0;
    const sumWithInitial = bks.reduce((accumulator, bk,k) => accumulator + bk * Math.sin((2*Math.PI/period)*k*t), initialValue);
    return a0 + sumWithInitial;
    // let y = 0;
    // bks.forEach((bk,k)=>{
    //   y += bk*Math.sin(2*Math.PI*k*t/period);
    // })
    // aks.forEach((ak,k)=>{
    //   y += ak*Math.cos(2*Math.PI*k*t/period);
    // })
    // return y
  })
  const arr: MyData[] = [];
  for (let i = 0; i < xs.length; i++) arr.push({ x: xs[i], y: ys[i] });
  return arr;
}

export function drawFunc2FS() {
  const boundedData: MyData[] = genDataF2([-period/2,period/2]);
  const data: MyData[] = genDataF2FS();
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
  const yAxis = svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(yScale));


  const drawLine = d3.line<{ x: number, y: number }>()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))



  const boundedFuncPath = svg.append('path')
  .style("stroke", "violet")
  .style("fill", "none")
  .attr('stroke-width','4')
  .attr("d", drawLine(boundedData))

  boundedFuncPath.datum<MyData[]>(boundedData.filter(d =>
    d.x >= xScale.domain()[0] && 
    d.x <= xScale.domain()[1] && 
    d.y >= yScale.domain()[0] && 
    d.y <= yScale.domain()[1]    
 ))

  const funcPath = svg.append('path')
    .style("stroke", "purple")
    .style("fill", "none")
    .attr("d", drawLine(data))

  funcPath.datum<MyData[]>(data.filter(d =>
     d.x >= xScale.domain()[0] && 
     d.x <= xScale.domain()[1] && 
     d.y >= yScale.domain()[0] && 
     d.y <= yScale.domain()[1]    
  ))
  .attr('d', drawLine.x(d => xScale(d.x)));






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
    const new_yScale = event.transform.rescaleY(yScale);
    // console.log( event.transform)
    xAxis.call(d3.axisBottom(new_xScale));
    yAxis.call(d3.axisLeft(new_yScale));

    boundedFuncPath.datum<MyData[]>(
        boundedData.filter(d =>{ 
         return d.x >= new_xScale.domain()[0] && d.x <= new_xScale.domain()[1]
       })
    ).attr('d', drawLine.x(d => new_xScale(d.x)).y(d=>new_yScale(d.y)));



    funcPath.datum<MyData[]>(
      //   data.filter(d =>{ 
      //     d.x >= new_xScale.domain()[0] && d.x <= new_xScale.domain()[1]
      //  })
      genDataF2FS([new_xScale.domain()[0], new_xScale.domain()[1]])
      .filter(d=>{
       return  d.y >= new_yScale.domain()[0] && d.y <= new_yScale.domain()[1]   
      })
    ).attr('d', drawLine.x(d => new_xScale(d.x)).y(d=>new_yScale(d.y)));

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

  const legendPoints: MyData[] = [{ x: 75, y: 10 }, { x: 90, y: 10 }]

  const oriLegendPoints: MyData[] = [{ x: 300, y: 10 }, { x: 315, y: 10 }]
  const drawLineRawPixel = d3.line<{ x: number, y: number }>()
    .x(d => (d.x))
    .y(d => (d.y))
  svg.append('path')
    .style('fill', 'purple')
    .style("stroke", "purple")
    .attr("d", drawLineRawPixel(oriLegendPoints)) 
  svg
    .append("svg:foreignObject")
    .attr("width", 1)
    .attr("height", 1)
    .attr("overflow", 'visible')
    .style("font-size", '12px')
    .attr("x", 320)
    .attr("y", 2)
    .append("xhtml:div")
    .html(latex('\\color{purple}y(t) \\approx  8 +   \\sum_{k=1}^{45} {  b_k sin(\\tfrac{ \\pi }{5}kt)}'))


  svg.append('path')
    .style('fill', 'violet')
    .style("stroke", "violet")
    .attr("d", drawLineRawPixel(legendPoints))

  svg
    .append("svg:foreignObject")
    .attr("width", 1)
    .attr("height", 1)
    .attr("overflow", 'visible')
    .style("font-size", '12px')
    .attr("x", 95)
    .attr("y", 2)
    .append("xhtml:div")
    .html(latex('\\color{violet}y(t)=t^3-12t+16, t \\in [-6,6]'))

  svg.append("text")
    .text("Figure 4")
    .attr("x", 5)
    .attr("y", 15);

  return svg.node();
}