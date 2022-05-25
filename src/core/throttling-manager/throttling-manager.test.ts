import { Command } from "@common/command";
import { ThrottlingManager } from "./throttling-manager";

const commandMock = () => new Command({ signature: "help", resolver: () => "" });

jest.useFakeTimers();

test("Items removed after timeout", () => {
  const manager = new ThrottlingManager();

  const username = "devkucher";
  const command = commandMock();
  const duration = 3000;
  command.options.throttling = {
    usages: 2,
    duration,
  };

  manager.push({ command, username, datetime: new Date() });
  jest.runAllTimers();
  expect(manager.stack.length).toBe(0);
});

test("Can't be added more than possible", () => {
  const manager = new ThrottlingManager();

  const username = "devkucher";
  const command = commandMock();
  const duration = 3000;
  command.options.throttling = {
    usages: 2,
    duration,
  };

  manager.push({ command, username, datetime: new Date() });
  manager.push({ command, username, datetime: new Date() });
  manager.push({ command, username, datetime: new Date() });

  const canBeAdded = manager.canBeResolved({ command, username });

  expect(manager.stack.length).toBe(2);
  expect(canBeAdded).toBeFalsy();
});

test("Items /wo throttling", () => {
  const manager = new ThrottlingManager();

  const username = "devkucher";
  const command = commandMock();

  manager.push({ command, username, datetime: new Date() });
  const canBeAdded = manager.canBeResolved({ command, username });

  expect(manager.stack.length).toBe(0);
  expect(canBeAdded).toBeTruthy();
});
