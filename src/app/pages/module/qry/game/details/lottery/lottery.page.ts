import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';

@Component({
  selector: 'sss-lottery',
  templateUrl: './lottery.page.html',
  styleUrls: ['./lottery.page.scss'],
})
export class LotteryPage implements OnInit {

  id: string;
  type: string;
  dataList: any;

  constructor(
    private apiServ: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      this.type = params.get('type');
      this.apiServ.gameDetail({}, { url: '/qry/game/detail/' + this.id }).subscribe(data => {
        if (data && data.code === 0) {
          this.dataList = data.list;
        }
      })
    });
  }

}
