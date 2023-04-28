import { Component, OnInit, AfterViewInit } from "@angular/core";
import { PostService } from "app/services/post.service";
import Chart from "chart.js";

@Component({
  selector: "app-post-chart",
  templateUrl: "./posts-chart.component.html",
})
export class PostChartComponent implements OnInit {
  constructor(private _postService: PostService) {}

  ngOnInit() {}
  ngAfterViewInit() {

    this._postService.posts$.subscribe(posts => {

      var config = {
        type: "line",
        data: {
          labels: [
            "Comments",
            "Shares",
            "Mension"
          ],
          datasets: posts.map(post => {

            let color = Math.floor(Math.random()*16777215).toString(16);

            return {
              label: post.author,
              data: [post.commentCount, post.shareCount, post.mensionCount],
              backgroundColor: "#" + color,
              borderColor: "#" + color,
              fill: false
            };
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

      let ctx: any = document.getElementById("post-chart") as HTMLCanvasElement;
      ctx = ctx.getContext("2d");
      new Chart(ctx, config);

    });
  }
}
