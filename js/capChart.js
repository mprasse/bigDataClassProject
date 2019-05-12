

const makeRequest = async() => {
  function bisect() {
   var bisect = d3.bisector(d => d.Year).left;
   // console.log(12332542345)

   return mx => {
     const Year = x.invert(mx);
     const index = bisect(data3, Year, 1);
     //console.log(bisect(data3, Year, 1))
     const a = data3[index - 1];
     const b = data3[index];
     return Year - a.date > b.date - Year ? a : b;
   };
 }

 const data = await d3.csv("https://gist.githubusercontent.com/chedman/a820ca9808a6ce58c8cfbd8c927ef0e8/raw/c888d047d37e7e5af5307f4d81ce6f974e355b5b/fy%2520cap.csv", ({
   Year,
   Cap
 }) => ({
   Year: +Year,
   Cap: +Cap
 }));
 const data2 = await d3.csv("https://gist.githubusercontent.com/chedman/7e87d6f233597c59a65992f7d21bd16d/raw/7e916d36048b2e5322fa1bbf8abeede4e2453dac/FY_resettled", ({
   Year,
   resettled
 }) => ({
   Year: +Year,
   resettled: +resettled
 }))
 const data3 = await d3.csv("https://gist.githubusercontent.com/chedman/5ccabc3ee9cdaf5f4e9e5d126979e239/raw/23e1bff0c4c071aab3c523b98a0f5caf2e6de684/cap%2520and%2520resettled%2520by%2520fy.csv")

 var data2009 = [{
   Year: "2009",
   Line: "0"
 }, {
   Year: "2009",
   Line: "100000"
 }]
 var data2015 = [{
   Year: "2015",
   Line: "0"
 }, {
   Year: "2015",
   Line: "100000"
 }]
 var data2017 = [{
   Year: "2017",
   Line: "0"
 }, {
   Year: "2017",
   Line: "130000"
 }]
 var data2018 = [{
   Year: "2018",
   Line: "0"
 }, {
   Year: "2018",
   Line: "115000"
 }]
 var dataCap2019 = [{
   Year: "2018",
   Line: "45000"
 }, {
   Year: "2019",
   Line: "30000"
 }]

 var height = 300
 var width = 570
 var margin = ({
   top: 20,
   right: 30,
   bottom: 30,
   left: 40
 })
 var color = d3.scaleOrdinal()
   .range(["red", "blue"])
 new Date(2003, 0, 1)

 var line = d3.line()
   .defined(d => !isNaN(d.Cap))
   .x(d => x(d.Year))
   .y(d => y(d.Cap))

 var line2 = d3.line()
   .defined(d => !isNaN(d.resettled))
   .x(d => x(d.Year))
   .y(d => y(d.resettled))

 var line3 = d3.line()
   .defined(d => !isNaN(d.Line))
   .x(d => x(d.Year))
   .y(d => y(d.Line))

 var x = d3.scaleLinear()
   .domain([2003, 2019])
   .range([margin.left, width - margin.right])

 var y = d3.scaleLinear()
   .domain([0, 130000]).nice()
   .range([height - margin.bottom, margin.top])

 xAxis = g => g
   .attr("transform", `translate(0,${height - margin.bottom})`)
   .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0).tickFormat(d3.format("d")))

 yAxis = g => g
   .attr("transform", `translate(${margin.left},0)`)
   .call(d3.axisLeft(y))
   .call(g => g.select(".domain").remove())
   .call(g => g.select(".tick:last-of-type text").clone()
     .attr("x", 3)
     .attr("text-anchor", "start")
     .attr("font-weight", "bold")
     .text(data.y))

 var svg = d3.select("#id4").append("svg")
   .attr("width", 570)
   .attr("height", 300)
   .style("-webkit-tap-highlight-color", "transparent")
   .style("overflow", "visible");

 svg.append("g")
   .call(xAxis);

 svg.append("g")
   .call(yAxis);

 svg.append("path")
   .datum(data)
   .attr("fill", "none")
   .attr("stroke", "red")
   .attr("stroke-width", 1.5)
   .attr("stroke-linejoin", "round")
   .attr("stroke-linecap", "round")
   .call(transition)
   .attr("d", line);

 svg.append("path")
   .datum(data2)
   .attr("fill", "none")
   .attr("stroke", "blue")
   .attr("stroke-width", 1.5)
   .attr("stroke-linejoin", "round")
   .attr("stroke-linecap", "round")
   .call(transition2)
   .attr("d", line2);

 svg.append("path")
   .datum(data2009)
   .attr("fill", "none")
   // .attr("stroke", "gray")
   .attr("stroke-width", 1)
   .attr("stroke-linejoin", "round")
   .attr("stroke-linecap", "round")
   .call(transition2009)
   .attr("d", line3);

 svg.append("text")
   .attr("transform", "translate(" + (x(data2009[1].Year) - 80) + "," + (y(data2009[1].Line) - 10) + ")")
   .attr("dy", ".35em")
   .attr("text-anchor", "line3")
   .style("fill", "none")
   .style("font", "10px sans-serif")
   .call(transitionText)
   .text("2009: President Obama starts term");

 svg.append("path")
   .datum(data2015)
   .attr("fill", "none")
   //   .attr("stroke", "gray")
   .attr("stroke-width", 1)
   .attr("stroke-linejoin", "round")
   .attr("stroke-linecap", "round")
   .call(transition2015)
   .attr("d", line3);

 svg.append("text")
   .attr("transform", "translate(" + (x(data2015[1].Year) - 100) + "," + (y(data2015[1].Line) - 10) + ")")
   .attr("dy", ".35em")
   .attr("text-anchor", "line3")
   .style("fill", "none")
   .style("font", "10px sans-serif")
   .call(transitionText)
   .text("2015: Syrian Refugee Crisis starts");

 svg.append("path")
   .datum(data2017)
   .attr("fill", "none")
   //    .attr("stroke", "gray")
   .attr("stroke-width", 1)
   .attr("stroke-linejoin", "round")
   .attr("stroke-linecap", "round")
   .call(transition2017)
   .attr("d", line3);

 svg.append("text")
   .attr("transform", "translate(" + (x(data2017[1].Year) - 100) + "," + (y(data2017[1].Line) - 10) + ")")
   .attr("dy", ".35em")
   .attr("text-anchor", "line3")
   .style("fill", "none")
   .style("font", "10px sans-serif")
   .call(transitionText)
   .text("2017: President Obama increases cap to 110,000");

 svg.append("path")
   .datum(data2018)
   .attr("fill", "none")
   //    .attr("stroke", "gray")
   .attr("stroke-width", 1)
   .attr("stroke-linejoin", "round")
   .attr("stroke-linecap", "round")
   .call(transition2018)
   .attr("d", line3);

 svg.append("text")
   .attr("transform", "translate(" + (x(data2018[1].Year) - 130) + "," + (y(data2018[1].Line) - 10) + ")")
   .attr("dy", ".35em")
   .attr("text-anchor", "line3")
   .style("fill", "none")
   .style("font", "10px sans-serif")
   .call(transitionText)
   .text("2018: President Trump reduces cap to 45,000");

 /*  svg.append("path")
     .datum(dataCap2019)
     .attr("fill", "none")
  //    .attr("stroke", "red")
     .attr("stroke-width", 1.5)
     .attr("stroke-linejoin", "round")
     .attr("stroke-linecap", "round")
     .call(transition2019)
  // .style("stroke-dasharray", ("3, 3"))
     .attr("d", line3); */


 var tooltip = svg.append("g");

 svg.on("touchmove mousemove", function () {
   const {
     Year,
     Cap,
     resettled
   } = bisect()(d3.mouse(this)[0]);
   // console.log(3434234234324)
   // console.log(bisect(d3.mouse(this)));
   tooltip
     .attr("transform", `translate(${x(Year)},${y(Cap)})`)
     .call(callout, `FY ${Year.toLocaleString()} 
     Refugee Cap: ${Cap.toLocaleString()} 
     Resettled: ${resettled.toLocaleString()}`);
 });

 svg.on("touchend mouseleave", function() { tooltip.call(callout, null) });


 legend = svg => {
   var g = svg
     .attr("transform", `translate(70,15)`)
     .attr("text-anchor", "start")
     .attr("font-family", "sans-serif")
     .attr("font-size", 10)
     .selectAll("g")
     .data(["Refugee Cap", "Number Resettled"])
     .join("g")
     //.append("g")
     .attr("transform", (d, i) => `translate(0,${i * 20})`);

   g.append("circle")
     .attr("cx", -8)
     .attr("cy", 8)
     .attr("r", 6)
     .attr("fill", color);

   g.append("text")
     .attr("x", 10)
     .attr("y", 9.5)
     .attr("dy", "0.35em")
     .text(d => d);
 }

 svg.append("g")
   .call(legend);


 function transition(path) {
   path.transition()
     .duration(10000)
     .attrTween("stroke-dasharray", tweenDash)
   // .on("end", function(){
   //   d3.select(this).call(transition);
   // });
 }

 function transition2(path) {
   path.transition()
     .duration(10000)
     .attrTween("stroke-dasharray", tweenDash)
   // .on("end", function () {
   //   d3.select(this).call(transition);
   // });
 }

 function transitionText(text) {
   text.transition()
     .delay(9000)
     .style("fill", "black")
     .style("font-weight", "bold")
   // .on("end", function () {
   //   debugger;
   //   d3.select(this).call(transition);
   // });
 }

 function transition2009(path) {
   path.transition()
     .duration(5000)
     .delay(3500)
     .attr("stroke", "gray")
     .attrTween("stroke-dasharray", tweenDash)
   // .on("start", function () {
   //   d3.select(this).call(transition);
   // });
 }

 function transition2015(path) {
   path.transition()
     .duration(5000)
     .delay(4000)
     .attr("stroke", "gray")
     .attrTween("stroke-dasharray", tweenDash)
   // .on("start", function () {
   //   d3.select(this).call(transition);
   // });
 }

 function transition2017(path) {
   path.transition()
     .duration(5000)
     .delay(4500)
     .attr("stroke", "gray")
     .attrTween("stroke-dasharray", tweenDash)
   // .on("start", function () {
   //   d3.select(this).call(transition);
   // });
 }

 function transition2018(path) {
   path.transition()
     .duration(5000)
     .delay(5000)
     .attr("stroke", "gray")
     .attrTween("stroke-dasharray", tweenDash)
   // .on("start", function () {
   //   d3.select(this).call(transition);
   // });
 }

 function transition2019(path) {
   path.transition()
     .duration(5000)
     .delay(7000)
     .attr("stroke", "red")
     .attrTween("stroke-dasharray", tweenDash)
   // .on("start", () => {
   //   d3.select(this).call(transition);
   // });
 }

 function tweenDash() {

   var l = this.getTotalLength(),
     i = d3.interpolateString("0," + l, l + "," + l);
   return function (t) {
     return i(t)
   };
 }


 callout = (g, value) => {
   if (!value) return g.style("display", "none");

   g
     .style("display", null)
     .style("pointer-events", "none")
     .style("font", "10px sans-serif");

   const path = g.selectAll("path")
     .data([null])
     .join("path")
     .attr("fill", "white")
     .attr("stroke", "black");

   const text = g.selectAll("text")
     .data([null])
     .join("text")
     .call(text => text
       .selectAll("tspan")
       .data((value + "").split(/\n/))
       .join("tspan")
       .attr("x", 0)
       .attr("y", (d, i) => `${i * 1.1}em`)
       //.attr("z", 0)
       //.style("font-weight", (_, i) => i ? null : "bold")
       .text(d => d));

   const {
     x,
     y,
     width: w,
     height: h
   } = text.node().getBBox();

   text.attr("transform", `translate(${-w / 2},${15 - y})`);
   path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
 }

};


makeRequest();
