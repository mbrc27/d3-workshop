(() => {
    const height = 500;
    const width = 500;

    const svg = d3.select("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("class", "map");

        d3.json("/world.topo.json")
        .get((err, response) => {
            if (err) throw new Error(err);
            const topoJSON = topojson.feature(response, response.objects["world"]);

            // console.log(response);

            // console.log(topoJSON);

            const projection = d3.geoOrthographic() //d3.geoMercator()
            .scale(150)
            .translate([width / 2, height / 2])
            .rotate([-10, -20])
            .clipAngle(90);
            //.center(d3.geoCentroid(topoJSON));

            const path = d3.geoPath()
            .projection(projection);

            svg.append("g")
            .attr("class", "countries")
            .selectAll(".country")
            .data(topoJSON.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "country")
            .attr("stroke", "white")
            .attr("fill", "blue");
        })

})();