import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GetListDataReactWebPartStrings';
import GetListDataReact from './components/GetListDataReact';
import { IGetListDataReactProps } from './components/IGetListDataReactProps';


// used for this example:  https://www.youtube.com/watch?v=b9Ymnicb1kc
// others:   https://www.youtube.com/watch?v=4nsGhYjfRsw
// others:   https://www.youtube.com/watch?v=EGczypeSQEg
// indian guy:   https://www.youtube.com/watch?v=UFHR38VfDkU
// patric rogers (good simple example for real site):   https://www.youtube.com/watch?v=VTCB6WQCJI8

// npm install @pnp/logging @pnp/common @pnp/odata @pnp/sp --save
import { sp } from '@pnp/sp';
import {IListItem} from './IListItem'

/*
const getRealSPData(): void {

  //  alternative to getting remote date?
  //  const w = new Web("https://{publishing site url}");
  //  w.lists.getByTitle("Pages").items
  // here we will load the current web's title
  sp.web.lists.getByTitle("Customers").items.select("Title", "Id").orderBy("Modified", true).get().then((item: any) => {
    console.log(item);
    alert("Hi!");
  });

}
*/

//Standard oob
export interface IGetListDataReactWebPartProps {
  description: string;
}

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
/*
  public render(): void {

    // A simple loading message
    this.domElement.innerHTML = `Loading...`;

    sp.web.select("Title").get().then(w => {

        this.domElement.innerHTML = `Web Title: ${w.Title}`;
    });
}
*/
  //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
  public render(): void {
    const element: React.ReactElement<IGetListDataReactProps > = React.createElement(
      GetListDataReact,{
        loadListItems: this.loadListItems
      }
    );
    ReactDom.render(element, this.domElement);
  }

  //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
  private async loadListItems(): Promise<IListItem[]> {
    /* Filtering example of same one and only retreiving certain columns
    const result:IListItem[] = await sp.web.lists.getByTitle("Customers").items
    .select("Title","CustomerID").filter("Title eq 'GM'").orderBy("Id",true).getAll()
    */

    const result:IListItem[] = await sp.web.lists.getByTitle("Customers").items
      .orderBy("Id",true).getAll()
    return(result);
  }


//Standard oob from here down.
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    }
  }
}
