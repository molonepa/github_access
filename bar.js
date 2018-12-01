var data1 = [
	{"quantity": 0, "user": "molonepa", "time": 0}, 
	{"quantity": 0, "user": "molonepa", "time": 1}, 
	{"quantity": 0, "user": "molonepa", "time": 2}, 
	{"quantity": 0, "user": "molonepa", "time": 3}, 
	{"quantity": 0, "user": "molonepa", "time": 4}, 
	{"quantity": 0, "user": "molonepa", "time": 5}, 
	{"quantity": 0, "user": "molonepa", "time": 6}, 
	{"quantity": 4, "user": "molonepa", "time": 7}, 
	{"quantity": 0, "user": "molonepa", "time": 8}, 
	{"quantity": 5, "user": "molonepa", "time": 9}, 
	{"quantity": 5, "user": "molonepa", "time": 10}, 
	{"quantity": 7, "user": "molonepa", "time": 11}, 
	{"quantity": 11, "user": "molonepa", "time": 12}, 
	{"quantity": 11, "user": "molonepa", "time": 13}, 
	{"quantity": 15, "user": "molonepa", "time": 14}, 
	{"quantity": 13, "user": "molonepa", "time": 15}, 
	{"quantity": 14, "user": "molonepa", "time": 16}, 
	{"quantity": 12, "user": "molonepa", "time": 17}, 
	{"quantity": 11, "user": "molonepa", "time": 18}, 
	{"quantity": 10, "user": "molonepa", "time": 19}, 
	{"quantity": 7, "user": "molonepa", "time": 20}, 
	{"quantity": 4, "user": "molonepa", "time": 21}, 
	{"quantity": 0, "user": "molonepa", "time": 22}, 
	{"quantity": 0, "user": "molonepa", "time": 23}
];

var data2 = [
	{"quantity": 1, "user": "Woodse07", "time": 0}, 
	{"quantity": 1, "user": "Woodse07", "time": 1}, 
	{"quantity": 0, "user": "Woodse07", "time": 2}, 
	{"quantity": 0, "user": "Woodse07", "time": 3}, 
	{"quantity": 0, "user": "Woodse07", "time": 4}, 
	{"quantity": 1, "user": "Woodse07", "time": 5}, 
	{"quantity": 3, "user": "Woodse07", "time": 6}, 
	{"quantity": 5, "user": "Woodse07", "time": 7}, 
	{"quantity": 5, "user": "Woodse07", "time": 8}, 
	{"quantity": 6, "user": "Woodse07", "time": 9}, 
	{"quantity": 33, "user": "Woodse07", "time": 10}, 
	{"quantity": 25, "user": "Woodse07", "time": 11}, 
	{"quantity": 20, "user": "Woodse07", "time": 12}, 
	{"quantity": 26, "user": "Woodse07", "time": 13}, 
	{"quantity": 2, "user": "Woodse07", "time": 14}, 
	{"quantity": 15, "user": "Woodse07", "time": 15}, 
	{"quantity": 18, "user": "Woodse07", "time": 16}, 
	{"quantity": 13, "user": "Woodse07", "time": 17}, 
	{"quantity": 17, "user": "Woodse07", "time": 18}, 
	{"quantity": 19, "user": "Woodse07", "time": 19}, 
	{"quantity": 1, "user": "Woodse07", "time": 20}, 
	{"quantity": 2, "user": "Woodse07", "time": 21}, 
	{"quantity": 4, "user": "Woodse07", "time": 22}, 
	{"quantity": 1, "user": "Woodse07", "time": 23}
];

var margin = {top:20, right:20, bottom:40, left:20};

var svgHeight = (400 - margin.top - margin.bottom);
var svgWidth = (1900 - margin.left - margin.right);

var xScale = d3.scaleBand()
	.domain(data1.map(function(d) { return d.time; }))
	.range([0, svgWidth])
	.padding(0.3);

var xAxis = d3.axisBottom()
	.scale(xScale);

var yScale1 = d3.scaleLinear()
	.domain([0, d3.max(data1, function(d) { return d.quantity; })])
	.range([svgHeight, 0]);

var yScale2 = d3.scaleLinear()
	.domain([0, d3.max(data2, function(d) { return d.quantity; })])
	.range([svgHeight, 0]);

var yAxis1 = d3.axisLeft()
	.scale(yScale1);

var yAxis2 = d3.axisRight()
	.scale(yScale2);

var svg = d3.select("#chartID")
	.append("svg")
	.attr("width", (svgWidth + margin.left + margin.right))
	.attr("height", (svgHeight + margin.top + margin.bottom))
	.attr("y", 540)
	.attr("class", "svg-container")
	.append("g")
	.attr("class", "container")
	.attr("transform", "translate("+ margin.left +","+ margin.top +")");
	
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (svgHeight + 2) + ")")
		.call(xAxis)
		.selectAll("text");

	svg.append("g")
		.attr("class", "yaxis1")
		.attr("transform", "translate(5,0)")
		.call(yAxis1);

	svg.append("g")
		.attr("class", "yaxis2")
		.attr("transform", "translate(" + (svgWidth - 5) + ", 0)")
		.call(yAxis2);

	svg.selectAll(".bar")
		.data(data1)
		.enter()
		.append("rect")
		.attr("class", "bar1")
		.attr("x", function(d) { return xScale(d.time); })
		.attr("y", function(d) { return yScale1(d.quantity); })
		.attr("height", function(d) { return svgHeight - yScale1(d.quantity); })
		.attr("width", 0.5 * xScale.bandwidth())

	svg.selectAll(".bar")
		.data(data2)
		.enter()
		.append("rect")
		.attr("class", "bar2")
		.attr("x", function(d) { return xScale(d.time) + (xScale.bandwidth() / 2); })
		.attr("y", function(d) { return yScale2(d.quantity); })
		.attr("height", function(d) { return svgHeight - yScale2(d.quantity); })
		.attr("width", 0.5 * xScale.bandwidth())
