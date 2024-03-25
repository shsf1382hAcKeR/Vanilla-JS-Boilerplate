export default {
  plugins: {
    autoprefixer: {},
    "postcss-nested": {},
    "postcss-uncss": {
      html: ["./src/index.html"],
    },
  },
};
