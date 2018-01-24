(() => {
    const weekdays = ["Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saturday", "Sunday"];
    const height = 500;
    const width = 500;

    const xScale = d3.scaleLinear()
        .rangeRound([0, width - 70]);

    const yScale = d3.scaleLinear()
        .rangeRound([height - 50, 0]);

    const line = d3.line()
        .x(({ x }) => xScale(x))
        .y(({ y }) => yScale(y));

    const svg = d3.select("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("class", "tasks");

    d3.json("/tasks.json")
        .get((err, response) => {
            if (err) throw new Error(err);

            const data = Object.entries(response).map(([key, value]) => ({ value, key }));

            g = svg.append("g").attr("transform", "translate(40, 40)");

            yScale.domain(d3.extent(data.reduce((p, n) => p.concat(Object.values(n.value)), []), d => d));
            xScale.domain([0, 6]);


            createAxes(g);

            data.forEach(({ key, value }, index) => {
                createLine(g, key, Object.values(value).map((d, i) => ({ x: i, y: d })), index);
            });

            createTooltip(g);

        });


    const createLine = (wrapper, key, data, index) => {
        wrapper.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", d3.schemeCategory10[index])
            // or
            .attr("class", key)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);


        // wrapper.append("path")
        //     .datum(data)
        //     .attr("class", "mouse-line")
        //     .attr("d", line);

        wrapper.selectAll(`circle.tooltip.${ key }`)
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "tooltip")
            .attr("r", 5)
            .attr("fill", d3.schemeCategory10[index])
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y));
    };

    const createAxes = (wrapper) => {
        const xAxis = d3.axisTop(xScale)
            .tickValues(d3.range(0, 7))
            .tickFormat((d, i) => weekdays[i]);

        wrapper.append("g")
            .call(xAxis)
            .attr("transform", `translate(0, ${height - 50})`)
            .select("text")
            .attr("text-anchor", "middle");

        wrapper.append("g")
            .call(d3.axisLeft(yScale))
            .append("text")
            .attr("fill", "#000")
            .attr("y", 8)
            .attr("dy", "1.1em")
            .attr("text-anchor", "start")
            .text("Task no.");
    };

    const createTooltip = (wrapper) => {
        wrapper.selectAll("circle.tooltip")
            .on("mouseover", (d) => {
                console.log(d);
            });
    };

})();