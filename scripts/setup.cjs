const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const environmentPath = path.join(projectRoot, ".env");

if (!fs.existsSync(environmentPath)) {
  fs.copyFileSync(path.join(projectRoot, ".env.example"), environmentPath);
}
