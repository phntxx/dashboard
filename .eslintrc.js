module.exports = {
  extends: ["eslint:recommended", "plugin:react-hooks/recommended"],
  rules: {
    orderedImports: true,
    completedDocs: [
      true,
      {
        enums: true,
        functions: {
          visibilities: ["exported"],
        },
        interfaces: {
          visibilities: ["exported"],
        },
        methods: {
          tags: {
            content: {},
            existence: ["inheritdoc", "override"],
          },
        },
        types: {
          visibilities: ["exported"],
        },
        variables: {
          visibilities: ["exported"],
        },
      },
    ],
    maxClassesPerFile: false,
    maxLineLength: false,
    memberOrdering: false,
    variableName: false,
  },
};
