/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

var svg = d3.select('#chart-area').append('svg')
  .attr('width', 500)
  .attr('height', 400);

var circle1 = svg
  .append('circle')
    .attr('cx', 30)
    .attr('cy', 30)
    .attr('r', 30)
    .attr('fill', 'red');

var circle2 = svg
  .append('circle')
    .attr('cx', 200)
    .attr('cy', 200)
    .attr('r', 50)
    .attr('fill', 'red')

var connectingLine = svg
  .append('line')
    .attr('x1', 30)
    .attr('y1', 15)
    .attr('x2', 200)
    .attr('y2', 200)
    .attr('stroke', 'red')
    .attr('stroke-width', '1px')

