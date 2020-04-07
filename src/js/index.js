import "../css/style.scss";
import { csv } from "d3";
import * as d3 from "d3";
import { parseLocationData } from "./utils";

import mapboxgl from "mapbox-gl";
// or "const mapboxgl = require('mapbox-gl');"
import hubei from "../data/湖北省.json";

const flowsData = csv("../data/flowsData.csv").then((data) => data);
const locations = csv("../data/locations.csv", parseLocationData).then((data) =>
  data.map((loc) => ({
    ...loc,
    ...mapboxgl.MercatorCoordinate.fromLngLat({
      lng: +loc.lon,
      lat: +loc.lat,
    }),
  }))
);
//我自己的token
// mapboxgl.accessToken =
//   "pk.eyJ1Ijoiemhhbmd6aWhhbyIsImEiOiJjamN6dDF1bzMwenphMzNuMjlqaG1vOTJlIn0.VdSfOPUC85YcWqs3LZeXmA";

//版权token
mapboxgl.config.API_URL = "https://api.mapbox.cn";
mapboxgl.accessToken =
  "pk.eyJ1Ijoiemhhbmd6aWhhbyIsImEiOiJjamN6dDF1bzMwenphMzNuMjlqaG1vOTJlIn0.BLCCdw42MV0nGSvbDj7xnA";
const map = new mapboxgl.Map({
  container: "map", // container id
  // center: [104.2115, 35],
  center: [105.2115, 31.58],
  zoom: 4.75,
  bearing: 0,
  pitch: 45,
  style: "mapbox://styles/mapbox/dark-zh-v1",
  // style: "mapbox://styles/zhangzihao/ck085noh40pji1dnx8aoqkpae",
  antialias: true,
});

Promise.all([flowsData, locations]).then(([flowsData, locations]) => {
  map.on("load", () => {
    //处理地图
    map.on("click", function (e) {
      var features = map.queryRenderedFeatures(e.point);
      console.log(features);
    });
    const toggleLableLayerIds = [
      "place-capital-city-e",
      "place-capital-city-s",
      "china-island_label-台湾岛",
      "china-place-no-data-台湾",
      "china-marine-label-lg-pt",
      "place-city-md-n",
      "place-capital-city-w",
      "china-place-china",
      "country-label",
      "state-label-md",
      "place-city-md-s",
      "state-label-lg",
      "place-capital-city-n",
      "china-place-city_medium", //隐藏中等城市
      "china-place-city_small", //隐藏小城市
      "place-city-sm", //隐藏外国小城市
    ];
    for (var i = 0; i < toggleLableLayerIds.length; i++) {
      var id = toggleLableLayerIds[i];
      map.setLayoutProperty(id, "visibility", "none");
    }
    map.addSource("hubeishen", {
      type: "geojson",
      data: hubei,
    });
    map.addLayer(
      {
        id: "huibeibianjie",
        type: "fill",
        source: "hubeishen",
        paint: {
          "fill-color": "#f2f4f6",
          "fill-opacity": 0.15,
        },
      },
      "china-place-city_large-s"
    );
    map.addLayer(
      {
        id: "huibeibianjie2",
        type: "line",
        source: "hubeishen",
        paint: {
          "line-color": "#b2b4b6",
          "line-width": 1,
        },
      },
      "china-place-city_large-s"
    );
    const toggFontsLayerIds = [
      "china-place-city_large-s",
      "china-place-city_large-n",
      "china-place-city_large-e",
      "china-place-city_large-w",
      "china-place-beijing",
    ];
    for (var i = 0; i < toggFontsLayerIds.length; i++) {
      var id = toggFontsLayerIds[i];
      map.setLayoutProperty(id, "text-size", [
        "interpolate",
        ["exponential", 2],
        ["zoom"],
        5,
        18,
        25,
        300,
      ]);
    }

    //辅助计时器
    let seconds = 0;
    function displayTime() {
      seconds++;
      d3.select("span").text("1/10辅助计时:" + seconds);
    }
    setInterval(displayTime, 100);

    var years = [
      202011,
      202012,
      202013,
      202014,
      202015,
      202016,
      202017,
      202018,
      202019,
      2020110,
      2020111,
      2020112,
      2020113,
      2020114,
      2020115,
      2020116,
      2020117,
      2020118,
      2020119,
      2020120,
      2020121,
      2020122,
      2020123,
      2020124,
      2020125,
      2020126,
      2020127,
      2020128,
      2020129,
      2020130,
      2020131,
      202021,
      202022,
      202023,
      202024,
      202025,
      202026,
      202027,
      202028,
      202029,
      2020210,
      2020211,
      2020212,
      2020213,
      2020214,
      2020215,
      2020216,
      2020217,
      2020218,
      2020219,
      2020220,
      2020221,
      2020222,
      2020223,
      2020224,
      2020225,
      2020226,
      2020227,
      2020228,
      2020229,
      202031,
      202032,
      202033,
      202034,
      202035,
      202036,
      202037,
      202038,
      202039,
      2020310,
      2020311,
      2020312,
      2020313,
      2020314,
      2020315,
      2020316,
      2020317,
      2020318,
      2020319,
      2020320,
      2020321,
      2020322,
      2020323,
      2020324,
      2020325,
      2020326,
      2020327,
      2020328,
      2020329,
      2020330,
      2020331,
      202041,
      202042,
      202043,
    ];
    //提示的16天
    // var years = [
    //   2020110,
    //   2020121,
    //   2020123,
    //   2020125,
    //   2020126,
    //   202025,
    //   202027,
    //   2020218,
    //   202031,
    //   2020310,
    //   2020317,
    //   2020318,
    //   2020325,
    //   2020330,
    //   2020331,
    //   202041,
    // ];
    var worker = null;
    var index = 0;

    function increment() {
      console.log(years.length, years[index]);
      d3.select("h1").text(years[index]);
      // d3.select("h3").text("DAY"+index);
      let locationsById = d3
        .nest()
        .key((d) => d.id)
        .rollup(([d]) => d)
        .object(locations);

      let flows = flowsData
        .map(({ origin, dest, count, time }) => ({
          origin: locationsById[origin],
          dest: locationsById[dest],
          count: +count,
          year: +[
            new Date(time).getFullYear(),
            new Date(time).getMonth() + 1,
            new Date(time).getDate(),
          ].join(""),
        }))
        .filter(function (d) {
          return d.year == years[index];
        });

      flows.sort((a, b) => d3.ascending(a.count, b.count));

      if (map.getLayer("flows")) {
        map.removeLayer("flows");
      }
      if (map.getLayer("locations")) {
        map.removeLayer("locations");
      }

      //

      draw(flows, locations);

      if (index >= years.length - 1) {
        index = 0;
        stopLoading();
        setTimeout(startLoading, 2000);
      } else {
        index += 1;
      }
    }
    function startLoading() {
      worker = setInterval(increment, 1000);
    }
    function stopLoading() {
      clearInterval(worker);
    }

    // setTimeout(function () {
    //   startLoading();
    // }, 3000);

    function startOnday() {
      let locationsById = d3
        .nest()
        .key((d) => d.id)
        .rollup(([d]) => d)
        .object(locations);

      let flows = flowsData
        .map(({ origin, dest, count, time }) => ({
          origin: locationsById[origin],
          dest: locationsById[dest],
          count: +count,
          year: +[
            new Date(time).getFullYear(),
            new Date(time).getMonth() + 1,
            new Date(time).getDate(),
          ].join(""),
        }))
        .filter(function (d) {
          return d.year == 202043;
        });
      console.log(flows);
      flows.sort((a, b) => d3.ascending(a.count, b.count));

      draw(flows, locations);
    }
    startOnday();

    function draw(flows, locations) {
      let incoming = new Map();
      let outgoing = new Map();
      for (const { origin, dest, count } of flows) {
        incoming.set(dest.id, (incoming.get(dest.id) || 0) + count);
        outgoing.set(origin.id, (outgoing.get(origin.id) || 0) + count);
      }
      let max = new Map();
      for (const { id } of locations) {
        max.set(id, Math.max(incoming.get(id) || 0, outgoing.get(id) || 0));
      }

      let locationTotals = { incoming, outgoing, max };
      console.log(locationTotals);

      let flowsLayer = {
        id: "flows",
        type: "custom",

        onAdd: function (map, gl) {
          this.program = gl.createProgram();
          gl.attachShader(
            this.program,
            compileShader(
              gl,
              gl.VERTEX_SHADER,
              `
        #define WAVE_FACTOR 150.0
        #define WAVE_SPEED 0.005
        precision highp float;
        uniform mat4 u_matrix;
        uniform int u_time;
        attribute vec2 a_origin_loc;
        attribute vec2 a_dest_loc;
        attribute vec4 a_color;
        attribute float a_thickness;
        attribute float a_instance_index;
        attribute vec2 a_square_vert;
        varying vec2 v_square_pos;
        varying vec4 v_color;
        varying float v_source_to_target;
        void main() {
          v_square_pos = a_square_vert.xy;  // position within [-1, 1] square
          v_color = a_color;
          float height = a_thickness * a_square_vert.y * mix(0.0, 1.0, v_square_pos.x);
          gl_Position = u_matrix * vec4(mix(a_origin_loc.xy, a_dest_loc.xy, v_square_pos.x), 0.0, 1.0) +   
                        vec4(a_square_vert.x, height, 0.0, 1.0);     
          // Adding a_instance_index to prevent the "pulsing" effect:
          // when all waves depart from their origins at the same time
          float t = (float(u_time) + a_instance_index) * WAVE_SPEED;
          v_source_to_target = v_square_pos.x * length(a_origin_loc - a_dest_loc) * WAVE_FACTOR - t; 
        }
      `
            )
          );
          gl.attachShader(
            this.program,
            compileShader(
              gl,
              gl.FRAGMENT_SHADER,
              `
        precision highp float;
        varying vec2 v_square_pos;
        varying vec4 v_color;
        varying float v_source_to_target;
        void main() {
          gl_FragColor = vec4(v_color.xyz, v_color.w * smoothstep(0.3, 1.0, fract(v_source_to_target)));
          float soften = smoothstep(0.0, 1.0, v_square_pos.y);
          gl_FragColor = vec4(gl_FragColor.rgb, gl_FragColor.a * soften);
        }
      `
            )
          );
          gl.linkProgram(this.program);

          // 正方形顶点
          this.aSquareVert = gl.getAttribLocation(
            this.program,
            "a_square_vert"
          );
          this.squareVerts = new Float32Array([0, -1, 0, 1, 1, -1, 1, 1]);
          this.squareVertsBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertsBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, this.squareVerts, gl.STATIC_DRAW);

          // 实例属性
          this.aOrigin = gl.getAttribLocation(this.program, "a_origin_loc");
          this.aDest = gl.getAttribLocation(this.program, "a_dest_loc");
          this.aColor = gl.getAttribLocation(this.program, "a_color");
          this.aThickness = gl.getAttribLocation(this.program, "a_thickness");
          this.aInstanceIndex = gl.getAttribLocation(
            this.program,
            "a_instance_index"
          );

          const originCoords = new Float32Array(flows.length * 2);
          const destCoords = new Float32Array(flows.length * 2);
          const colors = new Float32Array(flows.length * 4);
          const thicknesses = new Float32Array(flows.length);
          const instanceIndices = new Float32Array(flows.length);
          for (let i = 0; i < flows.length; i++) {
            const { origin, dest, count } = flows[i];
            originCoords[i * 2] = origin.x;
            originCoords[i * 2 + 1] = origin.y;
            destCoords[i * 2] = dest.x;
            destCoords[i * 2 + 1] = dest.y;
            const { r, g, b } = d3.rgb(flowColorScale(count));
            colors[i * 4] = r / 255;
            colors[i * 4 + 1] = g / 255;
            colors[i * 4 + 2] = b / 255;
            colors[i * 4 + 3] = flowOpacityScale(count);
            thicknesses[i] = flowThicknessScale(count);
            instanceIndices[i] = i;
          }

          this.originCoordsBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.originCoordsBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, originCoords, gl.STATIC_DRAW);

          this.destCoordsBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.destCoordsBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, destCoords, gl.STATIC_DRAW);

          this.colorsBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

          this.thicknessBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.thicknessBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, thicknesses, gl.STATIC_DRAW);

          this.instanceIndexBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceIndexBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, instanceIndices, gl.STATIC_DRAW);
        },

        render: function (gl, matrix) {
          const ext = gl.getExtension("ANGLE_instanced_arrays");
          gl.useProgram(this.program);
          gl.uniformMatrix4fv(
            gl.getUniformLocation(this.program, "u_matrix"),
            false,
            matrix
          );
          gl.uniform1i(
            gl.getUniformLocation(this.program, "u_time"),
            currentTime()
          );

          // Square vertices
          gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertsBuffer);
          gl.enableVertexAttribArray(this.squareVertsBuffer);
          gl.vertexAttribPointer(this.aSquareVert, 2, gl.FLOAT, false, 0, 0);
          ext.vertexAttribDivisorANGLE(this.aSquareVert, 0); // non-instanced

          // Flows
          gl.bindBuffer(gl.ARRAY_BUFFER, this.originCoordsBuffer);
          gl.enableVertexAttribArray(this.aOrigin);
          gl.vertexAttribPointer(this.aOrigin, 2, gl.FLOAT, false, 0, 0);
          ext.vertexAttribDivisorANGLE(this.aOrigin, 1); // instanced

          gl.bindBuffer(gl.ARRAY_BUFFER, this.destCoordsBuffer);
          gl.enableVertexAttribArray(this.aDest);
          gl.vertexAttribPointer(this.aDest, 2, gl.FLOAT, false, 0, 0);
          ext.vertexAttribDivisorANGLE(this.aDest, 1); // instanced

          gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsBuffer);
          gl.enableVertexAttribArray(this.aColor);
          gl.vertexAttribPointer(this.aColor, 4, gl.FLOAT, false, 0, 0);
          ext.vertexAttribDivisorANGLE(this.aColor, 1); // instanced

          gl.bindBuffer(gl.ARRAY_BUFFER, this.thicknessBuffer);
          gl.enableVertexAttribArray(this.aThickness);
          gl.vertexAttribPointer(this.aThickness, 1, gl.FLOAT, false, 0, 0);
          ext.vertexAttribDivisorANGLE(this.aThickness, 1); // instanced

          gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceIndexBuffer);
          gl.enableVertexAttribArray(this.aInstanceIndex);
          gl.vertexAttribPointer(this.aInstanceIndex, 1, gl.FLOAT, false, 0, 0);
          ext.vertexAttribDivisorANGLE(this.aInstanceIndex, 1); // instanced

          gl.enable(gl.BLEND);
          gl.blendFuncSeparate(
            gl.SRC_ALPHA,
            gl.ONE_MINUS_SRC_ALPHA,
            gl.ONE,
            gl.ONE_MINUS_SRC_ALPHA
          );

          ext.drawArraysInstancedANGLE(
            gl.TRIANGLE_STRIP,
            0,
            this.squareVerts.length / 2,
            flows.length
          );
        },
      };

      let locationsLayer = {
        id: "locations",
        type: "custom",

        onAdd: function (map, gl) {
          this.program = gl.createProgram();
          gl.attachShader(
            this.program,
            compileShader(
              gl,
              gl.VERTEX_SHADER,
              `
        precision highp float;
        uniform mat4 u_matrix;
        attribute vec4 a_location;
        attribute vec2 a_square_vert;
        varying vec2 v_square_pos;
        void main() {
          float radius = a_location.z;
          float instance_index = a_location.w;
          v_square_pos = a_square_vert.xy;  // position within [-1, 1] square
          float scale_y = u_matrix[1][1]/u_matrix[0][0];
          gl_Position = u_matrix * vec4(a_location.xy, 0.0, 1.0) + 
                        radius * vec4(a_square_vert.x, a_square_vert.y * scale_y, 0.0, 0.0);
        }
      `
            )
          );
          gl.attachShader(
            this.program,
            compileShader(
              gl,
              gl.FRAGMENT_SHADER,
              `
        #define SOFT_OUTLINE 0.7
        precision highp float;
        varying vec2 v_square_pos;
        varying float v_color_intensity;
        uniform vec4 u_color;
        void main() {
          if (length(v_square_pos) > 1.0) { discard; }
          float soften = smoothstep(0.0, SOFT_OUTLINE, 1.0 - length(v_square_pos));
          gl_FragColor = vec4(u_color.xyz, u_color.w * soften);
        }
      `
            )
          );
          gl.linkProgram(this.program);

          // Square vertices
          this.aSquareVert = gl.getAttribLocation(
            this.program,
            "a_square_vert"
          );
          this.squareVerts = new Float32Array([
            // a square to cover the unit circle
            -1,
            -1,
            -1,
            1,
            1,
            1,
            1,
            -1,
          ]);
          this.squareVertsBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertsBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, this.squareVerts, gl.STATIC_DRAW);

          // Locations
          this.aLocationCoords = gl.getAttribLocation(
            this.program,
            "a_location"
          );
          const locationCoords = new Float32Array(locations.length * 4);
          locations.sort((a, b) =>
            d3.ascending(
              locationTotals.max.get(a.id) || 0,
              locationTotals.max.get(b.id) || 0
            )
          );
          for (let i = 0; i < locations.length; i++) {
            const { id, x, y } = locations[i];
            locationCoords[i * 4] = x;
            locationCoords[i * 4 + 1] = y;
            locationCoords[i * 4 + 2] = locationRadiusScale(
              locationTotals.max.get(id)
            );
            locationCoords[i * 4 + 3] = 1.0 - i / locations.length;
          }
          this.locationCoordsBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.locationCoordsBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, locationCoords, gl.STATIC_DRAW);
        },

        render: function (gl, matrix) {
          const ext = gl.getExtension("ANGLE_instanced_arrays");
          gl.useProgram(this.program);
          gl.uniformMatrix4fv(
            gl.getUniformLocation(this.program, "u_matrix"),
            false,
            matrix
          );
          const { r, g, b } = d3.rgb(flowColorScale(maxFlowMagnitude));
          gl.uniform4fv(gl.getUniformLocation(this.program, "u_color"), [
            r / 255,
            g / 255,
            b / 255,
            1.0,
          ]);

          // Square vertices
          gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertsBuffer);
          gl.enableVertexAttribArray(this.squareVertsBuffer);
          gl.vertexAttribPointer(this.aSquareVert, 2, gl.FLOAT, false, 0, 0);
          ext.vertexAttribDivisorANGLE(this.aSquareVert, 0); // non-instanced

          // Location coords
          gl.bindBuffer(gl.ARRAY_BUFFER, this.locationCoordsBuffer);
          gl.enableVertexAttribArray(this.aLocationCoords);
          gl.vertexAttribPointer(
            this.aLocationCoords,
            4,
            gl.FLOAT,
            false,
            0,
            0
          );
          ext.vertexAttribDivisorANGLE(this.aLocationCoords, 1); // instanced

          gl.enable(gl.BLEND);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

          ext.drawArraysInstancedANGLE(
            gl.TRIANGLE_FAN,
            0,
            this.squareVerts.length / 2,
            locations.length
          );
        },
      };
      /***********变量定义**********/
      // const maxFlowMagnitude = d3.max(flows, (flow) => flow.count);
      const maxFlowMagnitude = 400000;

      const flowThicknessScale = d3
        .scaleLinear()
        .range([4, 20, 30, 60])
        .domain([10, 5000, 20000, maxFlowMagnitude]);

      const flowOpacityScale = d3
        .scalePow()
        .exponent(1 / 10)
        .range([0, 1.0])
        .domain([0, maxFlowMagnitude]);

      //https://mefelixwang.gitbooks.io/d3-v4-api/api/ColorSchemes.html#schemerdpu
      const flowColorScale = d3
        .scaleSequentialPow(d3.interpolatePuBu)
        .exponent(1 / 3)
        .domain([maxFlowMagnitude, 0]);

      const locationRadiusScale = d3
        .scalePow(1 / 2)
        .range([2, 16])
        .domain([0, d3.max(Array.from(locationTotals.incoming.values()))]);

      /*********************/
      map.addLayer(flowsLayer, "china-place-city_large-s");
      map.addLayer(locationsLayer);

      function animateArcs() {
        //定时器，不断调用函数
        var timer = setInterval(() => {
          map.jumpTo({ bearing: 0 });
        }, 16);
      }
      animateArcs();
    }
  });
});

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  throw new Error(gl.getShaderInfoLog(shader));
}

function currentTime() {
  const loopLength = 1000;
  const animationSpeed = 150; // unit time per second
  const timestamp = Date.now() / 1000;
  const loopTime = loopLength / animationSpeed;
  return ((timestamp % loopTime) / loopTime) * loopLength;
}
