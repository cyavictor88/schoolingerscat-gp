import * as d3 from 'd3';


let scale = 1500/8192;
let width = 8192*scale;
let height = 4096*scale;



const xDomain = [0, 8192];
const yDomain = [0, 4096];
// Declare the x (horizontal position) scale.
const xScale = d3.scaleLinear()
  .domain(xDomain)
  .range([0, width ]);

// Declare the y (vertical position) scale.
const yScale = d3.scaleLinear()
  .domain(yDomain)
  .range([0,height ]);



export function polygon(){
  const lineGenerator = d3.line()
  .x(d =>  xScale(d[0]))
  .y(d => yScale(d[1]))

  let clickedCountry = '-'

  function handleMouseover(e:MouseEvent, d:any) {

    const id = (e.target as Element).id;
    console.log(id)

    if(id!==clickedCountry)
    d3.select('#'+id).attr('fill', 'blue');

    d3.select('#content .info')
      .text(id);


  }

  function handleMouseleave(e:Event, d:any) {
    const id = (e.target as Element).id;

    if(id!==clickedCountry)
    d3.select('#'+id).attr('fill', 'transparent');

  }



function handleZoom(e:any) {
	d3.select('svg g')
		.attr('transform', e.transform);

    console.log(e.transform);
   d3.select("image")
    .attr("width", width*e.transform.k)
    .attr("height", height*e.transform.k)
    .attr("x", e.transform.x)
    .attr("y", e.transform.y)

}



let zoom :any= d3.zoom()
.on('zoom', handleZoom);



  function update(geojson: any) {


    const svgBg = d3.select("image")
      .attr("width", width)
      .attr("height", height)
      // .style("fill", "red");


    const svg = d3.select("#content g.map");

    for (let i = 0; i < geojson.features.length; i++) {
      svg.append("path")
      .attr("d", lineGenerator(geojson.features[i].geometry.coordinates[0]))
      .attr("fill", "transparent")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("id", function(d : any) {  return 'province-'+i;})
      .on('mouseover', handleMouseover)
      .on('mouseleave', handleMouseleave)
      .call(zoom);
    }

    // svg.append("path")
    //   .attr("d", lineGenerator(geojson.features[0].geometry.coordinates[0]))
    //   .attr("fill", "lightblue")
    //   .attr("stroke", "blue")
    //   .attr("stroke-width", 2);

    
    // let u = d3.select('#content g.map')
    // .selectAll('path')
    // .data(geojson.features);

    // u.enter()
    // .append('path')
    // .attr('stroke', 'black')
    // .attr('fill', 'transparent')
    // .attr("d", lineGenerator(d.geometry.coordinates))
    // .attr("id", function(d : any) {  return getCountryHtmlId(d);})
    // .attr("fill", "lightblue")
    // .attr("stroke", "blue")
    // .attr("stroke-width", 2);

  }


    // Filter data based on the area condition (e.g., area < 100)
    


   // d3.json('https://assets.codepen.io/2814973/africa.json')
   d3.json('http://localhost:8000/mapPixel.json'+'?'+Math.round(Math.random()*1000))
  
   .then(function (json: any) {
 
     update(json)
   });
}