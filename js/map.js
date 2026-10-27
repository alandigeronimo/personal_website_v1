// Draws the interactive world map for the "Around the World" section on the Journey page.
// (This code used to live in script.js on the Home page.)
// The map shapes live in assets/data/map/world-110m.js
// The countries you have visited live in assets/data/personal/visited-countries.js
// The countries on your bucket list (shown in blue) live in assets/data/personal/bucket-list-countries.js
// Clicking the United States zooms into a map of the states (shapes: assets/data/map/us-states-10m.js).
// The states you have visited live in assets/data/personal/visited-states.js

// In the map data, "France" also includes French Guiana (in South America).
// This pulls French Guiana out into its own shape, so highlighting France only colors Europe.
function splitFrenchGuiana(countries) {
  return countries.flatMap((country) => {
    if (country.properties.name !== "France" || country.geometry.type !== "MultiPolygon") {
      return [country];
    }

    const europe = [];
    const guiana = [];

    // Each piece of France is checked by its latitude: pieces near the equator are French Guiana
    country.geometry.coordinates.forEach((piece) => {
      const [, latitude] = d3.geoCentroid({ type: "Polygon", coordinates: piece });
      (latitude < 20 ? guiana : europe).push(piece);
    });

    const makeCountry = (name, pieces) => ({
      type: "Feature",
      properties: { name: name },
      geometry: { type: "MultiPolygon", coordinates: pieces }
    });

    return [makeCountry("France", europe), makeCountry("French Guiana", guiana)];
  });
}

// The map's name for the United States (clicking it opens the state map)
const US_NAME = "United States of America";

function drawTravelMap() {
  const container = d3.select("#map-container");
  const tooltip = d3.select("#map-tooltip");

  // The map is drawn on a fixed-size canvas. The viewBox below lets it scale to any screen.
  const width = 960;
  const height = 500;

  // 1. Turn the TopoJSON data into a list of countries (leaving out Antarctica to save space)
  const countries = splitFrenchGuiana(
    topojson
      .feature(worldTopology, worldTopology.objects.countries)
      .features.filter((country) => country.properties.name !== "Antarctica")
  );

  // 2. Choose the projection (how the round Earth is flattened) and fit it to our canvas
  const projection = d3
    .geoNaturalEarth1()
    .fitSize([width, height], { type: "FeatureCollection", features: countries });

  // 3. The path generator turns each country's shape into SVG drawing instructions
  const path = d3.geoPath(projection);

  // 4. Create the SVG and a group (<g>) that holds all countries, so they can zoom together
  const svg = container
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "World map of countries I have visited");

  const mapGroup = svg.append("g");

  // 5. Draw one <path> per country
  mapGroup
    .selectAll("path")
    .data(countries)
    .join("path")
    .attr("class", (country) => {
      // A country in both lists counts as visited (green)
      const name = country.properties.name;
      if (visitedCountries.includes(name)) {
        return "country visited";
      }
      return bucketListCountries.includes(name) ? "country bucket-list" : "country";
    })
    .classed("clickable", (country) => country.properties.name === US_NAME)
    .attr("d", path)
    .on("mousemove", (event, country) => {
      // Show the country name (and "Explored" or "Bucket List") next to the mouse.
      // The United States also hints that it can be clicked.
      const [x, y] = d3.pointer(event, container.node());
      const name = country.properties.name;
      let label = name;
      if (visitedCountries.includes(name)) {
        label = `${name} \u2014 Explored`;
      } else if (bucketListCountries.includes(name)) {
        label = `${name} \u2014 Bucket List`;
      }
      tooltip
        .text(name === US_NAME ? `${label} (click to see states)` : label)
        .style("left", `${x}px`)
        .style("top", `${y}px`)
        .classed("visible", true);
    })
    .on("mouseleave", () => tooltip.classed("visible", false))
    .on("click", (event, country) => {
      if (country.properties.name === US_NAME) {
        showUsMap();
      }
    });

  // 6. Zoom with scroll/pinch and pan by dragging. The limits keep the map from being dragged away.
  const zoom = d3
    .zoom()
    .scaleExtent([1, 8])
    .translateExtent([[0, 0], [width, height]])
    .on("zoom", (event) => mapGroup.attr("transform", event.transform));

  svg.call(zoom);

  // 7. Show how many countries are visited, and what the colors mean
  const countText = document.getElementById("visited-count");
  const legendText = document.getElementById("map-legend-text");
  const bucketLegend = document.getElementById("map-legend-bucket");
  const backButton = document.getElementById("map-back");

  function showWorldLabels() {
    countText.hidden = true;
    countText.textContent = "";
    legendText.textContent = "Countries Explored";
    bucketLegend.hidden = false;
  }

  // Washington, D.C. and Puerto Rico are not states, so they are counted separately
  const EXTRA_PLACES = { "District of Columbia": "Washington, D.C.", "Puerto Rico": "Puerto Rico" };

  function showUsLabels() {
    const extras = visitedStates.filter((name) => EXTRA_PLACES[name]).map((name) => EXTRA_PLACES[name]);
    const count = visitedStates.length - extras.length;
    let text = `${count} ${count === 1 ? "state" : "states"} visited`;
    if (extras.length > 0) {
      text += `, plus ${extras.join(" and ")}.`;
    }
    countText.hidden = false;
    countText.textContent = text;
    legendText.textContent = "States Explored";
    bucketLegend.hidden = true; // the blue bucket list only applies to the world map
  }

  showWorldLabels();

  // 8. The U.S. state map: drawn on top of the world map, hidden until the United States is clicked
  const allStates = topojson.feature(usStatesTopology, usStatesTopology.objects.states).features;
  const mainStates = allStates.filter((state) => Number(state.id) <= 56); // the 50 states + Washington, D.C.
  const puertoRico = allStates.filter((state) => state.properties.name === "Puerto Rico");
  const states = mainStates.concat(puertoRico);

  // This projection places Alaska and Hawaii in small boxes below the lower 48
  const usProjection = d3.geoAlbersUsa().fitExtent(
    [[24, 16], [width - 24, height - 16]],
    { type: "FeatureCollection", features: mainStates }
  );
  const usPath = d3.geoPath(usProjection);

  // Puerto Rico gets its own small box in the bottom-right corner, below Florida
  const prPath = d3.geoPath(
    d3.geoMercator().fitExtent([[width - 150, height - 80], [width - 40, height - 28]], {
      type: "FeatureCollection",
      features: puertoRico
    })
  );

  const usGroup = svg
    .append("g")
    .attr("class", "us-map")
    .style("opacity", 0)
    .style("display", "none");

  usGroup
    .selectAll("path")
    .data(states)
    .join("path")
    .attr("class", (state) => (visitedStates.includes(state.properties.name) ? "state visited" : "state"))
    .attr("d", (state) => (state.properties.name === "Puerto Rico" ? prPath(state) : usPath(state)))
    .on("mousemove", (event, state) => {
      const [x, y] = d3.pointer(event, container.node());
      tooltip
        .text(state.properties.name)
        .style("left", `${x}px`)
        .style("top", `${y}px`)
        .classed("visible", true);
    })
    .on("mouseleave", () => tooltip.classed("visible", false));

  let busy = false; // true while a zoom animation is running, so clicks are not stacked

  // Click the United States: zoom in on it, then fade over to the state map
  function showUsMap() {
    if (busy) {
      return;
    }
    busy = true;
    tooltip.classed("visible", false);
    svg.on(".zoom", null); // turn off dragging and scroll-zoom while the state map is showing

    // Zoom the world map onto the lower 48 states
    const [x0, y0] = projection([-125, 49]);
    const [x1, y1] = projection([-66.9, 24.5]);
    const scale = Math.min(8, 0.85 * Math.min(width / (x1 - x0), height / (y1 - y0)));
    const target = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(scale)
      .translate(-(x0 + x1) / 2, -(y0 + y1) / 2);

    svg
      .transition()
      .duration(800)
      .call(zoom.transform, target)
      .on("end", () => {
        usGroup.style("display", null);
        usGroup.transition().duration(400).style("opacity", 1);
        mapGroup
          .transition()
          .duration(400)
          .style("opacity", 0)
          .on("end", () => {
            mapGroup.style("display", "none");
            busy = false;
          });
        showUsLabels();
        svg.attr("aria-label", "Map of U.S. states I have visited").classed("us-view", true);
        backButton.hidden = false;
      });
  }

  // Back to World Map: fade back to the world map, then zoom out to the full view
  function showWorldMap() {
    if (busy) {
      return;
    }
    busy = true;
    tooltip.classed("visible", false);
    backButton.hidden = true;
    mapGroup.style("display", null);
    mapGroup.transition().duration(400).style("opacity", 1);
    usGroup
      .transition()
      .duration(400)
      .style("opacity", 0)
      .on("end", () => {
        usGroup.style("display", "none");
        svg
          .transition()
          .duration(700)
          .call(zoom.transform, d3.zoomIdentity)
          .on("end", () => {
            svg.call(zoom); // turn dragging and scroll-zoom back on
            svg.attr("aria-label", "World map of countries I have visited").classed("us-view", false);
            busy = false;
          });
      });
    showWorldLabels();
  }

  backButton.addEventListener("click", showWorldMap);

  // Helpful warnings if a name in visited-countries.js or visited-states.js does not match the map data
  const mapNames = countries.map((country) => country.properties.name);
  visitedCountries.forEach((name) => {
    if (!mapNames.includes(name)) {
      console.warn(`visited-countries.js: "${name}" was not found on the map. Check the spelling.`);
    }
  });

  bucketListCountries.forEach((name) => {
    if (!mapNames.includes(name)) {
      console.warn(`bucket-list-countries.js: "${name}" was not found on the map. Check the spelling.`);
    }
  });

  const stateNames = states.map((state) => state.properties.name);
  visitedStates.forEach((name) => {
    if (!stateNames.includes(name)) {
      console.warn(`visited-states.js: "${name}" was not found on the map. Check the spelling.`);
    }
  });
}

// Only draw the map if D3 and TopoJSON loaded
if (typeof d3 !== "undefined" && typeof topojson !== "undefined") {
  drawTravelMap();
} else {
  console.error("js/map.js: D3 or TopoJSON did not load. Check the <script> paths in journey.html.");
}
