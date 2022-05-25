import tmi from "tmi.js";
import config from "./common/config";

export const TmiClient = () => new tmi.Client({
  connection: {
    reconnect: true,
  },
  identity: {
    username: config.BOT_USERNAME,
    password: config.BOT_OAUTH_TOKEN,
  },
  channels: [config.CHANNEL],
});
