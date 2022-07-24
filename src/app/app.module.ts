import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ShowTableComponent } from './show-table/show-table.component';
import { FormsModule } from '@angular/forms';
// import { AssetsComponent } from './assets/assets/assets.component';
import { MapComponent } from './contact-form/map/map.component';
import { HeaderComponent } from './header/header.component';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AssetTypeComponent } from './asset-details/asset-type/asset-type.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ShowTableComponent,
    HeaderComponent,
    MapComponent,
    AssetDetailsComponent,
    HomeComponent,
    UserComponent,
    AssetTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
