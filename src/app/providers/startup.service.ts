import { Injectable } from '@angular/core';
import {  } from '@ionic/storage';
import { StorageService } from './storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(
    public storage: StorageService,
  ) { }

  load() {
    return this.storage.getToken();
  }
}
