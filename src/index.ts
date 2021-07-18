import { TmiClient } from "./tmi-client";
import { SocialLinks } from "./commands/social-links";
import { resolveCommands } from "./command-resolver";

export const client = TmiClient();
client.connect().then(() => {
  console.log("client started");
});

const commands = [
  SocialLinks(),
];

resolveCommands({ commandPrefix: "!" }, commands);
