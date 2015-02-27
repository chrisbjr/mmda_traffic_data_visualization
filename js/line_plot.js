// InitChart();
d3.csv("/datavis/data/04_data/s11d04.csv", function(error, data) {
  //   data.forEach(function(d) {
  //       d.Hour = parseInt(d.Hour);
  //       d.nHigh = +d.nHigh; });
  InitChart(data);
}) ;
function InitChart(data) {
  var vis = d3.select("#visualisation"),
    WIDTH = 1100,
    HEIGHT = 400,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 30
    },
    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0,24]),

    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,100]),

    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),

    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient("left")
      .tickSubdivide(true);


  vis.append("svg:g")
    .attr("class", "x axis")
    .attr("stroke-width", 4)
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

  vis.append("svg:g")
    .attr("stroke-width", 4)
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

    var line = d3.svg.line()
    .x(function (d) {
      return xRange(d.hour);
    })
    .y(function (d) {
      return yRange(d.nHigh);
    })
    .interpolate('linear');

  var line2= d3.svg.line()
  .x(function (d) {
    return xRange(d.hour);
  })
  .y(function (d) {
    return yRange(d.nMed);
  })
  .interpolate('linear');

  var line3= d3.svg.line()
  .x(function (d) {
    return xRange(d.hour);
  })
  .y(function (d) {
    return yRange(d.nLow);
  })
  .interpolate('linear');



vis.append("svg:path")
    .datum(data)
    .attr("d", line(data))
    .attr("stroke", "red")
    .attr("stroke-width", 4)
    .attr("fill", "none");

vis.append("svg:path")
    .attr("d", line2(data))
    .attr("stroke", "yellow")
    .attr("stroke-width", 4)
    .attr("fill", "none");
vis.append("svg:path")
    .attr("d", line3(data))
    .attr("stroke", "green")
    .attr("stroke-width", 4)
    .attr("fill", "none");

}
