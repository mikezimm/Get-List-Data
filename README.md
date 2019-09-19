### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

## How to build from scratch

### Command Line
npm install @pnp/logging @pnp/common @pnp/odata @pnp/sp --save

### IListItem.ts (in main webpart folder)
```typescript
export interface IListItem {
    Title: string;
    CustomerID: string
}
```
### Main Webpart.ts -- Imports
```typescript
import { sp, Web } from '@pnp/sp';
import {IListItem} from './IListItem'
```

### Main Webpart.ts -- Just inside main class
```typescript
export default class GetListDataReactWebPart extends BaseClientSideWebPart<IGetListDataReactWebPartProps> {
  //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
  public onInit():Promise<void> {
    return super.onInit().then(_ => {
      // other init code may be present
      sp.setup({
        spfxContext: this.context
      });
    });
  }

    //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
  public render(): void {
    const element: React.ReactElement<IGetListDataReactProps > = React.createElement(
      GetListDataReact,{
        loadListItems: this.loadListItems,
        loadOtherListItems: this.loadOtherListItems,
      }
    );
    ReactDom.render(element, this.domElement);
  }



```
### Main Webpart.ts -- After public render - private async functions to pass to component
```typescript
  //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
  private async loadListItems(): Promise<IListItem[]> {
    /* Filtering example of same one and only retreiving certain columns
    const result:IListItem[] = await sp.web.lists.getByTitle("Customers").items
    .select("Title","CustomerID").filter("Title eq 'GM'").orderBy("Id",true).getAll()
    */
    // Gets items from THIS web
    const result:IListItem[] = await sp.web.lists.getByTitle("Customers").items
      .orderBy("Id",true).getAll()
    return(result);
  }

  //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
  private async loadOtherListItems(): Promise<IListItem[]> {
    /* Filtering example of same one and only retreiving certain columns
    const result:IListItem[] = await sp.web.lists.getByTitle("Customers").items
    .select("Title","CustomerID").filter("Title eq 'GM'").orderBy("Id",true).getAll()
    */

   // Gets items from ANOTHER web
   let web = new Web('https://mcclickster.sharepoint.com/sites/Templates/SPFx/');
   const result:IListItem[] = await web.lists.getByTitle("CustomersSPFx").items
      .orderBy("Id",true).getAll()
    return(result);
  }
```

### Component Props.ts -- IYourWebPartProps.ts
```typescript
import { IListItem } from "../IListItem"

export interface IYourWebPartProps {
  loadListItems?: () => Promise<IListItem[]>;
  loadOtherListItems?: () => Promise<IListItem[]>;
  allItems?:IListItem[];
  someItems?:IListItem[];
  otherItems?:IListItem[];
}
```

### Component State.ts -- IYourWebPartState.ts
```typescript
import { IListItem } from "../IListItem"

export interface IYourWebPartState {
  loadListItems?: () => Promise<IListItem[]>;
  loadOtherListItems?: () => Promise<IListItem[]>;
  allItems?:IListItem[];
  someItems?:IListItem[];
  otherItems?:IListItem[];
}
```

### Component Class.tsx -- IYourWebPart.tsx
```typescript
import { IYourWebPartProps } from './IYourWebPartProps';
import { IYourWebPartState } from './IYourWebPartState';

//Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
import { DefaultButton, autobind } from 'office-ui-fabric-react';
import {IListItem} from '../IListItem';

}
```

### Component Class.tsx -- IYourWebPart.tsx - Initialize State in CONSTRUCTOR
```typescript

export default class GetListDataReact extends React.Component<IYourWebPartProps, IYourWebPartState> {

  //https://www.youtube.com/watch?v=4nsGhYjfRsw 9:01-ish talks about setting constructor
  public constructor(props:IYourWebPartProps){
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
```

### Component Class.tsx -- IYourWebPart.tsx - Show results in public render mapping the state arrays
```typescript
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
```

### Component Class.tsx -- IYourWebPart.tsx - Create private async _functions called during componentDidMount
DONT Forget @autobind to in case you forget earlier.

```typescript
 
  //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
  @autobind  
  private async _loadListItems(): Promise<void> {
    //This invokes the loadListItems function on the parent webpart.ts, then sets state with result
    const listItems: IListItem[] = await this.props.loadListItems();
    this.setState({allItems:listItems});

  }
  private async _loadOtherListItems(): Promise<void> {
    //This invokes the loadListItems function on the parent webpart.ts, then sets state with result
    const listItems2: IListItem[] = await this.props.loadOtherListItems();
    this.setState({otherItems:listItems2});
  }

  ```

### References
used for this example:  https://www.youtube.com/watch?v=b9Ymnicb1kc
others:   https://www.youtube.com/watch?v=4nsGhYjfRsw
others:   https://www.youtube.com/watch?v=EGczypeSQEg
indian youtuber:   https://www.youtube.com/watch?v=UFHR38VfDkU
patric rogers (good simple example for real site):   https://www.youtube.com/watch?v=VTCB6WQCJI8

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
