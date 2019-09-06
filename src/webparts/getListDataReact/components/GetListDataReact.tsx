import * as React from 'react';
import styles from './GetListDataReact.module.scss';
import { IGetListDataReactProps } from './IGetListDataReactProps';
import { escape } from '@microsoft/sp-lodash-subset';

//Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
import { DefaultButton, autobind } from 'office-ui-fabric-react';
import {IListItem} from '../IListItem';

export default class GetListDataReact extends React.Component<IGetListDataReactProps, {}> {
  public render(): React.ReactElement<IGetListDataReactProps> {
    return (
      <div className={ styles.getListDataReact }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>


            {/*Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc) */}
            <DefaultButton 
              text="Load List Items"
              title="Load List Items"
              onClick={this._loadListItems} />



            </div>
          </div>
        </div>
      </div>
    );
  }

  
  //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc

  @autobind  
  private async _loadListItems(): Promise<void> {
    //This invokes the loadListItems function on the parent webpart.ts
    const items: IListItem[] = await this.props.loadListItems();
    console.log(items);
  }

}
