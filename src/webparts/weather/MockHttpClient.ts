import {CurrentWeather} from './Interfaces';


export default class MockHttpClient {

    private static _item: CurrentWeather ={
                                  "coord": {
                                    "lon": 2.21,
                                    "lat": 49.04
                                  },
                                  "weather": [{
                                    "id": 800,
                                    "main": "snow",
                                    "description": "snow",
                                    "icon": "13d"
                                  }],
                                  "base": "stations",
                                  "main": {
                                    "temp": -5,
                                    "pressure": 1019,
                                    "humidity": 81,
                                    "temp_min": 18.33,
                                    "temp_max": 22.22
                                  },
                                  "wind": {
                                    "speed": 6.92,
                                    "deg": 238
                                  },
                                  "dt": 1475153395,
                                  "id": 3033098,
                                  "name": "Bessancourt",
                                  "cod": 200
                                };

    public static get(restUrl: string, options?: any): Promise<CurrentWeather> {
    return new Promise<CurrentWeather>((resolve) => {
            resolve(MockHttpClient._item);
        });
    }
}