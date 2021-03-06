/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    5.2 - Looping with intervals
 */

var margin = {left: 80, right: 20, top: 50, bottom: 100};
var flag = true;

var width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var g = d3
  .select('#chart-area')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// X Label
g.append('text')
  .attr('y', height + 50)
  .attr('x', width / 2)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .text('Month');

// Y Label
g.append('text')
  .attr('y', -60)
  .attr('x', -(height / 2))
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Revenue');

// X Scale
var x = d3
  .scaleBand()
  .range([0, width])
  .padding(0.2);

// Y Scale
var y = d3.scaleLinear().range([height, 0]);

// X Axis
var xAxisGroup = g
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + height + ')');

// Y Axis
var yAxisGroup = g.append('g').attr('class', 'y axis');

d3.json('data/revenues.json').then(function(data) {
  // Clean data
  data.forEach(function(d) {
    d.revenue = +d.revenue;
    d.profit = +d.profit;
  });

  d3.interval(function() {
    update(data);
    flag = !flag;
  }, 1000);

  update(data);
});

function update(data) {
  var value = flag ? 'revenue' : 'profit';

  console.log('data UPDATING!', data);
  // X Scale
  x.domain(
    data.map(function(d) {
      return d.month;
    })
  );

  // Y Scale
  y.domain([
    0,
    d3.max(data, function(d) {
      return d[value];
    })
  ]);

  var xAxisCall = d3.axisBottom(x);
  xAxisGroup.call(xAxisCall);

  var yAxisCall = d3.axisLeft(y).tickFormat(function(d) {
    return '$' + d;
  });
  yAxisGroup.call(yAxisCall);

  // Bars
  // apply the new data to new rects that
  // will appear should we decide to bring
  // them onto our visualization
  var rects = g.selectAll('rect').data(data);

  // remove the rects that are marked
  // with the `exit()` selector
  rects.exit().remove();

  // apply attributes to the bars
  // not targeted by `exit()` and
  // therefore, left in our visualization the screen
  rects
    .attr('y', function(d) {
      return y(d[value]);
    })
    .attr('x', function(d) {
      return x(d.month);
    })
    .attr('height', function(d) {
      return height - y(d[value]);
    })
    .attr('width', x.bandwidth);

  // and finally, add the new rectangles
  // based on the current data, adding
  // attributes as needed
  rects
    .enter()
    .append('rect')
    .attr('y', function(d) {
      return y(d[value]);
    })
    .attr('x', function(d) {
      return x(d.month);
    })
    .attr('height', function(d) {
      return height - y(d[value]);
    })
    .attr('width', x.bandwidth)
    .attr('fill', 'grey');
}
