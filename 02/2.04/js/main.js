/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.4 - Adding SVGs with D3
*/

var svg = d3.select('#chart-area').append('svg')
  .attr('width', 400)
  .attr('height', 400);

var rectangle = svg.append('rect')
  .attr('x', 280)
  .attr('y', 180)
  .attr('width', 50)
  .attr('height', 70)
  .attr('fill', 'green');