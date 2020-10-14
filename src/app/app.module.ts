import { FeedComponent } from '@core/feed/feed.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { UserDetailsComponent } from '@components/user-details/user-details.component';
import { EditPostComponent } from '@components/edit-post/edit-post.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    UserDetailsComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
