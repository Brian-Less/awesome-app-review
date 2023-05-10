import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "app/services/post.service";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  
  @Input()
  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }

  private _color = "light";

  displayedColumns = ['author', 'createdTime', 'description', 'mensionCount','commentCount','shareCount','picture','imageUrl'];

  posts: any[] = [];

  constructor(private _postService: PostService) { }

  ngOnInit(): void {

    this._postService.posts$.subscribe(posts => {
      this.posts = posts;
    });

  }

}
