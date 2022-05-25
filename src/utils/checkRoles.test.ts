import { Command } from "@common/command";
import { checkRoles } from "./checkRoles";
import config from "../common/config";

const commandMock = (name: string) => new Command({ name, resolver: () => "" });

test("Without roles", () => {
  const command = commandMock("help");

  const result = checkRoles(command, { mod: true });
  expect(result).toBe(true);
});

test("With all role", () => {
  const command = commandMock("help");
  command.options.allowedRoles = ["ALL"];

  const result = checkRoles(command, { mod: true });
  expect(result).toBe(true);
});

test("One of roles is ALL", () => {
  const command = commandMock("help");
  command.options.allowedRoles = ["BROADCASTER", "ALL"];

  const result = checkRoles(command, {});
  expect(result).toBe(true);
});

test("With subscriber role - true", () => {
  const command = commandMock("help");
  command.options.allowedRoles = ["SUBSCRIBER"];

  const result = checkRoles(command, { subscriber: true });
  expect(result).toBe(true);
});

test("With subscriber role - false", () => {
  const command = commandMock("help");
  command.options.allowedRoles = ["SUBSCRIBER"];

  const result = checkRoles(command, { subscriber: false });
  expect(result).toBe(false);
});

test("With moderator role - true", () => {
  const command = commandMock("help");
  command.options.allowedRoles = ["MODERATOR"];

  const result = checkRoles(command, { mod: true });
  expect(result).toBe(true);
});

test("With moderator role - false", () => {
  const command = commandMock("help");
  command.options.allowedRoles = ["MODERATOR"];

  const result = checkRoles(command, { mod: false });
  expect(result).toBe(false);
});

test("With broadcaster role - true", () => {
  const command = commandMock("help");
  command.options.allowedRoles = ["BROADCASTER"];

  const result = checkRoles(command, { username: config.CHANNEL });
  expect(result).toBe(true);
});

test("With moderator role - false", () => {
  const command = commandMock("help");
  command.options.allowedRoles = ["BROADCASTER"];

  const result = checkRoles(command, { username: "devkucher" });
  expect(result).toBe(false);
});

test("Has few roles - need one", () => {
  const command = commandMock("help");
  command.options.allowedRoles = ["SUBSCRIBER"];

  const result = checkRoles(command, { mod: true, subscriber: false });
  expect(result).toBe(false);
});
