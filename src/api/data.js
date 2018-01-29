import {
    json as d3Json,
    csv as d3Csv
} from "d3-request";
import * as topojson from "topojson-client";

export const getCountriesCodes = () => {
    return new Promise((resolve, reject) => {
        d3Csv("/iso2codes.csv")
            .get((err, response) => {
                if (err) reject(new Error("Could not load iso codes"));
                resolve(response);
            });
    });
}

export const getCountriesGDP = () => {
    return new Promise((resolve, reject) => {
        d3Csv("/gdp.csv")
            .get((err, response) => {
                if (err) reject(new Error("Could not load GDP data"));
                resolve(response);
            });
    });
}

export const getCountriesGeom = () => {
    return new Promise((resolve, reject) => {
        d3Json("/world.topo.json")
            .get((err, response) => {
                if (err) reject(new Error("Could not countries geometry"));
                resolve(response);
            });
    });
}

export const getVoivodeshipGeom = () => {
    return new Promise((resolve, reject) => {
        d3Json("/poland-voi.json")
            .get((err, response) => {
                if (err) reject(new Error("Could not countries geometry"));
                resolve(response);
            });
    });
}

export const getData = () => {
    return new Promise((resolve, reject) => {
        Promise.all([
            getCountriesCodes(),
            getCountriesGDP(),
            getCountriesGeom(),
        ])
            .then(([isoCodes, gdp, json]) => {
                const gdpData = gdp
                    .map(({ name, GDP }) => {
                        const gdp = GDP ? +GDP : null;
                        const { code } = isoCodes.find(({ name: codeName, code }) => name.indexOf(codeName) > -1) || {};
                        return { name, GDP: gdp, code };
                    })
                    .filter(({ code, GDP }) => code && GDP !== null);
                const topoJSON = topojson.feature(json, json.objects["world"]);

                resolve({
                    ...topoJSON,
                    features: topoJSON.features
                        .map((feature) => {
                            const countryData = gdpData.find(({ code }) => code === feature.id);
                            return { ...feature, properties: { ...countryData } };
                        })
                });
            })
            .catch((err) => reject(err));
    });
}