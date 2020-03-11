/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

var svg = d3.select('#chart-area')
  .append('svg')
    .attr('width', 500)
    .attr('height', 500);

var y = d3.scaleLinear()
  .domain([0, 828])
  .range([0, 400]);

console.log('y', y(414));

d3.json('data/buildings.json')
  .then(function (buildings) {
    buildings.forEach(function (val) {
      val.height = parseInt(val.height);
    });

    var buildingHeightBars = svg
      .selectAll('rect')
      .data(buildings);

    buildingHeightBars.enter()
      .append('rect')
        .attr('width', 20)
        .attr('height', (building) => building.height)
        .attr('x', ((building, idx) => (idx * 30)))
        .attr('y', 0)
        .attr('fill', 'gray');
  });