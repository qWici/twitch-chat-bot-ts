import { Command } from "@common/command";
import { argumentCollector } from "./argument-collector";

const commandMock = () => new Command({ signature: "help", resolver: () => "" });

test("String argument exist", () => {
  const command = commandMock();
  command.options.args = [{ type: "string", key: "type" }];

  const message = "!help pc";
  const result = argumentCollector(command, message);

  expect(result.values).toMatchObject({ type: "pc" });
});

test("String argument missing /wo default", () => {
  const command = commandMock();
  command.options.args = [{ type: "string", key: "type" }];

  const message = "!help";
  const result = argumentCollector(command, message);

  expect(result.values).toMatchObject({ type: null });
});

test("String argument missing with default", () => {
  const command = commandMock();
  command.options.args = [{ type: "string", key: "type", default: "bio" }];

  const message = "!help";
  const result = argumentCollector(command, message);

  expect(result.values).toMatchObject({ type: "bio" });
});

test("Number argument exist", () => {
  const command = commandMock();
  command.options.args = [{ type: "number", key: "coins" }];

  const message = "!play 10";
  const result = argumentCollector(command, message);

  expect(result.values).toMatchObject({ coins: 10 });
});

test("Number argument exist - check min", () => {
  const command = commandMock();
  command.options.args = [{ type: "number", key: "coins", min: 20 }];

  const message = "!play 10";
  const result = argumentCollector(command, message);

  expect(result.values).toMatchObject({ coins: 20 });
});

test("Number argument exist - check max", () => {
  const command = commandMock();
  command.options.args = [{ type: "number", key: "coins", max: 5 }];

  const message = "!play 10";
  const result = argumentCollector(command, message);

  expect(result.values).toMatchObject({ coins: 5 });
});

test("Number argument exist - check min & max", () => {
  const command = commandMock();
  command.options.args = [{
    type: "number", key: "coins", min: 5, max: 20,
  }];

  const message = "!play 10";
  const result = argumentCollector(command, message);

  expect(result.values).toMatchObject({ coins: 10 });
});

test("Number argument missing /wo default", () => {
  const command = commandMock();
  command.options.args = [{ type: "number", key: "coins" }];

  const message = "!play";
  const result = argumentCollector(command, message);

  expect(result.values).toMatchObject({ coins: null });
});

test("Number argument missing with default", () => {
  const command = commandMock();
  command.options.args = [{ type: "number", key: "coins", default: 100 }];

  const message = "!play";
  const result = argumentCollector(command, message);

  expect(result.values).toMatchObject({ coins: 100 });
});

test("Argument don't needed", () => {
  const command = commandMock();
  const message = "!play";
  const result = argumentCollector(command, message);

  expect(result.values).toBeNull();
});
