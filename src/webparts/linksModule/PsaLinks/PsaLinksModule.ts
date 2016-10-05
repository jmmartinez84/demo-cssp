import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { PsaLinksWebPartComponent } from './PsaLinksWebPartComponent/PsaLinksWebPartComponent';
import { PsaCategoriesComponent } from './PsaLinksWebPartComponent/PsaCategoriesComponent/PsaCategoriesComponent';
import { PsaLinksListComponent } from './PsaLinksWebPartComponent/PsaCategoriesComponent/PsaLinksListComponent/PsaLinksListComponent';
import { MockPsaLinksListService } from './Shared/MockPsaLinksListService';
import { PsaLinksListService } from './Shared/PsaLinksListService';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],

  providers: [MockPsaLinksListService, PsaLinksListService],
  declarations: [PsaLinksWebPartComponent, PsaCategoriesComponent, PsaLinksListComponent],
  bootstrap: [PsaLinksWebPartComponent],
})
export class PsaLinksModule { }
