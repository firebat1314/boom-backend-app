import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetGameNameByTypePipe } from './get-game-name-by-type/get-game-name-by-type.pipe';



@NgModule({
  declarations: [GetGameNameByTypePipe],
  imports: [
    CommonModule,
  ],
  exports: [
    GetGameNameByTypePipe
  ]
})
export class PipesModule { }
