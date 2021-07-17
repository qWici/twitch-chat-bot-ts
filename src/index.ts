import config from "./config";
import { TmiClient } from "./tmi-client";

const client = TmiClient();
client.connect().then(() => console.log("Client connected"));

console.log(config.BOT_USERNAME);
