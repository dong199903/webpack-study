const path = require('path');
function pathResolve(src) {
  return path.resolve(__dirname,src);
}
module.exports = {
  templateHtml:pathResolve("./../public/index.html"),
  output:pathResolve("./../dist"),
  input:pathResolve("./../src/index.js"),
  devServerPath:pathResolve("./../dist"),
  rootPath:pathResolve("./../src")
};