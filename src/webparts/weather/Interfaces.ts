export interface CurrentWeather {
    coord: Coord;
    weather: WeatherUnit[];
    base: string;
    main:Main;
    wind:Wind;
    dt:number;
    id:number;
    name:string;
    cod:number;
}
export interface Coord {
  lon:number;
  lat:number;
}
export interface WeatherUnit {
  id:number;
  main:string;
  description:string;
  icon:string;
}
export interface Main{
  temp:number;
  pressure:number;
  humidity:number;
  temp_min:number;
  temp_max:number;
}
export interface Wind{
  speed:number;
  deg:number;
}