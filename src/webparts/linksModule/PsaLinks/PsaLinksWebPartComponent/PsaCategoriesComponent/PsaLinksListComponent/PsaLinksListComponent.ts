import { Component, OnInit, Input  } from '@angular/core';
import {ISPPersonalLink} from './../../../Shared/ISPPersonalLink'

@Component({
  selector: 'psa-links-list',
  templateUrl: '$BASEURL$PsaLinks/PsaLinksWebPartComponent/PsaCategoriesComponent/PsaLinksListComponent/PsaLinksListComponent.html'
})
export class PsaLinksListComponent implements OnInit {
  @Input() links:ISPPersonalLink[] = [];
  constructor() { }

  ngOnInit() { }
}