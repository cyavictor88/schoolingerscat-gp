
import * as d3 from 'd3';
import type { GCPTransformInfo, ImageWorldGCP }  from '@allmaps/transform'
import  { createTransformer, toWorld }  from '@allmaps/transform'

export function africa() {




  let projection = d3.geoOrthographic().scale(500).translate([360,620]).rotate([-95,-10,0])
  // d3.geoEquirectangular().scale(225).translate([730,380])
  //d3.geoEquirectangular().scale(500).translate([-160,620])
  //d3.geoMercator()
    //.scale(450)
    //.translate([-100, 620])
    // .center([-40, 40]);

  let geoGenerator = d3.geoPath()
    .projection(projection);

  function handleMouseover(e:Event, d:any) {
    let pixelArea = geoGenerator.area(d);
    let bounds = geoGenerator.bounds(d);
    let centroid = geoGenerator.centroid(d);
    let measure = geoGenerator.measure(d);
    // if(pixelArea>1000)return;
    // if(getCountryHtmlId(d)==='countryprovince-3') return;
    // if(getCountryHtmlId(d)==='countryprovince-5') return;
    // if(getCountryHtmlId(d)==='countryprovince-1158') return;
    // if(getCountryHtmlId(d)==='countryprovince-1159') return;

    // if(getCountryHtmlId(d)==='countryprovince-1233') return;
    // if(getCountryHtmlId(d)==='countryprovince-1232') return;

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





// Filter data based on the area condition (e.g., area < 100)


    let u = d3.select('#content g.map')
      .selectAll('path')
      .data(geojson.features)


     

//     console.log(u);

// const filteredPaths = u.filter(d => {
//     console.log(d);

//   // Calculate the area of the feature (you need a function for this)
//   const area = geoGenerator.area(d as any); // Implement this function

//   // Apply your condition
//   return area < 1000; // Modify this condition as needed
// });



    u.enter()
      .append('path')
      .attr('stroke', 'black')
      .attr('fill', 'transparent')
      .attr('d', geoGenerator as any)
      .attr("id", function(d : any) { console.log(getCountryHtmlId(d),geoGenerator.area(d)  ); return getCountryHtmlId(d);})
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
  d3.json('http://localhost:8000/map.json'+'?'+Math.round(Math.random()*1000))
  
    .then(function (json: any) {

      console.log('ori len',json.features.length)
      function filterFeatures(feature:any) {
        // Calculate the area of the feature's geometry (assuming it's a Polygon)
        var area = geoGenerator.area(feature);


        if(area>10000){
          console.log(feature.properties.name,geoGenerator.bounds(feature),  geoGenerator.measure(feature), area)
        }
        // Filter features with an area larger than 100
        return area < 10000;
        // return feature.properties.name === 'province-1';
      }
  
      // Filter the features based on the area
      var filteredFeatures = json.features.filter(filterFeatures);
  
      // Create a new GeoJSON object with the filtered features
      var filteredGeoJSON = {
        type: "FeatureCollection",
        features: filteredFeatures
      };
      console.log('filtered len',filteredGeoJSON.features.length)

  
      update(filteredGeoJSON)
    });


} 
