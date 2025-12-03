module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script",
  },
  rules: {
    "no-underscore-dangle": "off",

    "no-console": ["warn", { allow: ["warn", "error"] }],

    // ✅ This allows Express error handlers to include 'next'
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  },
};
