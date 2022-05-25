import { Command } from "@common/command";
import { CommandResolver } from "../types";
import { Signatures } from "./signatures";

const resolver: CommandResolver = (args) => {
  if (!args || !args.type) return false;

  switch (args.type) {
    case "fb":
      return "facebook.com";
    case "tw":
      return "tw.com";
    default:
      return false;
  }
};

export const SocialLinks = new Command({ name: Signatures.SOCIAL_LINKS, resolver, args: [{ key: "type", type: "string" }] });
