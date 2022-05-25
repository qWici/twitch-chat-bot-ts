import { CommonUserstate } from "tmi.js";
import { Command } from "./command";
import { CommandResolverOpts } from "./types";
import { client } from "./index";
import { commandRecognizer } from "./utils/commandRecognizer";
import { messageToUser } from "./utils/messageToUser";
import { checkRoles } from "./utils/checkRoles";
import { throttlingManager } from "./throttling-manager";

export const resolveCommands = (commands: Command[], options?: CommandResolverOpts) => {
  const defaultOptions: CommandResolverOpts = {
    commandPrefix: "!",
  };

  const mergedOptions = Object.assign(defaultOptions, options);

  const resolve = (channel: string, userstate: CommonUserstate, message: string, self: boolean) => {
    // Ignore bot messages
    if (self) return false;

    const recognizedCommand = commandRecognizer(message, mergedOptions.commandPrefix, commands);
    if (!recognizedCommand.isCommand) return false;

    const hasPermissions = checkRoles(recognizedCommand.command, userstate);
    if (!hasPermissions) return false;

    const checkThrottling = throttlingManager.canBeResolved({
      command: recognizedCommand.command,
      username: userstate.username,
    });
    if (!checkThrottling) return false;

    const resultMessage = recognizedCommand.command.options.resolver(recognizedCommand.values);
    if (!resultMessage) return false;

    throttlingManager.push({
      command: recognizedCommand.command,
      username: userstate.username,
      datetime: new Date(),
    });
    return messageToUser(resultMessage, userstate.username);
  };

  client.on("chat", resolve);
};
