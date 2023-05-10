import { Component, OnInit ,EventEmitter,Output } from "@angular/core";
import { PostService } from "app/services/post.service";



@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent implements OnInit{
@Output() onInput = new EventEmitter<string>();

constructor(private postService: PostService) {

}

ngOnInit(): void {
  
}

inputSearch(text: string){
  this.postService.searchText = text;
}


}
