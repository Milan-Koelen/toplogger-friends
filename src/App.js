import "./App.css";
import Login from "./_components/Login";
import Dashboard from "./_components/Dashboard";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./_components/PrivateRoute";
import Search from "./_components/Search";
import Layout from "./_components/Layout";
import UserPage from "./_components/UserPage";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/" exact>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/search">
            <Search />
          </PrivateRoute>
          <PrivateRoute path="/user">
            <UserPage />
          </PrivateRoute>
          <PrivateRoute path="/user/:TL_ID">
            <UserPage />
          </PrivateRoute>
        </Switch>
      </Layout>
      {/* <div>{!!user.token ? <Logout /> : <Login />}</div> */}
    </div>
  );

  // const svgUrl =
  //   "https://cdn1.toplogger.nu/images/gyms/monk_eindhoven/floorplan.svg?5";

  // const x = 300;
  // const y = 0;

  // const svgContainerRef = useRef(null);

  // const parseToploggerSVG = svgText => {
  //   if (!svgContainerRef.current) return;
  //   var parser = new DOMParser();
  //   var doc = parser.parseFromString(svgText, "image/svg+xml");

  //   var newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //   var svgNS = newSVG.namespaceURI;

  //   var moveGroup = document.createElementNS(svgNS, "g");
  //   moveGroup.setAttribute("transform", `translate(${x},${y}) scale(1)`);
  //   newSVG.appendChild(moveGroup);

  //   var scaleGroup = doc.getElementById("zoom_layer");
  //   scaleGroup.setAttribute("transform", "translate(0,0) scale(0.1)");
  //   moveGroup.appendChild(scaleGroup);

  //   // console.log(doc);

  //   svgContainerRef.current.innerHtml = "";
  //   svgContainerRef.current.appendChild(newSVG);

  //   return doc;
  // };

  // useEffect(() => {
  //   fetch(svgUrl)
  //     .then(res => res.text())
  //     .then(data => parseToploggerSVG(data));
  // }, [svgContainerRef]);

  // return (
  //   <div className="App">
  //     <header className="App-header"></header>
  // <div className="floorplan" ref={svgContainerRef}></div>
  //   </div>
  // );
}

export default App;
