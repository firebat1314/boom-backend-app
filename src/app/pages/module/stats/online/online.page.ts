import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ECharts } from 'echarts';
import * as eCharts from 'echarts';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';
import { ApiService } from 'src/app/providers/api.service';
import { IonRefresher, ModalController } from '@ionic/angular';
import { SearchPage } from './search/search.page';

@Component({
  selector: 'sss-online',
  templateUrl: './online.page.html',
  styleUrls: ['./online.page.scss'],
})
export class OnlinePage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild('eCharts') chart: ElementRef;
  myChart: any;
  onlineChartOption;

  formData = {
    date: '2019-07-08'
  }
  data: any;
  listServ: any;

  constructor(
    public apiServ: ApiService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.initLine();
    this.getDataList().subscribe();
  }
  //搜索弹窗
  async search() {
    let formData = this.formData;

    const modal = await this.modalController.create({
      component: SearchPage,
      componentProps: {
        formData: formData
      }
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data) {
        this.formData = data;
        this.listServ && this.listServ.unsubscribe();//取消搜索之前的接口请求
        this.listServ = this.getDataList().subscribe((res) => {
          if (res && res.code === 0) {
          } else {
          }
        });
      }
    });

    return await modal.present();
  }
  doRefresh(event?: any) {
    this.listServ = this.getDataList({}, { showLoading: false }).subscribe(res => {
      if (res && res.code === 0) {
      } else {
      }
    })
  }
  // 折线图
  initLine() {
    let element = this.chart.nativeElement;

    element.style.width = (document.body.clientWidth) + 'px';//设置容器宽度
    this.myChart = eCharts.init(element);
    // 指定图表的配置项和数据
    let onlineChartOption = {
      title: {
        // text: '实时在线曲线图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['时时彩', '水果乐园', '水浒传', '百人牛牛', '飞禽走兽', '奔驰宝马', '抢庄牛牛', '龙虎斗', '捕鱼', '斗地主']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false
        // axisLabel: {
        //     rotate: -90
        // }
      },
      yAxis: {
        type: 'value',
        scale: true,
        name: '人数',
        min: 0,
        boundaryGap: [0, 0.2],    //表示，在最小值下方扩展0%的空间，在最大值上方扩展100%空间，也就是范围是[0 , 100% * n]即y轴最小坐标为0，最大坐标为n
        minInterval: 1,        //下限的值
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          show: true //细实线背景开关
        }
      },
      series: [
        {
          name: '时时彩',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#1E9FFF' // 图标颜色
            }
          },
          lineStyle: {
            normal: {
              width: 3,  // 连线粗细
              color: '#1E9FFF'  // 连线颜色
            }
          }
        },
        {
          name: '水果乐园',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#FF5722' // 图标颜色
            }
          },
          lineStyle: {
            normal: {
              width: 3,  // 连线粗细
              color: '#FF5722'  // 连线颜色
            }
          }
        },
        {
          name: '水浒传',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#FCB900' // 图标颜色
            }
          },
          lineStyle: {
            normal: {
              width: 3,  // 连线粗细
              color: '#FCB900'  // 连线颜色
            }
          }
        },
        {
          name: '百人牛牛',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#11C26D' // 图标颜色
            }
          },
          lineStyle: {
            normal: {
              width: 3,  // 连线粗细
              color: '#11C26D'  // 连线颜色
            }
          }
        },
        {
          name: '飞禽走兽',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#17B3A3' // 图标颜色
            }
          },
          lineStyle: {
            normal: {
              width: 3,  // 连线粗细
              color: '#17B3A3'  // 连线颜色
            }
          }
        },
        {
          name: '奔驰宝马',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#997B71' // 图标颜色
            }
          },
          lineStyle: {
            normal: {
              width: 3,  // 连线粗细
              color: '#997B71'  // 连线颜色
            }
          }
        },
        {
          name: '抢庄牛牛',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#9463F7' // 图标颜色
            }
          },
          lineStyle: {
            normal: {
              width: 3,  // 连线粗细
              color: '#9463F7'  // 连线颜色
            }
          }
        },
        {
          name: '龙虎斗',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#F74584' // 图标颜色
            }
          },
          lineStyle: {
            normal: {
              width: 3,  // 连线粗细
              color: '#F74584'  // 连线颜色
            }
          }
        },
        {
          name: '捕鱼',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#FF0000' // 图标颜色
            }
          },
          lineStyle: {
            normal: {
              width: 3,  // 连线粗细
              color: '#FF0000'  // 连线颜色
            }
          }
        },
        {
          name: '斗地主',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#f0df1c' // 图标颜色
            }
          },
          lineStyle: {
            normal: {
              width: 3,  // 连线粗细
              color: '#f0df1c'  // 连线颜色
            }
          }
        }
      ]
    }

    this.onlineChartOption = onlineChartOption;

    this.myChart.setOption(onlineChartOption)
    window.addEventListener('resize', () => {
      this.myChart.resize()
    })

  }

  getDataList(data = {}, options?: HttpOptions) {
    return this.apiServ.statsOnline(Object.assign(this.formData, data), options).pipe(
      map((res) => {
        if (res && res.code === 0) {
          this.data = res;
          this.onlineChartOption.xAxis.data = res.hourList;
          this.onlineChartOption.series[0].data = res.lotteryCountList;
          this.onlineChartOption.series[1].data = res.heroCountList;
          this.onlineChartOption.series[2].data = res.bainiuCountList;
          this.onlineChartOption.series[3].data = res.heroCountList;
          this.onlineChartOption.series[4].data = res.animalCountList;
          this.onlineChartOption.series[5].data = res.carCountList;
          this.onlineChartOption.series[6].data = res.bankerniuCountList;
          this.onlineChartOption.series[7].data = res.dragonCountList;
          this.onlineChartOption.series[8].data = res.fishCountList;
          this.onlineChartOption.series[9].data = res.landlordList;
          this.myChart.setOption(this.onlineChartOption)
        }
        return res;
      }),
      finalize(() => {
        this.refresher.complete();//ajax完成时、发生错误或者取消订阅时取消刷新
      })
    )
  }
}
