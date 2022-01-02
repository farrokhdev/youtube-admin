import MainModel from "extras/models/classModels/MainModel";
import { makeAutoObservable, makeObservable } from "mobx";
import StateView from "extras/components/StateView/StateView";
import { DataService } from "extras/api";
import Router from "next/router";
import { message } from "antd";

export default class DashboardController {
  constructor() {
    // super()
    makeAutoObservable(this);
  }

  response = false;
  loading = false;
  dashboardList = [];
  dashboardOrders = [];
  stateview = StateView.State.loading;

  // GET DASHBOARD LIST
  //_______________________

  onsuccessDashboardList = (res) => {
    this.loading = false;
    this.dashboardList = res.data.counts;
    this.dashboardOrders = res.data.orders;
    this.stateview = StateView.State.content;
  };

  onerrorDashboardList = (e) => {
    this.loading = false;
    console.log(e);
    message.error(e.error);
    Router.push("/provider/auth/login");
    // this.stateview = StateView.State.error;
  };

  getDashboardList = (data = {}, router = "dashboard") => {
    this.loading = true;
    this.stateview = StateView.State.loading;

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessDashboardList(res),
      this.onerrorDashboardList
    );
  };
}
