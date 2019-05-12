// URL: https://observablehq.com/@chedman/line-chart-with-tooltip/2
// Title: Refugee resettled versus cap
// Author: Carl Hedman (@chedman)
// Version: 601
// Runtime version: 1

const m0 = {
  id: "d4cf42b96e9f6c4b@601",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Refugee resettled versus cap`
)})
    },
    {
      name: "chart",
      inputs: ["d3","DOM","width","height","xAxis","yAxis","data","transition","line","data2","transition2","line2","data2009","transition2009","line3","x","y","transitionText","data2015","transition2015","data2017","transition2017","data2018","transition2018","bisect","callout","legend"],
      value: (function(d3,DOM,width,height,xAxis,yAxis,data,transition,line,data2,transition2,line2,data2009,transition2009,line3,x,y,transitionText,data2015,transition2015,data2017,transition2017,data2018,transition2018,bisect,callout,legend)
{ 
  const svg = d3.select("#id4").append("svg")
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
		.attr("transform", "translate(" + (x(data2009[1].Year)-80) + "," + (y(data2009[1].Line)-10) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "line3")
		.style("fill", "none")
    .style("font", "10px sans-serif")
    .call(transitionText)
		.text("2009: President Obama starts term");
  
     svg.append("path")
      .datum(data2015)
      .attr("fill", "none")
      .attr("stroke-width", 1)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .call(transition2015)
      .attr("d", line3); 
  
  	svg.append("text")
		.attr("transform", "translate(" + (x(data2015[1].Year)-100) + "," + (y(data2015[1].Line)-10) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "line3")
		.style("fill", "none")
    .style("font", "10px sans-serif")
    .call(transitionText)
		.text("2015: Syrian Refugee Crisis starts");  
  
       svg.append("path")
      .datum(data2017)
      .attr("fill", "none")
      .attr("stroke-width", 1)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .call(transition2017)
      .attr("d", line3); 
  
  	svg.append("text")
		.attr("transform", "translate(" + (x(data2017[1].Year)-100) + "," + (y(data2017[1].Line)-10) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "line3")
		.style("fill", "none")
    .style("font", "10px sans-serif")
    .call(transitionText)
		.text("2017: President Obama increases cap to 110,000");  

    svg.append("path")
      .datum(data2018)
      .attr("fill", "none")
      .attr("stroke-width", 1)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .call(transition2018)
      .attr("d", line3); 
  
  	svg.append("text")
		.attr("transform", "translate(" + (x(data2018[1].Year)-130) + "," + (y(data2018[1].Line)-10) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "line3")
		.style("fill", "none")
    .style("font", "10px sans-serif")
    .call(transitionText)
    .text("2018: President Trump reduces cap to 45,000");  
  
  const tooltip = svg.append("g");

  svg.on("touchmove mousemove", function() {
    const {Year, Cap, resettled} = bisect(d3.mouse(this)[0]);

    tooltip
        .attr("transform", `translate(${x(Year)},${y(Cap)})`)
        .call(callout, `FY ${Year.toLocaleString()}
refugee cap: ${Cap.toLocaleString()} 
resettled: ${resettled.toLocaleString()}`);
  });

  svg.on("touchend mouseleave", () => tooltip.call(callout, null));

   svg.append("g")
      .call(legend); //Display legend
  
  return svg.node(); 
  
}
)
    },
    {
      name: "legend",//build legend for cahrt
      inputs: ["color"],
      value: (function(color){return(
svg => {
  const g = svg
      .attr("transform", `translate(70,15)`)
      .attr("text-anchor", "start")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("g")
    .data(["Refugee Cap","Number Resettled"])//display two line values
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

  g.append("circle")//use circle icon in legend
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
)})
    },
    {
      name: "color",
      inputs: ["d3"],
      value: (function(d3){return(//set color for legend icon
d3.scaleOrdinal()
    .range(["red", "blue"])
)})
    },
    {
      name: "transition",
      inputs: ["tweenDash","d3"],
      value: (function(tweenDash,d3){return(
function transition(path) {
  path.transition()
      .duration(10000)
      .attrTween("stroke-dasharray", tweenDash)
      .on("end", () => { d3.select(this).call(transition); });
}
)})
    },
    {
      name: "transition2",
      inputs: ["tweenDash","d3","transition"],
      value: (function(tweenDash,d3,transition){return(
function transition2(path) {
  path.transition()
      .duration(10000)
      .attrTween("stroke-dasharray", tweenDash)
      .on("end", () => { d3.select(this).call(transition); });
}
)})
    },
    {
      name: "transitionText",//create a transition to delay when the timeline text is displayed
      inputs: ["d3","transition"],
      value: (function(d3,transition){return(
function transitionText(text) {
  text.transition()
  .delay(9000)
  .style("fill", "black")
  .style("font-weight", "bold")
  .on("end", () => { d3.select(this).call(transition); });
}
)})
    },
    {
      name: "transition2009",//create different transitions for each timeline element line. Delay draw so they each appear sequentially 
      inputs: ["tweenDash","d3","transition"],
      value: (function(tweenDash,d3,transition){return(
function transition2009(path) {
  path.transition()
      .duration(5000)
      .delay(3500)
      .attr("stroke", "gray")
      .attrTween("stroke-dasharray", tweenDash)
      .on("start", () => { d3.select(this).call(transition); });
}
)})
    },
    {
      name: "transition2015",//create different transitions for each timeline element line
      inputs: ["tweenDash","d3","transition"],
      value: (function(tweenDash,d3,transition){return(
function transition2015(path) {
  path.transition()
      .duration(5000)
      .delay(4000)
      .attr("stroke", "gray")
      .attrTween("stroke-dasharray", tweenDash)
      .on("start", () => { d3.select(this).call(transition); });
}
)})
    },
    {
      name: "transition2017",//create different transitions for each timeline element line.
      inputs: ["tweenDash","d3","transition"],
      value: (function(tweenDash,d3,transition){return(
function transition2017(path) {
  path.transition()
      .duration(5000)
      .delay(4500)
      .attr("stroke", "gray")
      .attrTween("stroke-dasharray", tweenDash)
      .on("start", () => { d3.select(this).call(transition); });
}
)})
    },
    {
      name: "transition2018",//create different transitions for each timeline element line.
      inputs: ["tweenDash","d3","transition"],
      value: (function(tweenDash,d3,transition){return(
function transition2018(path) {
  path.transition()
      .duration(5000)
      .delay(5000)
      .attr("stroke", "gray")
      .attrTween("stroke-dasharray", tweenDash)
      .on("start", () => { d3.select(this).call(transition); });
}
)})
    },
   /* {
      name: "transition2019",
      inputs: ["tweenDash","d3","transition"],
      value: (function(tweenDash,d3,transition){return(
function transition2019(path) {
  path.transition()
      .duration(5000)
      .delay(7000)
      .attr("stroke", "red")
      .attrTween("stroke-dasharray", tweenDash)
      .on("start", () => { d3.select(this).call(transition); });
}
)})
    },*/
    {
      name: "tweenDash",//delay draw function
      inputs: ["d3"],
      value: (function(d3){return(
function tweenDash() {
  const l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
  return function(t) { return i(t) };
}
)})
    },
    {
      name: "height",
      value: (function(){return(
400
)})
    },
    {
      name: "margin",
      value: (function(){return(
{top: 20, right: 30, bottom: 30, left: 40}
)})
    },
    {
      inputs: ["data"],
      value: (function(data){return(
data
)})
    },
    {
      value: (function(){return(
new Date(2003, 0, 1)
)})
    },
    {
      name: "x",
      inputs: ["d3","margin","width"],
      value: (function(d3,margin,width){return(
d3.scaleLinear()
    .domain([2003, 2019])
    .range([margin.left, width - margin.right])
)})
    },
    {

    },
    {
      name: "y",
      inputs: ["d3","height","margin"],
      value: (function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0, 130000]).nice()
    .range([height - margin.bottom, margin.top])
)})
    },
    {
      name: "xAxis",
      inputs: ["height","margin","d3","x","width"],
      value: (function(height,margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0).tickFormat(d3.format("d")))
)})
    },
    {
      name: "yAxis",
      inputs: ["margin","d3","y","data"],
      value: (function(margin,d3,y,data){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))
)})
    },
    {
      name: "callout",
      value: (function(){return(
(g, value) => {
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
        .style("font-weight", (_, i) => i ? null : "bold")
        .text(d => d));

  const {x, y, width: w, height: h} = text.node().getBBox();

  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
}
)})
    },
    {
      name: "bisect",
      inputs: ["d3","x","data3"],
      value: (function(d3,x,data3)
{
  const bisect = d3.bisector(d => d.Year).left;
  
  return mx => {
    const Year = x.invert(mx);
    const index = bisect(data3, Year, 1);
    console.log(bisect(data3, Year, 1))
    const a = data3[index - 1];
    const b = data3[index];
    return Year - a.date > b.date - Year ? a : b;
  };
}
)
    },
    {
      name: "line",
      inputs: ["d3","x","y"],
      value: (function(d3,x,y){return(
d3.line()
    .defined(d => !isNaN(d.Cap))
    .x(d => x(d.Year))
    .y(d => y(d.Cap))
)})
    },
    {
      name: "line2",
      inputs: ["d3","x","y"],
      value: (function(d3,x,y){return(
d3.line()
    .defined(d => !isNaN(d.resettled))
    .x(d => x(d.Year))
    .y(d => y(d.resettled))
)})
    },
    {
      name: "line3",
      inputs: ["d3","x","y"],
      value: (function(d3,x,y){return(
d3.line()
    .defined(d => !isNaN(d.Line))
    .x(d => x(d.Year))
    .y(d => y(d.Line))
)})
    },
    {
      name: "data2009",
      value: (function(){return(
[{Year: "2009", Line: "0"}, {Year: "2009", Line: "100000"}]
)})
    },
    {
      name: "data2015",
      value: (function(){return(
[{Year: "2015", Line: "0"}, {Year: "2015", Line: "100000"}]
)})
    },
    {
      name: "data2017",
      value: (function(){return(
[{Year: "2017", Line: "0"}, {Year: "2017", Line: "130000"}]
)})
    },
    {
      name: "data2018",
      value: (function(){return(
[{Year: "2018", Line: "0"}, {Year: "2018", Line: "115000"}]
)})
    },
    {
      name: "dataCap2019",
      value: (function(){return(
[{Year: "2018", Line: "45000"}, {Year: "2019", Line: "30000"}]
)})
    },
    {
      name: "data",
      inputs: ["d3"],
      value: (function(d3){return(
d3.csv("https://gist.githubusercontent.com/chedman/a820ca9808a6ce58c8cfbd8c927ef0e8/raw/c888d047d37e7e5af5307f4d81ce6f974e355b5b/fy%2520cap.csv", ({Year, Cap}) => ({Year: +Year, Cap: +Cap}))
)})
    },
    {
      name: "data2",
      inputs: ["d3"],
      value: (function(d3){return(
d3.csv("https://gist.githubusercontent.com/chedman/7e87d6f233597c59a65992f7d21bd16d/raw/7e916d36048b2e5322fa1bbf8abeede4e2453dac/FY_resettled", ({Year, resettled}) => ({Year: +Year, resettled: +resettled}))
)})
    },
    {
      name: "data3",
      inputs: ["d3"],
      value: (function(d3){return(
d3.csv("https://gist.githubusercontent.com/chedman/5ccabc3ee9cdaf5f4e9e5d126979e239/raw/23e1bff0c4c071aab3c523b98a0f5caf2e6de684/cap%2520and%2520resettled%2520by%2520fy.csv")
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@^5.9")
)})
    }
  ]
};

const notebook = {
  id: "d4cf42b96e9f6c4b@601",
  modules: [m0]
};

export default notebook;