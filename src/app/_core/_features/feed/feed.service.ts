import { EventEmitter, Injectable } from '@angular/core';
import {Post, User} from './feed.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserDetailsComponent } from '@components/user-details/user-details.component';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  public posts$: EventEmitter<Array<Post>> = new EventEmitter<Array<Post>>();

  constructor(private _httpClient: HttpClient, private _modalService: BsModalService) { }

  public async getPosts(): Promise<void> {
    const posts: Array<Post> = await this._requestPosts().toPromise();

    this._emitPosts(posts);
  }

  public async getAndDisplayUserDetails(userId: number): Promise<void> {
    const user: User = await this._requestUser(userId).toPromise();

    this._showUserDetailsModal(user);
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

  private _showUserDetailsModal(user: User): void {
    const initialState = { _user: user };

    this._modalService.show(UserDetailsComponent, { initialState });
  }
}
