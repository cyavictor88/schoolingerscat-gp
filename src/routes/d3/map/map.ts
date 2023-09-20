
import * as d3 from 'd3';
import type { GCPTransformInfo, ImageWorldGCP }  from '@allmaps/transform'
import  { createTransformer, toWorld }  from '@allmaps/transform'

export function africa() {




  let projection =  d3.geoEquirectangular()
  // d3.geoMercator()
    // .scale(400)
    // .translate([1000, 180])
    // .center([-40, 40]);

  let geoGenerator = d3.geoPath()
    .projection(projection);

  function handleMouseover(e:Event, d:any) {
    let pixelArea = geoGenerator.area(d);
    let bounds = geoGenerator.bounds(d);
    let centroid = geoGenerator.centroid(d);
    let measure = geoGenerator.measure(d);
    if(getCountryHtmlId(d)==='countryprovince-3') return;
    if(getCountryHtmlId(d)==='countryprovince-5') return;
    if(getCountryHtmlId(d)==='countryprovince-1158') return;
    if(getCountryHtmlId(d)==='countryprovince-1159') return;

    d3.select('#content .info')
      .text(d.properties.name + ' (path.area = ' + pixelArea.toFixed(1) + ' path.measure = ' + measure.toFixed(1) + ')');

    d3.select('#content .bounding-box rect')
      .attr('x', bounds[0][0])
      .attr('y', bounds[0][1])
      .attr('width', bounds[1][0] - bounds[0][0])
      .attr('height', bounds[1][1] - bounds[0][1]);

    d3.select('#content .centroid')
      .style('display', 'inline')
      .attr('transform', 'translate(' + centroid + ')');

    if(getCountryHtmlId(d)!==clickedCountry)
    d3.select('#'+getCountryHtmlId(d) ).attr('fill', 'green');

    console.log(getCountryHtmlId(d))

  }

  function handleMouseleave(e:Event, d:any) {
    if(getCountryHtmlId(d)!==clickedCountry)
    d3.select('#'+getCountryHtmlId(d)).attr('fill', 'transparent');

  }
  function getCountryHtmlId(d:any){
    return 'country'+ d.properties.name.replace(/[.\s]/g, '').toLowerCase() 
  }
  let clickedCountry = '0'

  function handleClick(e:Event, d:any){
    if(clickedCountry!==getCountryHtmlId(d)){
      d3.select('#'+getCountryHtmlId(d)).attr('fill', 'blue');
    }
    else {
      d3.select('#'+getCountryHtmlId(d)).attr('fill', 'transparent');
      clickedCountry = '0'
    }
    clickedCountry = getCountryHtmlId(d);


  }

  // let context = d3.select('#content canvas')!
	// .node()
	// .getContext('2d');


  function update(geojson: any) {
    let u = d3.select('#content g.map')
      .selectAll('path')
      .data(geojson.features);

    u.enter()
      .append('path')
      .attr('stroke', 'black')
      .attr('fill', 'transparent')
      .attr('d', geoGenerator as any)
      .attr("id", function(d : any) { return getCountryHtmlId(d);})
      .on('mouseover', handleMouseover)
      .on('mouseleave', handleMouseleave)
      .on('click', handleClick)


      // context.clearRect(0, 0, 800, 400);
      // geojson.features.forEach(function(d) {
      //   context.beginPath();
      //   context.fillStyle = state.clickedLocation && d3.geoContains(d, state.clickedLocation) ? 'red' : '#aaa';
      //   geoGenerator(d);
      //   context.fill();
      // })
  }

  const gcps:ImageWorldGCP[] = [
    { image: [5004, 2150], world: [25.29662, 121.56499] },
    { image: [6137, 1066], world: [44.336, 145.33675] },
    { image: [629, 2022], world: [27.75091, 34.25212] }
  ]
  const transformer =  createTransformer(gcps);

  // forward transform
// const result = transformer.adfToGeoX([100,100])
const result = toWorld(transformer, [2811, 3046])
console.log(result)

// REQUEST DATA
  // d3.json('https://assets.codepen.io/2814973/africa.json')
  d3.json('http://localhost:8000/mapPixel.json')
  
    .then(function (json) {
      update(json)
    });


} 
