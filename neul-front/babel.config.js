module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css", // css로 자동 스타일 import
      },
      "antd", // 여러 import가 있을 때 충돌 방지용 name
    ],
  ],
};
