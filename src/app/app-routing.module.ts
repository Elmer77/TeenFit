import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'upload', loadChildren: './upload/upload.module#UploadPageModule' },
  { path: 'upload2', loadChildren: './upload2/upload2.module#Upload2PageModule' },
  { path: 'upload3', loadChildren: './upload3/upload3.module#Upload3PageModule' },
  { path: 'friends', loadChildren: './friends/friends.module#FriendsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
