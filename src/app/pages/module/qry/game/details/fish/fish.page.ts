import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'sss-fish',
  templateUrl: './fish.page.html',
  styleUrls: ['./fish.page.scss'],
})
export class FishPage implements OnInit {
  id: string;
  type: string;
  dataList: any;
  item: string;

  constructor(
    private apiServ: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      this.item = params.get('item');
      console.log(JSON.parse(decodeURIComponent(this.item)))
      /* this.apiServ.gameDetail({}, { urlParam: this.id }).subscribe(data => {
        if (data && data.code === 0) {
          this.dataList = data.list;
        }
      }) */
    });
  }

}
