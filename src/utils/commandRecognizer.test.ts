import { Command } from "../command";
import { commandRecognizer } from "./commandRecognizer";

const prefix = "!";
const commandMock = (name: string) => new Command({ name, resolver: () => "" });

test("With 0 command", () => {
  const command = commandMock("help");

  const message = "!someother";
  const result = commandRecognizer(message, prefix, [command]);

  expect(result.isCommand).toBeFalsy();
});

test("With wrong prefix", () => {
  const command = commandMock("help");

  const message = "!someother";
  const result = commandRecognizer(message, "?", [command]);

  expect(result.isCommand).toBeFalsy();
});

test("With 1 command", () => {
  const command = commandMock("help");

  const message = "!help pc";
  const result = commandRecognizer(message, prefix, [command]);

  expect(result.isCommand).toBeTruthy();
  expect(result).toHaveProperty("command");
  if (result.isCommand) {
    expect(result.command).toBe(command);
    expect(result.values).toBeNull();
  }
});

test("With 2 commands", () => {
  const command1 = commandMock("help");
  const command2 = commandMock("socials");

  const message = "!socials fb";
  const result = commandRecognizer(message, prefix, [command1, command2]);

  expect(result.isCommand).toBeTruthy();
  expect(result).toHaveProperty("command");
  if (result.isCommand) {
    expect(result.command).toBe(command2);
    expect(result.values).toBeNull();
  }
});

test("With arguments", () => {
  const command = commandMock("help");
  command.options.args = [{ type: "string", key: "type" }];

  const message = "!help pc";
  const result = commandRecognizer(message, prefix, [command]);
  expect(result.isCommand).toBeTruthy();
  if (result.isCommand) {
    expect(result.values).toMatchObject({ type: "pc" });
  }
});
