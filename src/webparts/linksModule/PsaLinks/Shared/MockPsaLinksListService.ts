import { Injectable } from '@angular/core';
import { ISPPersonalLink } from './ISPPersonalLink';
import { Observable }from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class MockPsaLinksListService {
  items:ISPPersonalLink[] = [
    {
      ID:1,
      Title:'MockItem1',
      Link_x0020_category:'Category1',
      Link_x0027_s_x0020_web_x0020_add:{
        Url:'http://MockItem1',
        Description:'http://MockItem1'
      },
      Order0:0
    },
    {
      ID:2,
      Title:'MockItem2',
      Link_x0020_category:'Category1',
      Link_x0027_s_x0020_web_x0020_add:{
        Url:'http://MockItem2',
        Description:'http://MockItem2'
      },
      Order0:1
    },
    {
      ID:3,
      Title:'MockItem3',
      Link_x0020_category:'Category1',
      Link_x0027_s_x0020_web_x0020_add:{
        Url:'http://MockItem3',
        Description:'http://MockItem3'
      },
      Order0:2
    },
    {
      ID:4,
      Title:'MockItemA',
      Link_x0020_category:'Category2',
      Link_x0027_s_x0020_web_x0020_add:{
        Url:'http://MockItemA',
        Description:'http://MockItemA'
      },
      Order0:0
    },
    {
      ID:5,
      Title:'MockItemB',
      Link_x0020_category:'Category2',
      Link_x0027_s_x0020_web_x0020_add:{
        Url:'http://MockItemB',
        Description:'http://MockItemB'
      },
      Order0:1
    }
  ];
  constructor() {

   }

  getLinks():Observable<ISPPersonalLink[]>{

    return Observable.of(this.items);
  };
}