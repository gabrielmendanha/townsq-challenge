import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { Post } from './feed.models';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  private _posts: Array<Post> = [];

  constructor(private _feedService: FeedService) { }

  async ngOnInit(): Promise<void> {
    this._initializeObservables();

    await this._initializeFeed();
  }

  public posts(): Array<Post> {
    return this._posts;
  }

  public async showUserDetails(userId: number): Promise<void> {
    await this._feedService.getAndDisplayUserDetails(userId);
  }

  private _initializeObservables(): void {
    this._feedService.posts$.subscribe((posts: Array<Post>) => {
      this._posts = posts;
    });
  }

  private async _initializeFeed(): Promise<void> {
    await this._feedService.getPosts();
  }

}
