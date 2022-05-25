import { SocialLinks } from "@commands/social-links";
import { resolveCommands } from "@core/command-resolver/command-resolver";
import { TmiClient } from "./tmi-client";

export const client = TmiClient();
client.connect().then(() => {
  console.log("client started");
});

const commands = [
  SocialLinks,
];

resolveCommands(commands);
