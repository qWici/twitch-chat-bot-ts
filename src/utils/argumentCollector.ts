import { Command } from "../command";
import { ArgumentCollectorResult, CommandArgument } from "../types";

export const argumentCollector = (command: Command, message: string): ArgumentCollectorResult => {
  const result: ArgumentCollectorResult = {
    command,
    values: {},
  };

  if (!command.options.args || command.options.args.length === 0) {
    result.values = null;
    return result;
  }

  const messageSplitted = message.split(" ");
  messageSplitted.shift(); // Remove command

  command.options.args.map((arg, i) => {
    const prepared = prepareArgument(arg, messageSplitted[i]);
    result.values = { ...result.values, ...prepared };
    return true;
  });

  return result;
};

const prepareArgument = (argument: CommandArgument, value?: string | number) => {
  if (!value) {
    return {
      [argument.key]: formatValue(argument.type, argument.default),
    };
  }

  let tempValue = value;
  if (argument.type === "number" && (argument.min || argument.max)) {
    if (argument.min && value < argument.min) {
      tempValue = argument.min;
    }
    if (argument.max && value > argument.max) {
      tempValue = argument.max;
    }
  }

  return {
    [argument.key]: formatValue(argument.type, tempValue),
  };
};

const formatValue = (format: "string" | "number", currentValue?: string | number) => {
  if (!currentValue) return null;

  if (
    (typeof currentValue === "string" && format === "string")
    || (typeof currentValue === "number" && format === "number")) {
    return currentValue;
  }

  if (typeof currentValue === "string" && format === "number") {
    return parseInt(currentValue, 10);
  }

  return currentValue.toString();
};
