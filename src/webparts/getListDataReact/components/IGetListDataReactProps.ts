
import { IListItem } from "../IListItem"

/* was this default
export interface IGetListDataProps {
  description: string;
}
*/

export interface IGetListDataReactProps {
  loadListItems: () => Promise<IListItem[]>;
}