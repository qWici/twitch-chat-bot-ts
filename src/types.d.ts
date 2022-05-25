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
  signature: string;
  resolver: CommandResolver;
  args?: CommandArgument[];
  aliases?: string[];
  description?: string;
  throttling?: Throttling;
  allowedRoles?: Role[];
}

export type CommandResolverOpts = {
  commandPrefix: string;
}

type ArgumentCollectorResult = {
  command: Command,
  values: ArgumentValues
}
