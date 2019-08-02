import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sss-popup-search',
  templateUrl: './popup-search.component.html',
  styleUrls: ['./popup-search.component.scss'],
})
export class PopupSearchComponent implements OnInit {

  @Input() showPopup: boolean = false;
  @Output() showPopupChange: EventEmitter<boolean> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  searchRequest() {
    this.submit.emit();
    this.cancel();
  }
  cancel() {
    this.showPopup = !this.showPopup;
    this.showPopupChange.emit(this.showPopup);
  }
}
