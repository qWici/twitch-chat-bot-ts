import { client } from "../index";
import config from "../common/config";

export const messageToUser = async (message: string, username?: string) => {
  if (!username) {
    return client.action(config.CHANNEL, message);
  }

  return client.action(config.CHANNEL, `@${username} ${message}`);
};
