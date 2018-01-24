(() => {
    const height = 500;
    const width = 500;

    const canvas = d3.select("canvas")
        .attr("height", height)
        .attr("width", width)
        .attr("class", "map");

    const c = canvas.node().getContext("2d");

    d3.json("/world-110m.json")
        .get((err, response) => {
            if (err) throw new Error(err);

            const topoJSON = topojson.feature(response, response.objects["countries"]);
            const globe = { type: "Sphere" };

            var img = new Image();
            img.src = "/space.jpg";
            img.onload = () => {
                const projection = d3.geoOrthographic()
                    .scale(150)
                    .translate([width / 2, height / 2])
                    .rotate([180, 0])
                    .clipAngle(90);

                const path = d3.geoPath()
                    .projection(projection)
                    .context(c);
                (function transition() {
                    d3.transition()
                        .duration(55000)
                        .ease(d3.easeLinear)
                        .tween("rotate", () => {
                            var r = d3.interpolate(projection.rotate(), [-180, 0]);
                            return t => {
                                projection.rotate(r(t));
                                c.drawImage(img, 0, 0);

                                c.fillStyle = "#00006B";
                                c.beginPath();
                                path(globe);
                                c.fill();

                                c.fillStyle = "#29527A";
                                c.beginPath();
                                path(topoJSON);
                                c.fill();


                                c.strokeStyle = "#fff";
                                c.lineWidth = .5;
                                c.beginPath();
                                path(topoJSON);
                                c.stroke();

                                projection.rotate([180, 0]);
                            };
                        })
                        .transition().duration(30).ease(d3.easeLinear);
                })();
            };
        });
})();