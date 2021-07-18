import { Command } from "../command";
import { findCommandInMessage } from "./findCommandInMessage";

const commandMock = (name: string) => new Command({ name, resolver: () => "" });

test("Doesn't have command", () => {
  const command = commandMock("help");
  const commandFromMessage = "okey";

  const result = findCommandInMessage([command], commandFromMessage);
  expect(result.founded).toBeFalsy();
  expect(result.command).toBeNull();
});

test("Found by name", () => {
  const command = commandMock("help");
  const commandFromMessage = "help";

  const result = findCommandInMessage([command], commandFromMessage);
  expect(result.founded).toBeTruthy();
  expect(result.command).toBe(command);
});

test("Found by alias", () => {
  const command = commandMock("help");
  command.options.aliases = ["inh", "sos"];
  const commandFromMessage = "sos";

  const result = findCommandInMessage([command], commandFromMessage);
  expect(result.founded).toBeTruthy();
  expect(result.command).toBe(command);
});
