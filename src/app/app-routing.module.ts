import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MypageComponent } from './mypage/mypage.component';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  {
    path: '',
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
