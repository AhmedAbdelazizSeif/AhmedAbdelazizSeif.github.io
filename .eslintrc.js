module.exports = {
    env: {
      browser: true, // for your React code
      node: true,    // for Node scripts and config files
      es2021: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended" // React-specific linting rules
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      // Disable prop-types if you’re not using them
      "react/prop-types": "off",
      // With the new JSX transform you don’t need to import React in every file
      "react/react-in-jsx-scope": "off",
      // Change no-unused-vars to warn (and ignore vars that start with _)
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // If you find vendor issues with globals like `process` or `Buffer`, they should be defined in the Node environment.
      // (With "node": true in env these errors should go away.)
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  };
  