const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "entry",
    },
  ],
  "@babel/react",
  "@babel/flow",
];

const plugins = [
  "@babel/proposal-object-rest-spread",
  "@babel/proposal-class-properties",
  [
    "module:babel-7-plugin-root-import",
    {
      rootPathSuffix: "lib",
      rootPathPrefix: "@",
    },
  ],
];

module.exports = { presets, plugins };
