import { Component, OnInit } from '@angular/core';
import { PostService } from "app/services/post.service";

@Component({
  selector: 'app-post-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {

  keywords = "";

  posts: any[] = [];

  constructor(private _postService: PostService) { }

  ngOnInit(): void {

    this._postService.posts$.subscribe(posts => {
      this.posts = posts;
    });

    this._postService.searchText$.subscribe(keywords => {
      this.keywords = keywords;
      
    }
    );

  }

}
