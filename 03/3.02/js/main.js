/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.2 - Linear scales
*/

var x = d3.scaleBand()
  .domain(['AFRICA', 'EUROPE', 'N. AMERICA', 'S. AMERICA', 'ASIA', 'AUSTRALASIA'])
  .range([0, 400])
  .paddingInner(0.3)
  .paddingOuter(0.2);

console.log(x('AFRICA')); // 13.1
console.log(x.bandwidth()); // 45.9

var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", "400")
        .attr("height", "400");

d3.json("data/buildings.json").then(function(data){
    console.log(data);

    data.forEach(d => {
        d.height = +d.height;
    });

    var y = d3.scaleLog()
        .domain([300, 150000])
        .range([0, 400])
        .base([10]);

    var rects = svg.selectAll("rect")
            .data(data)
        .enter()
            .append("rect")
            .attr("y", 0)
            .attr("x", function(d, i){
                return (i * 60);
            })
            .attr("width", 40)
            .attr("height", function(d){
                return y(d.height);
            })
            .attr("fill", function(d) {
                return "grey";
            });

});



