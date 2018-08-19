var outside_dataset;
d3.csv("fruits.csv").then(function(data) {
    outside_dataset = data;
    d3.select("#fruit-collection")
        .selectAll("p") // returns an empty reference -- no paragraphs have been made yet
        .data(outside_dataset) // attaches data from our csv to each <p>
        .enter() // return empty placeholders for each if the html <p>s doesn't exist
        .append("p")
        .text(function(d) {
            return d.Fruit;
        })
        .style("color", function(d) {
            return d.Color;
        });
    // svg elements are just html elements
    // .exit() returns references to html elements without data. this is useful for deleting elements
    // more information on how enter / exit works is here: http://d3indepth.com/enterexit/
});
var w = 800;
var h = 200;
var padding = 2;

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var barData = [];
for (var i = 0; i < 25; i++) {
    var newNumber = Math.floor(Math.random() * 100);
    barData.push(newNumber);
}

var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([h, 0]);

var colorScale = d3.scaleLinear()
    .domain([0, 100])
    .range(["red", "pink"]);

var xScale = d3.scaleBand()
    .domain(d3.range(barData.length))
    .range([0, w])
    .padding(0.05);

svg.selectAll("rect")
    .data(barData)
    .enter()
    .append("rect")
    .attr("y", function(d) {
        return yScale(d);
    })
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("width", w / barData.length - padding)
    .attr("height", function(d) {
        return d * 2;
    })
    .attr("fill", function(d) {
        return colorScale(d);
    })
    .on("click", function() {
        barData = [];
        for (var i = 0; i < 25; i++) {
            var newNumber = Math.floor(Math.random() * 100);
            barData.push(newNumber);
        }
        svg.selectAll("rect")
            .data(barData)
            .transition()
            .duration(500)
            .delay(function(d, i) {
                return i * 20;
            })
            .attr("height", function(d) {
                return d * 2;
            })
            .attr("fill", function(d) {
                return colorScale(d);;
            })
            .attr("y", function(d) {
                return yScale(d);
            })
    })
    .on("mouseover", function() {
        d3.select(this)
            .attr("fill", "orange");
    })
    .on("mouseout", function() {
        d3.select(this)
            .transition() // the second transition overrules the first event listener
            .duration(100)
            .attr("fill", function(d) {
                return colorScale(d);
            });
    })

d3.select("body").append("br"); // some space between the graph and button

var add = d3.select("body")
    .append("button")
    .text("Add data");

add.on("click", function() {
    barData.push(Math.floor(Math.random() * 100));

    svg.selectAll("rect")
        .data(barData) // attaches our data
        .enter() // after we run this line, we get references to any new added data elements
        .append("rect")
        .attr("y", function(d) {
            return yScale(d);
        })
        .attr("x", function(d, i) {
            return w; // we want any new things added to be on the far right of the graph
        })
        .attr("fill", function(d) {
            return colorScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return d * 2;
        });

    xScale.domain(d3.range(barData.length));

    svg.selectAll("rect")
        .transition()
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("width", w / barData.length - padding);
});

d3.select("body").append("p").text("This website was made in August 2018 for the Stanford ICME Workshop on data visualization.");