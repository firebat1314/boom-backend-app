import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sss-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {

  activities: any;
  constructor(
    private apiServ: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(res => {
      let id = res.get('id')
      if (id) {
        this.apiServ.exchgInfo({}, { urlParam: id }).subscribe(res => {
          if (res && res.code === 0) {
            this.activities = res.logList
          }
        })
      }
    })
  }

}
