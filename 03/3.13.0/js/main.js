/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = 10;

var svgWidth = 400 + margin;
var svgHeight = 500 + margin;

// create the container for the chart
var graph = d3.select('#chart-area')
  .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
// add in the actual content of the chart with a
// surrounding margin
  .append('g')
    .attr('width', svgWidth - margin)
    .attr('height', svgHeight - margin)
    .attr('x', margin)
    .attr('y', margin);

// add the title for the y axis on the left
var yAxisTitle = graph.append('text')
  .text('Revenue')
  .attr('font-size', '20px')
  .attr('x', height / 2)
  .attr('y', -60)
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(90)');

// add the title for the x axis on the bottom
// ...

// pull in data
d3.json('data/revenues.json').then(function (apiData) {
  // convert revenue and profit to numbers
  apiData.forEach(function (mon) {
    mon.revenue = +mon.revenue
    mon.profit = +mon.profit;
  });

  // create the scale for the bars on the x axis
  var x = d3.scaleBand()
    .domain(0, apiData.map((mon) => mon.month))
    .range([0, svgWidth])
    .paddingInner(0.3)
    .paddingOuter(0.2);

  // create the x axis
  var xAxisCall = d3.axisBottom(x)
    .ticks(10)
    .tickFormat((x) => '$' + x);

  // attach the x axis to the bottom of the graph
  graph.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + svgHeight + ')')
    .call(xAxisCall);

  // create the scale for the revenue on the y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(apiData.map((mon) => mon.revenue))])
    .range([0, svgHeight]);

  // create the y axis
  var yAxisCall = d3.axisLeft(y);

  // attach the y axis to the left of the graph
  graph.append('g')
    .attr('class', 'y axis')
    .call(yAxisCall);


});
