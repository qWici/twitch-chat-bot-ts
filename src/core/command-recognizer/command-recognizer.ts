import { Command } from "@common/command";
import { findCommandInMessage } from "./findCommandInMessage";
import { argumentCollector } from "../argument-collector/argument-collector";

type commandRecognizerResult =
  { isCommand: true, command: Command, values: null } |
  { isCommand: true, command: Command, values: Record<string, string | number | null> } |
  { isCommand: false };

export const commandRecognizer = (message: string, prefix: string, commands: Command[]): commandRecognizerResult => {
  if (message.charAt(0) !== prefix) return { isCommand: false };

  const messageSplitted = message.split(" ");
  const recognizedCommandName = messageSplitted[0].replace(prefix, "");

  const foundCommand = findCommandInMessage(commands, recognizedCommandName);
  if (!foundCommand.founded) return { isCommand: false };

  if (!foundCommand.command.options.args || foundCommand.command.options.args.length === 0) {
    return { isCommand: true, command: foundCommand.command, values: null };
  }

  const withArguments = argumentCollector(foundCommand.command, message);
  return { isCommand: true, command: foundCommand.command, values: withArguments.values };
};
