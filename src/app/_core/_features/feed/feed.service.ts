import { EventEmitter, Injectable } from '@angular/core';
import {Post, User} from './feed.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserDetailsComponent } from '@components/user-details/user-details.component';
import { EditPostComponent } from '@components/edit-post/edit-post.component';
import { EditPostModalResponseParams } from '@components/edit-post/edit-post.models';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  public posts$: EventEmitter<Array<Post>> = new EventEmitter<Array<Post>>();

  constructor(private _httpClient: HttpClient, private _modalService: BsModalService, private _bsModalRef: BsModalRef) { }

  public async getPosts(): Promise<void> {
    const posts: Array<Post> = await this._requestPosts().toPromise();

    this._emitPosts(posts);
  }

  public async getAndDisplayUserDetails(userId: number): Promise<void> {
    const user: User = await this._requestUser(userId).toPromise();

    this._showUserDetailsModal(user);
  }

  public async editPost(post: Post): Promise<void> {
    const { title, body } = post;

    const { title: newTitle, body: newBody } = await this._showEditPostModal(title, body);

    post.title = newTitle;

    post.body = newBody;
  }

  private _showEditPostModal(title: string, body: string): Promise<EditPostModalResponseParams> {
    const initialState = { title, body };

    this._bsModalRef = this._modalService.show(EditPostComponent, { initialState });

    return this._bsModalRef.content.onResponse$;
  }

  private _showUserDetailsModal(user: User): void {
    const initialState = { _user: user };

    this._modalService.show(UserDetailsComponent, { initialState });
  }

  private _requestPosts(): Observable<Array<Post>> {
    return this._httpClient.get<Array<Post>>('http://jsonplaceholder.typicode.com/posts');
  }

  private _requestUser(userId: number): Observable<User> {
    return this._httpClient.get<User>(`http://jsonplaceholder.typicode.com/users/${userId}`);
  }

  private _emitPosts(posts: Array<Post>): void {
    this.posts$.emit(posts);
  }
}
