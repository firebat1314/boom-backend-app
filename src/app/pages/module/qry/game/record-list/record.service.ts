import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  // private crises$: BehaviorSubject<any> = new BehaviorSubject<any>(1);

  constructor(
    private apiServ: ApiService,
  ) { }

  getRecord(roleId, recordId, gameType) {
    return this.apiServ.qryGameNewDetail({
      roleId: roleId,
      recordId: recordId,
      gameType: gameType
    }).subscribe(data => {
      if (data && data.code === 0) {

      }
    });
  }
}
