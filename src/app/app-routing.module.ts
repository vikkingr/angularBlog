import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { LoginComponent } from './login/login.component';
import { RguardService } from './services/rguard.service';
import { ViewPostsComponent } from './view-posts/view-posts.component';

const routes: Routes = [
  {
    path: 'CreateUser',
    component: CreateUserComponent
  },
  {
    path: 'CreatePost',
    component: CreatePostComponent,
    canActivate: [RguardService]
  },
  {
    path: 'EditPost',
    component: EditPostComponent,
    canActivate: [RguardService]
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: '',
    component: ViewPostsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
