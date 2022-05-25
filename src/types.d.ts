import { Command } from "./common/command";

export type Throttling = {
  usages: number;
  duration: number;
}

// @TODO: Need to add Vip & Follower
export type Role = "BROADCASTER" | "MODERATOR" | "SUBSCRIBER" | "ALL";

export type CommandArgument = {
  key: string;
  type: "string" | "number";
  default?: string | number;
  max?: number;
  min?: number;
};

export type ArgumentValues = Record<string, string | number | null> | null;
export type CommandResolver = (args: ArgumentValues) => string | false;

export type CommandOpts = {
  // string that used as command trigger
  signature: string;
  // function that receives arguments and return string that will be sent as response
  resolver: CommandResolver;
  // arguments of command
  args?: CommandArgument[];
  // aliases of command
  aliases?: string[];
  // currently doesn't use anywhere
  description?: string;
  throttling?: Throttling;
  allowedRoles?: Role[];
}

export type CommandResolverOpts = {
  // symbol that use as command trigger. Ex: ! (exclamation mark)
  commandPrefix: string;
}

type ArgumentCollectorResult = {
  command: Command,
  values: ArgumentValues
}
