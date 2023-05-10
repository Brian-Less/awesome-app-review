import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _searchText: BehaviorSubject<string> = new BehaviorSubject<string>("");

  get searchText$(): Observable<string>
  {
    return this._searchText.asObservable();
  }

  set searchText(value: string)
  {
    this._searchText.next(value);
  }

  private _posts: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    {
      author: "John Doe",
      createdTime: "2022-02-14 12:00:00",
      description: "This some is my first post! something",
      mensionCount: 52,
      commentCount: 12,
      shareCount: 4,
      picture: "assets/img/team-1-800x800.jpg",
      imageUrl: "assets/img/post-1.jpg"
    },
    {
      author: "Jane Smith",
      createdTime: "2022-02-15 09:30:00",
      description: "Check out this awesome photo some I took!",
      mensionCount: 812,
      commentCount: 123,
      shareCount: 152,
      picture: "assets/img/team-2-800x800.jpg",
      imageUrl: "assets/img/post-2.jpg"
    },
    {
      author: "Bob Johnson",
      createdTime: "2022-02-16 16:45:00",
      description: "Just finished a great workout! some",
      mensionCount: 12,
      commentCount: 45,
      shareCount: 38,
      picture: "assets/img/team-3-800x800.jpg",
      imageUrl: "assets/img/post-3.jpg"
    }
  ]);

  get posts$(): Observable<any[]>
  {
    return this._posts.asObservable();
  }

  constructor() { }
}
