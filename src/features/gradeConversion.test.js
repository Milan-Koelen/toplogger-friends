import convertGrade from "./gradeConversion";

test("convert grades", () => {
  expect(convertGrade(3.2)).toBe("3a");
  expect(convertGrade(4.2)).toBe("4a");
  expect(convertGrade(6.1)).toBe("6a");
  expect(convertGrade(6.25)).toBe("6a+");
  expect(convertGrade(11)).toBe("9b+");
});
