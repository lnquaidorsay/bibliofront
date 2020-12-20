import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooklistComponent } from './booklist/booklist.component';
import { LoginComponent } from './login/login.component';
import { MypageComponent } from './mypage/mypage.component';
import { ProductComponent } from './product/product.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'books',
    component: BooklistComponent
  },
  {
    path: 'menu',
    component: MypageComponent
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
