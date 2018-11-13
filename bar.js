var data = [12, 434, 55, 482, 243, 222, 199, 76, 100];

var svgHeight = 800;
var svgWidth = 800;

var xScale = d3.scaleLinear()
	.domain([0, d3.max(data)])
	.range([0, svgWidth]);

var yScale = d3.scaleLinear()
	.domain([0, d3.max(data)])
	.range([0, svgHeight]);

var x_axis = d3.axisBottom()
	.scale(xScale);

var svg = d3.select('svg')
	.attr("width", svgWidth)
	.attr("height", svgHeight)
	.attr("class", "bar-chart");
	//.append("g")
	//.attr("transform", "translate(50, " + xAxisTranslate  +")")
	//.call(x_axis);

var barPadding = 5;
var barWidth = (svgWidth / data.length);

var barChart = svg.selectAll("rect")
	.data(data)
	.enter()
	.append("rect")
	.attr("class", "bar")
	.attr("y", function(d) {
		return svgHeight - yScale(d);
	})
	.attr("height", function(d) {
		return yScale(d);
	})
	.attr("width", barWidth - barPadding)
	.attr("transform", function(d, i) {
		var xCoordinate = barWidth * i;
		return "translate("+ xCoordinate +")";
	});

var text = svg.selectAll("text")
	.data(data)
	.enter()
	.append("text")
	.text(function(d) {
		return d;
	})
	.attr("y", function(d, i) {
		return svgHeight - yScale(d) + 15;
	})
    	.attr("x", function(d, i) {
		return barWidth * i + 5;
	})
	.attr("fill", "#ADD8E6");
