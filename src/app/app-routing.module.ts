import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MypageComponent } from './mypage/mypage.component';
import { ProductComponent } from './product/product.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {
    path: 'menu',
    component: MypageComponent
  },
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'product',
    component: ProductComponent
  }
  
];

// const routes: Routes = [{
//   path: '',
//   component: DefaultComponent,
//   children: [{
//     path: '',
//     component: DashboardComponent
//   }, {
//     path: 'posts',
//     component: PostsComponent
//   }]
// }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
