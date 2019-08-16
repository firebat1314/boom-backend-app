import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getGameNameByType'
})
export class GetGameNameByTypePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let name = '';
    switch (value) {
      case 0: name = '无'; break;
      case 1: name = '打地鼠'; break;
      case 2: name = '开心彩'; break;
      case 3: name = '水果'; break;
      case 4: name = '水浒传'; break;
      case 5: name = '百人牛牛'; break;
      case 6: name = '飞禽走兽'; break;
      case 7: name = '奔驰宝马'; break;
      case 8: name = '抢庄牛牛'; break;
      case 9: name = '龙虎斗'; break;
      case 10: name = '3D捕鱼'; break;
      case 11: name = '扫雷红包'; break;
      case 12: name = '斗地主'; break;
      case 13: name = '扎金花'; break;
      case 14: name = '百家乐'; break;
      case 15: name = '2D捕鱼'; break;
      case 16: name = '二八杠'; break;
      case 17: name = '红黑大战'; break;
      case 18: name = '视讯百家乐'; break;
      default:
        name = '未知游戏';
        break;
    }
    return name;
  }

}
