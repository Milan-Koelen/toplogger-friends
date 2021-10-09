import ParticlesBg from "particles-bg";
import React, { Component } from "react";

let config = {
  num: [0.5, 1],
  rps: 0.1,
  radius: [5, 40],
  life: [5, 15],
  v: [0.3, 0.1],
  tha: [-40, 40],
  alpha: [0.3, 0],
  scale: [0.1, 0.4],
  position: "all",
  color: ["#793695", "#ff0000"],
  cross: "dead",
  // emitter: "follow",
  random: 1,
};
if (Math.random() > 0.85) {
  config = Object.assign(config, {
    onParticleUpdate: (ctx, particle) => {
      ctx.beginPath();
      ctx.rect(
        particle.p.x,
        particle.p.y,
        particle.radius * 2,
        particle.radius * 2
      );
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.closePath();
    },
  });
}

class Background extends Component {
  render() {
    return (
      <ParticlesBg
        type="custom"
        color="#793695"
        num={5}
        config={config}
        bg={true}
      />
    );
  }
}
export default Background;
