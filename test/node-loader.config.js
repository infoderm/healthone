import * as importMapLoader from "@node-loader/import-maps";
import * as babelLoader from "@node-loader/babel";

export default {
  loaders: [importMapLoader, babelLoader],
};
