module.exports = {
  bracketSpacing: true,
  printWidth: 80,
  parser: "typescript",
  trailingComma: "all",
  arrowParens: "always",
  overrides: [
    {
      files: "README.md",
      options: {
        parser: "markdown",
      },
    },
    {
      files: "*.json",
      options: {
        parser: "json",
      }
    }
  ],
};