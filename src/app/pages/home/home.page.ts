import { Component, ViewChild, ElementRef } from '@angular/core';

import * as eCharts from 'echarts';
import { ApiService } from 'src/app/providers/api.service';
import { EChartsResponsiveOption, EChartOption, ECharts } from 'echarts';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('eCharts', { static: false }) chart: ElementRef;
  onlineChartOption: any = {};
  myChart: ECharts;
  number: any;
  dataListDay: any;

  constructor(
    private api: ApiService
  ) {
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.initChart();
    this.getDataList();
    this.getShowToday();
  }
  getCurrentNumber() {
    this.api.online().subscribe((data) => {
      if (data && data.code === 0) {
        this.number = data.online
      }
    })
  }
  // 获取 今天 昨天
  getShowToday() {
    this.api.todayData().subscribe((data) => {
      if (data && data.code === 0) {
        let dataListDay = data.data;
        for (let i = 0; i < dataListDay.length; i++) {
          dataListDay[i].taToDay = dataListDay[i].taToDay / 100.0
          dataListDay[i].taYesterDay = dataListDay[i].taYesterDay / 100.0
          dataListDay[i].tToDay = dataListDay[i].tToDay / 100.0
          dataListDay[i].tYesterDay = dataListDay[i].tYesterDay / 100.0
        }
        this.dataListDay = dataListDay[0];
      }
    })
  }
  initChart() {
    let element = this.chart.nativeElement;

    element.style.width = (document.body.clientWidth) + 'px';//设置容器宽度
    this.myChart = eCharts.init(element);
    this.onlineChartOption = {
      title: {
        // text: '近两日数据曲线图'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          /*  label: {
             backgroundColor: '#6a7985'
           } */
        }
      },
      legend: {
        data: ['在线人数', '注册人数', '存款人数']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
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
        splitLine: {
          show: true //开启背景线条
        }
      },
      series: [
        {
          name: '在线人数',
          type: 'line',
          smooth: true,
          itemStyle: {//线条属性
            normal: {
              color: '#1E9FFF' // 图标颜色
            }
          },
          /*markPoint: { //标注最大值与最小值
            data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
            ]
          },*/
          label: { //显示值属性
            normal: {
              show: true,
              position: 'top'
            }
          },
          // areaStyle: { normal: {} },//曲线下色彩
        },
        {
          name: '注册人数',
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#FF5722' // 图标颜色
            }
          },
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          // areaStyle: { normal: {} },
        },
        {
          name: '存款人数',
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#FCB900' // 图标颜色
            }
          },
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          // areaStyle: { normal: {} },
        }
      ]
    }
    this.onlineChartOption.series
    this.myChart.setOption(this.onlineChartOption);
  }
  // 获取折线图列表
  getDataList() {
    this.api.diagram().subscribe((data) => {
      if (data && data.code === 0) {
        this.onlineChartOption.xAxis.data = data.hourList
        this.onlineChartOption.series[0].data = data.onlineCountList
        this.onlineChartOption.series[1].data = data.roleCountList
        this.onlineChartOption.series[2].data = data.payCountList
        this.myChart.setOption(this.onlineChartOption)
      }
    })
  }
}
