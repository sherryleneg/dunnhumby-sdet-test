module.exports = {
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    extends: ["plugin:cypress/recommended"],
    overrides: [
      {
        files: ["*.ts"],
        extends: [
          "plugin:@typescript-eslint/recommended",
        ],
        rules: {
          "@typescript-eslint/no-unused-vars": [
            "error",
            {
              ignoreRestSiblings: true,
            },
          ],
          "@typescript-eslint/explicit-function-return-type": "off",
          "@typescript-eslint/no-non-null-assertion": "off",
          "@typescript-eslint/no-namespace": "off",
        },
      },
    ],
  };
  