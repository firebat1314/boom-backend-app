import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sss-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  item: any;
  index: any;
  name: any;
  nick: any;
  channelId: any;
  totalUse: any;
  useGold: any;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.index = params.get('index');
      this.item = JSON.parse(decodeURIComponent(params.get('item')));
      this.name = params.get('name');
      this.nick = params.get('nick');
      this.channelId = params.get('channelId');
      this.useGold = params.get('useGold');

      this.item.variationGold = this.item.variationGold / 100.0;
      this.item.originalGold = this.item.originalGold / 100.0;
      this.item.lastGold = this.item.lastGold / 100.0;
      // ---扑克---
      this.totalUse = null;
      if (this.item.children) {
        for (let i = 0; i < this.item.children.length; i++) {
          this.item.children[i].gold =
            this.item.children[i].gold / 100.0;
          this.item.children[i].variationGold =
            this.item.children[i].variationGold / 100.0;
          if (this.item.gameType == 4 || this.item.gameType == 5 || this.item.gameType == 6
            || this.item.gameType == 7 || this.item.gameType == 9 || this.item.gameType == 14
            || this.item.gameType == 16 || this.item.gameType == 17) {
            this.totalUse += this.item.children[i].gold; //.toFixed(2)
          } else if (this.item.gameType == 3) {
            this.totalUse = this.item.children[i].gold;
          } else if (this.item.gameType == 8 || this.item.gameType == 13) {
            if (this.item.children[i].roleId == -1) {
              this.totalUse = this.item.children[i].gold;
            }
          } else if (this.item.gameType == 10 || this.item.gameType == 15) {
            this.totalUse = this.useGold
          } else if (this.item.gameType == 11) {
            this.totalUse = 0
          } else if (this.item.gameType == 12) {
            if (this.item.children[i].name.split('-')[1] == '自己') {
              this.totalUse = this.item.children[i].gold;
            }
          } else {
            this.totalUse = this.item.children[i].gold;
          }
        }
        //水果中奖线与中奖水果
        if (this.item.gameType == 3) {
          this.item.children.forEach(be => {
            let cardType = be.cardType;
            if (cardType) {
              let match = cardType.match(/\{(.+?)\}/);
              let str = match ? match[1] : "";
              let arr = str.split(",");
              let lines = [];
              let fruits = [];
              for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                let line = item.split(":")[0];
                let fruit = item.split(":")[1];
                lines.push(line);
                fruits.indexOf(fruit) < 0 ? fruits.push(fruit) : null;
              }
              be.fruits = fruits;
              be.lines = lines;
              console.log(fruits, lines);
            }
          });
        }
      }
    });
  }

}
