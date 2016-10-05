declare interface IWeatherStrings {
  PropertyPaneDescription: string;
  PropertyPaneCity: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  CitiesFieldLabel: string;
}

declare module 'weatherStrings' {
  const strings: IWeatherStrings;
  export = strings;
}
