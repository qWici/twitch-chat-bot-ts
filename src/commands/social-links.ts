import { Command } from "../command";
import { CommandResolver } from "../types";
import { Signatures } from "./signatures";

export const SocialLinks = () => {
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

  return new Command({ name: Signatures.SOCIAL_LINKS, resolver, args: [{ key: "type", type: "string" }] });
};
