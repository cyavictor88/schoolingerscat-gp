import * as d3 from 'd3';
import type { GameObj } from './GameObj';

interface CircleData {
  cx: number;
  cy: number;
  radius: number;
}


export function setUpCircle(circle: d3.Selection<SVGCircleElement, unknown, HTMLElement, any>, game: GameObj){

  function drajstarted(this: SVGCircleElement, event:d3.D3DragEvent<SVGCircleElement, any, any>, d: CircleData) {
    d3.select(this).raise().classed("active", true);
    console.log(game.veca)
  }

  function draggedC(this:SVGCircleElement,event:d3.D3DragEvent<SVGCircleElement, any, any>, d: CircleData) {
      d3.select(this)
          .attr("cx", (event.x))
          .attr("cy", (event.y));
          game.veca =  {x:game.xScale.invert(event.x),y:game.yScale.invert(event.y)};
          game = game;
      // d3.select('#veca').attr('d',drawLine([vec0, {x:xScale.invert(event.x),y:yScale.invert(event.y)}]))
  }

  function dragendedC(this:SVGCircleElement,event: d3.D3DragEvent<SVGCircleElement, any, CircleData>) {
      d3.select(this).classed("active", false);
  }



  // Create drag behavior
  const dragC = d3.drag<SVGCircleElement, CircleData>()
  .on("start", drajstarted)
  .on("drag", draggedC)
  .on("end", dragendedC);

  circle.call(dragC as any)

}