import { CommonUserstate } from "tmi.js";
import { Command } from "@common/command";
import config from "../common/config";
import { Role } from "../types";

export const checkRoles = (command: Command, user: CommonUserstate) => {
  if (!command.options.allowedRoles || command.options.allowedRoles.length === 0) return true;
  if (command.options.allowedRoles.includes("ALL")) return true;

  const userRoles: Role[] = [];
  if (user.mod) {
    userRoles.push("MODERATOR");
  }
  if (user.subscriber) {
    userRoles.push("SUBSCRIBER");
  }
  if (user.username === config.CHANNEL) {
    userRoles.push("BROADCASTER");
  }

  return command.options.allowedRoles.some((role) => userRoles.includes(role));
};
