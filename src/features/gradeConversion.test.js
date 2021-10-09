import convertGrade from "./gradeConversion";

test("convert grades", () => {
  expect(convertGrade(3.2)[0]).toBe("3");
  expect(convertGrade(4.2)[0]).toBe("4");
  expect(convertGrade(6.1)[0]).toBe("6A");
  expect(convertGrade(6.25)[0]).toBe("6A+");
  expect(convertGrade(11)[0]).toBe("9B+");
});

test("check percentages", () => {
  expect(convertGrade(6.78334)[1]).toBe(69);
  expect(convertGrade(6.35069)[1]).toBe(12);
  expect(convertGrade(7.03301)[1]).toBe(18);
});
