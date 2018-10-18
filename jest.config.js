module.exports = {
  rootDir: "./",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testURL: "http://localhost/",
  modulePathIgnorePatterns: [
    "<rootDir>/build/"
  ],
  moduleFileExtensions: [
    "ts",
    "js",
    "json"
  ]
}
