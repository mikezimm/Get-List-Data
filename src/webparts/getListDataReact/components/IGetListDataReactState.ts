
import { IListItem } from "../IListItem"

/* was this default
export interface IGetListDataProps {
  description: string;
}
*/

export interface IGetListDataReactState {
  loadListItems?: () => Promise<IListItem[]>;
  allItems?:IListItem[];
}