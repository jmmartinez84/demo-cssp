import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';
import { EnvironmentType } from '@microsoft/sp-client-base';
import 'reflect-metadata';
require('zone.js');
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import styles from './LinksModule.module.scss';
import * as strings from 'linksModuleStrings';
import { ILinksModuleWebPartProps } from './ILinksModuleWebPartProps';

import { PsaLinksModule } from './PsaLinks/PsaLinksModule';

export default class LinksModuleWebPart extends BaseClientSideWebPart<ILinksModuleWebPartProps> {

  public constructor(context: IWebPartContext) {
     const platform = platformBrowserDynamic();
      platform.bootstrapModule(PsaLinksModule);
       super(context);
  }

  public render(): void {
     if (this.renderedOnce === false) {
       if (this.context.environment.type === EnvironmentType.Local) {
         this.domElement.innerHTML = `<psa-links-webpart class="${styles.linksModule}">`;
       }else{
          this.domElement.innerHTML = `<psa-links-webpart class="${styles.linksModule}" data-url="${this.context.pageContext.web.absoluteUrl}">`;
       }

     }
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
    };
  }
}
