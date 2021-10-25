import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  box: {
    width: 100,
    height: 100,
    borderRadius: 20 /*1*/,
    border: "10px solid transparent" /*2*/,
    background: "linear-gradient(45deg,red,blue) border-box" /*3*/,
    backdropFilter: "blur(8)",

    mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
    maskComposite: "destination-out",
    //   -webkit-mask: /*4*/
    //      linear-gradient(#fff 0 0) padding-box,
    //      linear-gradient(#fff 0 0),
    //   -webkit-mask-composite: destination-out, /*5'*/
    // maskComposite: "exclude" /*5*/,
  },
}));

export default function GradeHeader({ grade, percentage }) {
  const classes = useStyles();

  let w = 470;
  const h = 470;
  const r = 100;

  const xlen = w - 2 * r;
  const ylen = h - 2 * r;
  const round = Math.PI * 2 * r;
  const tot = xlen * 2 + ylen * 2 + round;

  const value = (percentage / 100) * tot;

  return (
    // <div className={classes.box}></div>
    <svg width={150} height={150} viewBox="0 0 500 500">
      <g>
        <rect
          x={15}
          y={15}
          width={w}
          height={h}
          stroke="#78008B"
          strokeDasharray={`${value} ${tot - value}`}
          strokeDashoffset={-xlen / 2}
          strokeWidth={30}
          fill="transparent"
          rx={r}
        ></rect>
        <rect
          x={15}
          y={15}
          width={w}
          height={h}
          fill="#78008B"
          fillOpacity={0.5}
          rx={r}
        ></rect>
        <text
          x="50%"
          y="40%"
          dominant-baseline="middle"
          text-anchor="middle"
          color="white"
          fill="white"
          fontSize={180}
          fontWeight={500}
        >
          {grade}
        </text>
        <text
          x="50%"
          y="75%"
          dominant-baseline="middle"
          text-anchor="middle"
          color="white"
          fill="white"
          fontSize={90}
          fontWeight={400}
        >
          {percentage}%
        </text>
      </g>
    </svg>
  );
}
