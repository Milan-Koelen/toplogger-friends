import { useState, useEffect, useRef } from "react";
import "./App.css";

const svgUrl =
  "https://cdn1.toplogger.nu/images/gyms/monk_eindhoven/floorplan.svg?5";

const x = 300;
const y = 0;

function App() {
  const svgContainerRef = useRef(null);

  const parseToploggerSVG = svgText => {
    if (!svgContainerRef.current) return;
    var parser = new DOMParser();
    var doc = parser.parseFromString(svgText, "image/svg+xml");

    var newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var svgNS = newSVG.namespaceURI;

    var moveGroup = document.createElementNS(svgNS, "g");
    moveGroup.setAttribute("transform", `translate(${x},${y}) scale(1)`);
    newSVG.appendChild(moveGroup);

    var scaleGroup = doc.getElementById("zoom_layer");
    scaleGroup.setAttribute("transform", "translate(0,0) scale(0.1)");
    moveGroup.appendChild(scaleGroup);

    // console.log(doc);

    svgContainerRef.current.innerHtml = "";
    svgContainerRef.current.appendChild(newSVG);

    return doc;
  };

  useEffect(() => {
    fetch(svgUrl)
      .then(res => res.text())
      .then(data => parseToploggerSVG(data));
  }, [svgContainerRef]);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="floorplan" ref={svgContainerRef}></div>
    </div>
  );
}

export default App;
