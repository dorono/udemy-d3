  /*
  *    main.js
  *    Mastering Data Visualization with D3.js
  *    Project 1 - Star Break Coffee
  */

  var margin = {
    left: 80,
    right: 20,
    top: 50,
    bottom: 100
  };

  var groupWidth = 600 - margin.left - margin.right;
  var groupHeight = 400 - margin.top - margin.bottom;

  // create the container for the chart
  var graph = d3.select('#chart-area')
    .append('svg')
      .attr('width', groupWidth + margin.left + margin.right)
      .attr('height', groupHeight + margin.top + margin.bottom)
  // add in the actual content of the chart with a
  // surrounding margin
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // add the title for the x axis on the bottom
  graph.append('text')
      .attr('y', groupHeight + 50)
      .attr('x', groupWidth / 2)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .text('Month');

  // add the title for the y axis on the left
  graph.append('text')
    .attr('font-size', '20px')
    .attr('x', -(groupHeight / 2))
    .attr('y', -60)
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Revenue');

  // pull in data
  d3.json('data/revenues.json').then(function (apiData) {
    // convert revenue and profit to numbers
    apiData.forEach(function (mon) {
      mon.revenue = +mon.revenue;
    });

    console.log('apiData', apiData);

    // create the scale for the bars on the x axis
    var x = d3.scaleBand()
      .domain(apiData.map((mon) => mon.month))
      .range([0, groupWidth])
      .padding(0.2);

    // create the scale for the revenue on the y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(apiData.map(mon => mon.revenue))])
      .range([groupHeight, 0]); // remember - this goes TOP TO BOTTOM!

    // create the x axis
    var xAxisCall = d3.axisBottom(x)

    // attach the x axis to the bottom of the graph
    graph.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + groupHeight + ')')
      .call(xAxisCall)
      .selectAll('text')
        .attr('y', '10')
        .attr('x', '0')
        .attr('text-anchor', 'middle');
        // .attr('transform', 'rotate(90)');

    // create the y axis
    var yAxisCall = d3.axisLeft(y)
      .tickFormat(tickLabel => `$${tickLabel}`);

    // attach the y axis to the left of the graph
    graph.append('g')
      .attr('class', 'y-axis')
      .call(yAxisCall)

    // set up the graph to find any rect shapes,
    // and apply the data to them
    var rects = graph.selectAll('rect')
      .data(apiData);

    rects.enter()
      .append('rect')
        .attr('y', (month) => y(month.revenue))
        .attr('x', (month) => x(month.month))
        .attr('width', x.bandwidth)
        .attr('height', (month) => groupHeight - y(month.revenue))
        .attr('fill', 'grey');
  });
