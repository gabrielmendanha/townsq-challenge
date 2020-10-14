import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { EditPostModalResponseParams } from '@components/edit-post/edit-post.models';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
})
export class EditPostComponent implements OnInit {

  public title: string;
  public body: string;

  private _onClose$: Subject<null>;
  public onResponse$: Promise<EditPostModalResponseParams>;

  constructor(private _bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this._initializeObservables();
  }

  public hide(): void {
    this._bsModalRef.hide();
  }

  public resolveAndHide(): void {
    this._onClose$.next();

    this.hide();
  }

  private _initializeObservables(): void {
    this._onClose$ = new Subject();
    this.onResponse$ = new Promise(resolve => {
      this._onClose$.subscribe(() => {
        resolve({ title: this.title, body: this.body });
      });
    });
  }

}
