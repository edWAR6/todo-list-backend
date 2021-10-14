import { ItemService } from "./item/item.service.interface";
import { ListService } from "./list/list.service.interface";

abstract class ServiceFactory {
  public abstract getListService(): ListService | undefined;
  public abstract getItemService(): ItemService | undefined;
}

export {
  ServiceFactory
};
