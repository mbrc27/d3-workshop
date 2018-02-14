(() => {
    const height = 500;
    const width = 800;

    const xScale = d3.scaleBand()
        .range([0, width - 70]);

    const yScale = d3.scaleLinear()
        .rangeRound([height - 90, 0]);

    const line = d3.line()
        .x(({ x }) => xScale(x))
        .y(({ y }) => yScale(y));

    const svg = d3.select("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("class", "tasks");

    d3.csv("/power_cons.csv")
        .get((err, response) => {
            //response = response.slice(0, 50);
            if (err) throw new Error(err);

            g = svg.append("g").attr("transform", "translate(40, 40)");

            yScale.domain(d3.extent(response.map(({ value }) => +value || 0)));
            xScale.domain(response.map(({ name }) => name));


            createAxes(g);

            createLine(g, response.map(({ name, value }) => ({ x: name, y: +value || 0 })));
        });


    const createLine = (wrapper, data) => {
        wrapper.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", d3.schemeCategory10[0])
            .attr("class", "power-usage")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);


        wrapper.selectAll("circle.tooltip.power-usage")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "tooltip")
            .attr("r", 2)
            .attr("fill", d3.schemeCategory10[0])
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y));
    };

    const createAxes = (wrapper) => {
        const xAxis = d3.axisTop(xScale);

        wrapper.append("g")
            .call(xAxis)
            .attr("transform", `translate(0, ${height - 90})`)
            .selectAll("text")
            .attr("transform", "rotate(90)");

        const yAxis = d3.axisLeft(yScale)
            .tickSizeInner(-width);
        wrapper.append("g")
            .call(yAxis)
            .append("text")
            .attr("fill", "#000")
            .attr("y", 8)
            .attr("dy", "1.1em")
            .attr("text-anchor", "start")
            .text("Power usage (kWh per capita)");
    };
})();