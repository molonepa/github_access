//d3.json("data.json", function(data) {
//	alert(data.length)
//});

var data = [{"time":"00:00","quantity":64},{"time":"01:00","quantity":31},{"time":"02:00","quantity":22},{"time":"03:00","quantity":36},{"time":"04:00","quantity":14},{"time":"05:00","quantity":25},{"time":"06:00","quantity":26},{"time":"07:00","quantity":78},{"time":"08:00","quantity":68},{"time":"09:00","quantity":109},{"time":"10:00","quantity":17},{"time":"11:00","quantity":21},{"time":"12:00","quantity":12},{"time":"13:00","quantity":23},{"time":"14:00","quantity":64},{"time":"15:00","quantity":85},{"time":"16:00","quantity":99},{"time":"17:00","quantity":17},{"time":"18:00","quantity":14},{"time":"19:00","quantity":19},{"time":"20:00","quantity":10},{"time":"21:00","quantity":7},{"time":"22:00","quantity":6},{"time":"23:00","quantity":21}]

var margin = {top:20, right:20, bottom:40, left:20};

var svgHeight = (500 - margin.top - margin.bottom);
var svgWidth = (1920 - margin.left - margin.right);

var xScale = d3.scaleBand()
	.range([0, svgWidth]);

var yScale = d3.scaleLinear()
	.domain([0, d3.max(data, function(d) { return d.quantity; })])
	.range([0, svgHeight]);

var xAxis = d3.axisBottom()
	.scale(xScale);

var svg = d3.select("#chartID").append("svg")
	.attr("width", (svgWidth + margin.left + margin.right))
	.attr("height", (svgHeight + margin.top + margin.bottom))
	.attr("class", "svg-container")
	.append("g").attr("class", "container")
	.attr("transform", "translate("+ margin.left +","+ margin.top +")");

xScale.domain(data.map(function(d) { return d.time; }));

var xAxis_g = svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + (svgHeight + 2) + ")")
	.call(xAxis)
	.selectAll("text");

	svg.selectAll(".bar")
		.data(data)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return xScale(d.time); })
		.attr("y", function(d) { return svgHeight - yScale(d.quantity); })
		.attr("height", function(d) { return yScale(d.quantity); })
		.attr("width", xScale.bandwidth())

	svg.selectAll(".text")
		.data(data)
		.enter()
		.append("text")
		.attr("class", "label")
		.attr("x", (function(d) { return xScale(d.time) + xScale.bandwidth() / 2; }))
		.attr("y", function(d) { return svgHeight - yScale(d.quantity) + 1; })
		.attr("dy", ".75em")
		.text(function(d) { return d.quantity; });
