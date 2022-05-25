# How to add new command without parameters

1. Add new signature to `src/commands/signatures.ts`
```typescript
export const Signatures = {
  //...
  COIN: 'coin'
};

```
2. Create new file in `src/commands`. Ex: `coin.ts`
3. Here we export our command
```typescript
import { Command } from "@common/command";
import { Signatures } from "@commands/signatures";
import { CommandResolver } from "../types";

const resolver: CommandResolver = () => {
  const isHeads = Math.random() < 0.5; // 0.5 mean 50% chance
  return isHeads ? "heads" : "tails";
};

export const Coin = new Command({ name: Signatures.COIN, resolver });
```
4. Import command in `index.ts`
```typescript
import { Coin } from "@commands/coin";

//...
const commands = [
  //...
  Coin
];

resolveCommands(commands);
```
