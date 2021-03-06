import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component'
import { SidebarModule } from 'primeng/sidebar';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
//import { MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MypageComponent } from './mypage/mypage.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductComponent } from './product/product.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SuscribeComponent } from './suscribe/suscribe.component';
import { BooklistComponent } from './booklist/booklist.component';
import { BookComponent } from './book/book.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import { NgxSpinnerModule } from 'ngx-spinner';
//import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule } from '@angular/material';

@NgModule({
  entryComponents: [BookComponent],
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    MypageComponent,
    ProductComponent,
    WelcomeComponent,
    LoginComponent,
    SuscribeComponent,
    BooklistComponent,
    BookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    PanelModule,
    BrowserAnimationsModule,
    MenubarModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    PanelMenuModule,
    SidebarModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatSortModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
