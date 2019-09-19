import * as React from 'react';
import styles from './GetListDataReact.module.scss';
import { IGetListDataReactProps } from './IGetListDataReactProps';
import { IGetListDataReactState } from './IGetListDataReactState';

import { escape } from '@microsoft/sp-lodash-subset';

//Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
import { DefaultButton, autobind } from 'office-ui-fabric-react';
import {IListItem} from '../IListItem';

export default class GetListDataReact extends React.Component<IGetListDataReactProps, IGetListDataReactState> {

  //https://www.youtube.com/watch?v=4nsGhYjfRsw 9:01-ish talks about setting constructor
  public constructor(props:IGetListDataReactProps){
    super(props);
    this.state = { 
      allItems:[],
      someItems:[],
      otherItems:[],
    }
  }

  //https://www.youtube.com/watch?v=4nsGhYjfRsw 9:50-ish talks about this line to update props
  public componentDidMount() {
    this._loadListItems();
    this._loadOtherListItems();
  }
  /*
            Removed this from the public render below to auto load data.
            <DefaultButton 
              text="Load List Items"
              title="Load List Items"
              onClick={this._loadListItems} />
  */
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
                <h2>This site's items</h2>
                {this.state.allItems.map(function(item:IListItem){
                  return(
                    <div>
                      <span>
                        {item.Title} {item.CustomerID}
                      </span>
                    </div>
                  )
                })}

                <h2>Items from other site</h2>
                {this.state.otherItems.map(function(item:IListItem){
                  return(
                    <div>
                      <span>
                        {item.Title} {item.CustomerID}
                      </span>
                    </div>
                  )
                })} 
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
    const listItems: IListItem[] = await this.props.loadListItems();

    //https://www.youtube.com/watch?v=4nsGhYjfRsw 9:01-ish talks about this line to update props
    this.setState({allItems:listItems});
    console.log("Items from THIS site");
    console.log(listItems);
  }
  private async _loadOtherListItems(): Promise<void> {
    //This invokes the loadListItems function on the parent webpart.ts
    const listItems2: IListItem[] = await this.props.loadOtherListItems();

    //https://www.youtube.com/watch?v=4nsGhYjfRsw 9:01-ish talks about this line to update props
    this.setState({otherItems:listItems2});
    console.log("Other Items from other site");
    console.log(listItems2);
  }
}
