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
    sourceType: "script", // use "module" only if your package.json has "type": "module"
  },
  rules: {
    "no-underscore-dangle": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }], // instead of error, so you see warnings but build doesn’t fail
  },
};
