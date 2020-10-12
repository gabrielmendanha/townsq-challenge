import { EventEmitter, Injectable } from '@angular/core';
import { Post } from './feed.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  public posts$: EventEmitter<Array<Post>> = new EventEmitter<Array<Post>>();

  constructor(private _httpClient: HttpClient) { }

  public async getPosts(): Promise<void> {
    const posts: Array<Post> = await this._requestPosts().toPromise();

    this._emitPosts(posts);
  }

  private _requestPosts(): Observable<Array<Post>> {
    return this._httpClient.get<Array<Post>>('http://jsonplaceholder.typicode.com/posts');
  }

  private _emitPosts(posts: Array<Post>): void {
    this.posts$.emit(posts);
  }
}
