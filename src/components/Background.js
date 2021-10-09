import ParticlesBg from "particles-bg";
import React, { Component } from "react";

let config = {
  life: [1.5, 1],
  num: [2, 2],
};

class Background extends Component {
  render() {
    return (
      <>
        <div>...</div>
        <ParticlesBg
          num="20"
          opacity="80%"
          type="cobweb"
          color="#793695"
          bg={true}
          config={config}
        />
      </>
    );
  }
}
export default Background;
