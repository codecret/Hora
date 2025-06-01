import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import macrosPlugin from "vite-plugin-babel-macros";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|tsx)$/,
      babel: {
        plugins: ["styled-components"],
        babelrc: false,
        configFile: false,
      },
    }),
    macrosPlugin(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        credentials: true,
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
});
