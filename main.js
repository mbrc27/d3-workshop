(() => {
    const svg = d3.select("svg");
    //console.log(svg);
    svg.append("line")
        .attr("x0", 0)
        .attr("x1", 100)
        .attr("y0", 0)
        .attr("y1", 100)
        .attr("stroke", "hotpink");

    svg.append("rect")
        .attr("width", 100)
        .attr("height", 100)
        .attr("fill", "green")
        //.style("fill", "red")
        .attr("stroke", "hotpink");


    svg.append("polygon")
        .attr("points", "200,10 250,190 160,210")
        .attr("fill", "blue")
        .attr("stroke", "hotpink");
})();