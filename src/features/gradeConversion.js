import gradeSystems from "./grades/grades";

const convertGrade = (gradeValue, system = "font") => {
  const grades = gradeSystems[system];

  for (let i = 0; i < grades.data.length; i++) {
    // If is is second to last or next grade is more then our value
    if (grades.data.length >= i + 1 || grades.data[i + 1].value >= gradeValue) {
      if (i === grades.data.length - 1) {
        const grade = grades.data[i].name;
        return [grade, 100, grades.data[i].name];
      }
      if (gradeValue < grades.data[i].value && i !== 0) {
        // console.log(gradeValue);
        const nextGradeValue = grades.data[i].value;
        const grade = grades.data[i - 1];

        const restValue = gradeValue - grade.value;

        const diffNextGrade = nextGradeValue - grade.value;

        // 100 = diffnextGrade

        const pRestValue = Math.round(restValue * 100);
        const pdiffNextGrade = Math.round(diffNextGrade * 100);

        const percentage = Math.round((pRestValue / pdiffNextGrade) * 100);

        // console.log({
        //   TL_grade: gradeValue,
        //   Grade: grade.name,
        //   i: i,
        //   Next: nextGradeValue,
        //   Rest: restValue,
        //   Dif: diffNextGrade,
        // });
        return [grade.name, percentage, grades.data[i].name];
      }
    }
  }
};

export default convertGrade;
