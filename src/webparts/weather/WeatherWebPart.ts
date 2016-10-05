import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-client-preview';
import {CurrentWeather} from './Interfaces';
import MockHttpClient from './MockHttpClient';
import { EnvironmentType } from '@microsoft/sp-client-base';

import styles from './Weather.module.scss';
import * as strings from 'weatherStrings';
import { IWeatherWebPartProps } from './IWeatherWebPartProps';

export default class WeatherWebPart extends BaseClientSideWebPart<IWeatherWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.weather}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ${styles.weatherWhite} ${styles.row} ${styles.background}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
            <div>
              <h1> ${this.properties.description} </h1>
            </div>
            <hr/>
            <div id="currentWeather">
            </div>
          </div>
        </div>
        <h1>Hello world</h1>
      </div>`;
    this._renderInfoAsync();
  }
  private _renderInfoAsync(): void {
    // Local environment
    if (this.context.environment.type === EnvironmentType.Local) {
        this._getMockWeather().then((response) => {
          this._renderInfo(response);
        }); }
        else {
        this._getWeather(this.properties.city)
        .then((response) => {
             this._renderInfo(response);
        });
    }
  }
  private _getMockWeather(): Promise<CurrentWeather> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl)
        .then((data: CurrentWeather) => {
             var currentWeather: CurrentWeather = data;
             return currentWeather;
         }) as Promise<CurrentWeather>;
  }
  private _renderInfo(currentWeather:CurrentWeather){
     const currentWeatherContainer: Element = this.domElement.querySelector('#currentWeather');
     let html: string = '';
     html+=this._renderContainerLeft(currentWeather);
     html+=this._renderContainerRight(currentWeather);
     currentWeatherContainer.innerHTML = html;
  };
  private _renderContainerLeft(currentWeather:CurrentWeather){
    const IconUrl = this._getIconUrl(currentWeather.weather[0].icon);
    const RenderHtml:string = `<div class="${styles.contentLeft} ${styles.block}">
                <div>
                  <h3 class="ms-font-l ${styles.city}">${this.properties.city}</h3>
                </div>
                <div class="${styles.block}">
                  <img class="${styles.mainImage}" src="${IconUrl}">
                </div>
            </div>`;
    return RenderHtml;
  }
  private _renderContainerRight(currentWeather: CurrentWeather){
    const Temp:number = parseInt(currentWeather.main.temp+'');
    const MinTemp:number = parseInt(currentWeather.main.temp_min+'');
    const MaxTemp:number = parseInt(currentWeather.main.temp_max+'');
    const RenderHtml:string = `<div class="${styles.contentRight} ${styles.block} ${styles.mainInfo}">
                <div class="${styles.block}">
                  <div class="${styles.mainStatus}">${currentWeather.weather[0].description}</div>
                  <div class="${styles.temp}">${Temp}º C</div>
                  <div class="${styles.tempRange}">${MinTemp}/${MaxTemp}</div>
                </div>
              </div>
              <div>
              </div>
            </div>`;
    return RenderHtml;
  }
  private _getIconUrl(icoCode:string){
    let Result:string = '';
    const DictIcons = {
      "01d":"ico-soleado.png",
      "01n":"ico-soleado.png",
      "02d":"ico-solnubes.png",
      "02n":"ico-solnubes.png",
      "03d":"ico-nublado.png",
      "03n":"ico-nublado.png",
      "04d":"ico-nublado.png",
      "04n":"ico-nublado.png",
      "09d":"ico-lluvia.png",
      "09n":"ico-lluvia.png",
      "10d":"ico-lluviasol.png",
      "10n":"ico-lluviasol.png",
      "11d":"ico-tormenta.png",
      "11n":"ico-tormenta.png",
      "13d":"ico-nieve.png",
      "13n":"ico-nieve.png",
      "50d":"ico-niebla.png",
      "50n":"ico-niebla.png",

    };
    Result+='img/'+ DictIcons[icoCode];
    return Result;
}
private _getWeather(location:string): any {
  const URL:string = `http://api.openweathermap.org/data/2.5/weather?q=` +location+ `&appid=9bc2bd76b4934d8169ecd056ff9df740&&units=metric`;
  var myHeaders = new Headers();

  var myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

  return fetch(URL,myInit)
  .then((response: Response) => {
  return response.json();
  }).catch(error=>{
    console.log(error);
  });
}
  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('city',{
                  label: strings.CitiesFieldLabel,
                  isDisabled: false,
                  options: [
                    { key: 'Vigo', text: 'Vigo'},
                    { key: 'Paris', text: 'Paris' },
                    { key: 'Bessancourt', text: 'Bessancourt' }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }

}



