import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

const isProduction = process.env.NODE_ENV === "production";
const configFilename = isProduction ? ".env" : ".dev.env";
const configPath = path.join(__dirname, "../", configFilename);
const isConfigFileExist = fs.existsSync(configPath);

if (!isConfigFileExist) {
  console.error(`Whoops! Looks like you forgot to create ${configFilename} file`);
  process.exit(0);
}

dotenv.config({
  path: configPath,
});

const requiredEnvs = ["BOT_USERNAME", "BOT_OAUTH_TOKEN", "CHANNEL"];
requiredEnvs.map((value) => {
  if (!process.env[value]) {
    console.error(`Missing ${value} value`);
    process.exit(0);
  }

  return true;
});

export default {
  BOT_USERNAME: process.env.BOT_USERNAME || "",
  BOT_OAUTH_TOKEN: process.env.BOT_OAUTH_TOKEN || "",
  CHANNEL: process.env.CHANNEL || "",
};
