import { Command } from "./command";

export class ThrottlingManager {
  stack: NewThrottlingStackItem[] = [];

  public push(item: NewThrottlingStackItem) {
    if (!item.command.options.throttling) return;
    if (!this.canBeResolved(item)) return;

    this.stack.push(item);
    this.itemGarbageCollector(item);
  }

  public canBeResolved(item: ThrottlingStackItem) {
    if (!item.command.options.throttling) return true;
    const foundItem = this.findStackItem(item);
    if (!foundItem) return true;

    const countAlreadyExist = this.getCountOfItems(item);
    return countAlreadyExist !== item.command.options.throttling.usages;
  }

  private pull(index: number) {
    this.stack.splice(index, 1);
  }

  private itemGarbageCollector(item: NewThrottlingStackItem) {
    if (!item.command.options.throttling || !item.command.options.throttling.duration) return;

    const timeout = setTimeout(() => {
      const foundItem = this.findStackItem(item);
      if (!foundItem) return;

      this.pull(foundItem.index);
      clearTimeout(timeout);
    }, item.command.options.throttling.duration);
  }

  private findStackItem(item: ThrottlingStackItem): findStackItemResult {
    let founded: findStackItemResult = null;

    this.stack.find((stackItem, index) => {
      if (stackItem.username !== item.username) return false;
      if (stackItem.command.options.name !== item.command.options.name) return false;

      founded = { stackItem, index };
      return true;
    });

    return founded;
  }

  private getCountOfItems(item: ThrottlingStackItem) {
    const foundItems = this.stack.filter((stackItem) => {
      if (stackItem.username !== item.username) return false;
      if (stackItem.command.options.name !== item.command.options.name) return false;

      return stackItem;
    });

    return foundItems.length;
  }
}

export const throttlingManager = new ThrottlingManager();

type NewThrottlingStackItem = {
  command: Command;
  username: string;
  datetime: Date;
}
type ThrottlingStackItem = Omit<NewThrottlingStackItem, "datetime">;
type findStackItemResult = { stackItem: NewThrottlingStackItem, index: number } | null;
