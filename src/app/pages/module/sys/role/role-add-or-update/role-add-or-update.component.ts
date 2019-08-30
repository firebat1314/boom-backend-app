import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ApiService } from 'src/app/providers/api.service';
import { NzTreeNodeOptions, NzFormatEmitEvent } from 'ng-zorro-antd/core/public-api';
import { NzTreeComponent } from 'ng-zorro-antd/tree';
import { menuList } from './menu-list';

@Component({
  selector: 'sss-role-add-or-update',
  templateUrl: './role-add-or-update.component.html',
  styleUrls: ['./role-add-or-update.component.scss'],
})
export class RoleAddOrUpdateComponent implements OnInit {

  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent: NzTreeComponent;
  defaultCheckedKeys = ['10020'];
  defaultSelectedKeys = ['10010'];
  defaultExpandedKeys = ['100', '1001'];

  menuList: NzTreeNodeOptions[] = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          disabled: true,
          children: [
            { title: 'leaf 1-0-0', key: '10010', disableCheckbox: true, isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [
            { title: 'leaf 1-1-0', key: '10020', isLeaf: true },
            { title: 'leaf 1-1-1', key: '10021', isLeaf: true }
          ]
        }
      ]
    }
  ];

  formData = {
    roleName: '',
    remark: ''
  }
  searchValue = '';
  constructor(
    public modalController: ModalController,
    private popupServ: PopupService,
    public apiServ: ApiService
  ) {
  }

  ngOnInit() {
    this.menuList = this.treeDataTranslate(menuList, 'menuId', 'parentId');
    /* this.apiServ.sysMenuList().subscribe(data => {
      this.menuList = data;
    }) */
  }
  dismiss() {

  }
  submit() {

  }

  treeDataTranslate(data, id, pid) {
    var res = []
    var temp = {}
    for (var i = 0; i < data.length; i++) {
      temp[data[i][id]] = data[i]
    }
    for (var k = 0; k < data.length; k++) {
      data[k].title = data[k].name;
      data[k].key = data[k][id];
      if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
        if (!temp[data[k][pid]]['children']) {
          temp[data[k][pid]]['children'] = []
        }
        if (!temp[data[k][pid]]['_level']) {
          temp[data[k][pid]]['_level'] = 1
        }
        data[k]['_level'] = temp[data[k][pid]]._level + 1;
        temp[data[k][pid]]['children'].push(data[k])
      } else {
        res.push(data[k])
      }
    }
    return res
  }
  nzClick(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {
    console.log(keys, this.nzTreeComponent.getSelectedNodeList());
  }


  ngAfterViewInit(): void {
    // get node by key: '10011'
    console.log(this.nzTreeComponent.getTreeNodeByKey('10011'));
    // use tree methods
    console.log(
      this.nzTreeComponent.getTreeNodes(),
      this.nzTreeComponent.getCheckedNodeList(),
      this.nzTreeComponent.getSelectedNodeList(),
      this.nzTreeComponent.getExpandedNodeList()
    );
  }
}
