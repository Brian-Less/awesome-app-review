import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PostService } from "app/services/post.service";
import Chart from "chart.js";
import { debounceTime, filter } from "rxjs";

@Component({
  selector: "app-word-chart",
  templateUrl: "./word-chart.component.html",
})
export class WordChartComponent implements OnInit {
  
  posts = [];

  constructor(private _postService: PostService) { }

  ngOnInit() { 
    this._postService.searchText$
    .pipe(filter((value) => value.length > 0), debounceTime(500))
    .subscribe((value) => {

      const countArray = this.posts.reduce((acc, post) => {
        if (post.description.toLowerCase().includes(value.toLowerCase())) {
          acc.push({
            author: post.author,
            count:  (post.description.match(new RegExp(value, "gi")) || []).length
          });
          console.log((post.description.match(new RegExp(value, "gi")) || []));
          
        }
        else {
          acc.push({
            author: post.author,
            count:  0
          });
        }
        return acc;
      }, []);
      
      console.log(countArray);
      

      var config = {
        type: "bar",
        data: {
          labels: ["จำนวน"],
          datasets: countArray.map(array => {

            let color = Math.floor(Math.random() * 16777215).toString(16);

            return {
              label: array.author,
              data: [array.count],
              backgroundColor: "#" + color,
              borderColor: "#" + color,
              fill: false
            }
          })

        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Charts",
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Month",
                  fontColor: "white",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(0, 0, 0, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                  fontColor: "white",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(255, 255, 255, 0.15)",
                  zeroLineColor: "rgba(33, 37, 41, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
                
              },
            ],
          },
        },
      };

      console.log(config);
      
      let ctx: any = document.getElementById("word-chart") as HTMLCanvasElement;
      ctx = ctx.getContext("2d");
      new Chart(ctx, config);

    })
  }

  ngAfterViewInit() {

    this._postService.posts$.subscribe(posts => {
      this.posts = posts;
    });
  }


}
