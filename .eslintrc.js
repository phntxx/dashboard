module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    maxClassesPerFile: 0,
    maxLineLength: 0,
    memberOrdering: 0,
    variableName: 0,
  },
};
