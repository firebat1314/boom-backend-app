import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sss-dragon',
  templateUrl: './dragon.page.html',
  styleUrls: ['./dragon.page.scss'],
})
export class DragonPage implements OnInit {
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
      this.apiServ.gameDetail({}, { urlParam: this.id }).subscribe(data => {
        if (data && data.code === 0) {
          this.dataList = data.list;
        }
      })
    });
  }
}
