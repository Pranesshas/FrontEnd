import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MapComponent } from './user-map/map/map.component';
import { ShowTableComponent } from './show-table/show-table.component';
import { HeaderComponent } from './header/header.component'
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AssetTypeComponent } from './asset-details/asset-type/asset-type.component';
import { UserMapComponent } from './user-map/user-map.component';

const routes: Routes = [ { path: 'showTables', component: ShowTableComponent },
{path : 'header' , component : HeaderComponent},
// {path : 'contact-form' , component : ContactFormComponent},
{path : 'assets' , component : AssetDetailsComponent},
{path : 'map/:assetId' , component : MapComponent},
{path : 'home' , component : HomeComponent},
{path : 'user/:userId' , component : UserComponent},
{path : 'asset/assetType' , component : AssetTypeComponent},
{path : 'userMap' , component : UserMapComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

   
}
