const data = {
  description: "French numerical system",
  data: [
    {
      value: 2,
      name: "2",
    },
    {
      value: 2.5,
      name: "2",
    },
    {
      value: 3,
      name: "3",
    },
    {
      value: 3.33,
      name: "3+",
    },
    {
      value: 3.67,
      name: "4-",
    },
    {
      value: 4,
      name: "4",
    },
    {
      value: 4.33,
      name: "4+",
    },
    {
      value: 4.67,
      name: "5-",
    },
    {
      value: 5,
      name: "5",
    },
    {
      value: 5.5,
      name: "5+",
    },
    {
      value: 5.33,
      name: "5b",
    },
    {
      value: 5.5,
      name: "5b+",
    },
    {
      value: 6,
      name: "6a",
    },
    {
      value: 6.17,
      name: "6a+",
    },
    {
      value: 6.33,
      name: "6b",
    },
    {
      value: 6.5,
      name: "6b+",
    },
    {
      value: 6.67,
      name: "6c",
    },
    {
      value: 6.83,
      name: "6c+",
    },
    {
      value: 7,
      name: "7a",
    },
    {
      value: 7.17,
      name: "7a+",
    },
    {
      value: 7.33,
      name: "7b",
    },
    {
      value: 7.5,
      name: "7b+",
    },
    {
      value: 7.67,
      name: "7c",
    },
    {
      value: 7.83,
      name: "7c+",
    },
    {
      value: 8,
      name: "8a",
    },
    {
      value: 8.17,
      name: "8a+",
    },
    {
      value: 8.33,
      name: "8b",
    },
    {
      value: 8.5,
      name: "8b+",
    },
    {
      value: 8.67,
      name: "8c",
    },
    {
      value: 8.83,
      name: "8c+",
    },
    {
      value: 9,
      name: "9a",
    },
    {
      value: 9.17,
      name: "9a+",
    },
    {
      value: 9.33,
      name: "9b",
    },
    {
      value: 9.5,
      name: "9b+",
    },
  ],
};

const convertGrade = gradeValue => {
  for (let i = 0; i < data.data.length; i++) {
    if (data.data.length <= i + 1 || data.data[i + 1].value >= gradeValue) {
      const grade = data.data[i].name;
      // const gradeValueRound = data.data[i].value;
      // const percentage =
      //   Math.round(
      //     ((gradeValue - gradeValueRound) /
      //       (data.data[i].value - gradeValueRound)) *
      //       100
      //   ) + "%";
      // console.log("percentage: " + percentage);
      return [grade];
    }
  }
};

export default convertGrade;
