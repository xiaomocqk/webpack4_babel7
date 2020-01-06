module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "settings": {
    "react": {
      "version": "detect",
    }
  },
  "root": true,
  "parser": "babel-eslint",
  "env": {
    "amd": true,
    "es6": true,
    "browser": true,
    "node": true
  },
  "rules": {
    "no-var": "warn",
    "no-unused-vars": "warn",
    "eqeqeq": "warn",
    "semi": "warn",
    "no-console": "off",
    "no-alert": "warn",
    "no-undef": "warn",
    "no-else-return": "warn", // 禁止 if 语句中 return 语句之后有 else 块
    "radix": "warn", // 强制在parseInt()使用基数参数
    // "no-trailing-spaces": "warn", // 禁用行尾空格
    "no-mixed-spaces-and-tabs": "warn",

    "react/prop-types": "off",
    // "react/no-unknown-property": ["warn", { ignore: ["class"] }],
    // "react/react-in-jsx-scope": "warn",
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",// 支持export及import
    "ecmaFeatures": {
      "jsx": true
    }
  }
};