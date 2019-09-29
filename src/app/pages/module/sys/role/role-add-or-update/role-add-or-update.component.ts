import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { PopupService } from "src/app/providers/popup/popup.service";
import { ApiService } from "src/app/providers/api.service";
import {
  NzTreeNodeOptions,
  NzFormatEmitEvent
} from "ng-zorro-antd/core/public-api";
import { NzTreeComponent } from "ng-zorro-antd/tree";
import { menuList } from "./menu-list";

@Component({
  selector: "sss-role-add-or-update",
  templateUrl: "./role-add-or-update.component.html",
  styleUrls: ["./role-add-or-update.component.scss"]
})
export class RoleAddOrUpdateComponent implements OnInit {
  @Input() roleId: any;
  @ViewChild("nzTreeComponent", { static: false })
  nzTreeComponent: NzTreeComponent;
  defaultCheckedKeys = [];
  defaultExpandedKeys = [];

  menuList: NzTreeNodeOptions[] = [];

  formData = {
    roleName: "",
    remark: ""
  };
  searchValue = "";
  roleInfo: any;
  constructor(
    public modalController: ModalController,
    private popupServ: PopupService,
    public apiServ: ApiService
  ) {}

  ngOnInit() {
    // this.menuList = this.treeDataTranslate(menuList, "menuId", "parentId");
    this.apiServ.sysMenuList().subscribe(data => {
      data.menuList.length &&
        (this.menuList = this.treeDataTranslate(
          data.menuList,
          "menuId",
          "parentId"
        ));
      this.roleId &&
        this.apiServ
          .sysRoleInfo({}, { urlParam: this.roleId })
          .subscribe(data => {
            if (data && data.code === 0) {
              this.roleInfo = data.role;
              this.formData.roleName = data.role.roleName;
              this.formData.remark = data.role.remark;
              this.defaultCheckedKeys = data.role.menuIdList;
              this.defaultExpandedKeys = data.role.menuIdList;
            }
          });
    });
  }
  dismiss(data?) {
    this.modalController.dismiss(data);
  }
  submit() {
    this.apiServ[this.roleId ? "sysRoleUpdate" : "sysRoleSave"]({
      roleId: this.roleId || undefined,
      roleName: this.formData.roleName,
      remark: this.formData.remark,
      menuIdList: this.defaultCheckedKeys
    }).subscribe(data => {
      if (data && data.code === 0) {
        this.popupServ.toast("操作成功");
        this.dismiss({ dismissed: true });
      }
    });
  }

  treeDataTranslate(data, menuId, parentId) {
    var res = [];
    var temp = {};
    data.forEach(item => {
      item.title = item.name + "-" + item[menuId];
      item.key = item[menuId];
      item.isLeaf = true;
      item.children = [];
      item._level = 1;
      temp[item[menuId]] = item;
    });
    data.forEach(item => {
      if (temp[item[parentId]] && item[menuId] !== item[parentId]) {
        item["_level"] = temp[item[parentId]]._level + 1;
        temp[item[parentId]]["children"].push(item);
        temp[item[parentId]].isLeaf = false;
      } else {
        item.isLeaf = false;
        res.push(item);
      }
    });
    return res;
  }
  nzClick(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event);
    this.defaultCheckedKeys = event.keys;
  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {
    // console.log(keys, this.nzTreeComponent.getSelectedNodeList());
  }
}
