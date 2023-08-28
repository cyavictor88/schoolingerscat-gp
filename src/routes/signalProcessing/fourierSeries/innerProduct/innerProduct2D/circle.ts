import * as d3 from 'd3';

interface CircleData {
  cx: number;
  cy: number;
  radius: number;
}


const initialCircleData : CircleData = {
  cx: 1,
  cy: 1,
  radius: 2,
}




function drajstarted(this: SVGCircleElement, event:d3.D3DragEvent<SVGCircleElement, CircleData, any>, d: CircleData) {
    d3.select(this).raise().classed("active", true);
}

function draggedC(this:SVGCircleElement,event:d3.D3DragEvent<SVGCircleElement, CircleData, any>, d: CircleData) {
    d3.select(this)
        .attr("cx", (event.x))
        .attr("cy", (event.y));
        // game.veca =  {x:xScale.invert(event.x),y:yScale.invert(event.y)};
    // d3.select('#veca').attr('d',drawLine([vec0, {x:xScale.invert(event.x),y:yScale.invert(event.y)}]))
}

function dragendedC(this:SVGCircleElement,event: d3.D3DragEvent<SVGCircleElement, CircleData, any>) {
    d3.select(this).classed("active", false);
}



// Create drag behavior
export const dragC = d3.drag<SVGCircleElement, CircleData>()
.on("start", drajstarted)
.on("drag", draggedC)
.on("end", dragendedC);






function setUpCircle(){
  // const svg = d3.select(ref);
  // const circle = svg.append("circle")
  //   .attr("class", "draggable-circle")
  //   .style("cursor","pointer")
  //   .call(dragC as any);
  return dragC
}