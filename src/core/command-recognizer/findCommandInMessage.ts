import { Command } from "@common/command";

type FindCommandInMessageResult =
  { founded: false, command: null } |
  { founded: true, command: Command };

export const findCommandInMessage = (commands: Command[], commandFromMessage: string): FindCommandInMessageResult => {
  const equal = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
  let result: FindCommandInMessageResult = {
    founded: false,
    command: null,
  };

  commands.map((command) => {
    // Find by name
    if (equal(command.options.signature, commandFromMessage)) {
      result = {
        founded: true,
        command,
      };

      return true;
    }

    if (!command.options.aliases || command.options.aliases.length === 0) return false;

    // Find by alias
    command.options.aliases.map((alias) => {
      if (equal(alias, commandFromMessage)) {
        result = {
          founded: true,
          command,
        };
      }
      return false;
    });

    return false;
  });

  return result;
};
