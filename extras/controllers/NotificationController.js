import React, { Component } from "react";
import { DataService } from "extras/api";
import { makeAutoObservable } from "mobx";
import StateView from "extras/components/StateView/StateView";
import NotificationModel from "extras/models/classModels/NotificationModel";
import Router from "next/router";
import { message } from "antd";

export default class NotificationController {
  loading = false;
  notList = [];

  stateview = StateView.State.loading;

  constructor() {
    makeAutoObservable(this);
  }

  // get All notifications
  onsuccessNotList = (res) => {
    this.loading = false;
    const list = [];
    console.log(res.data);

    res.data.items.map((item) => {
      const model = new NotificationModel();
      model.setVals(item);
      list.push(model);
    });
    this.notList = list;
    console.log(this.notList);
    this.stateview = StateView.State.content;
  };

  onerrorNotList = (e) => {
    this.loading = false;
    console.log(e);
    this.stateview = StateView.State.error;
  };

  getNotList = (data = {}, router = "allNotifications") => {
    this.loading = true;

    this.stateview = StateView.State.loading;

    DataService.fetchData(
      data,
      router,
      this.onsuccessNotList,
      this.onerrorNotList
    );
  };
  // get notification count
  onsuccessNotCount = (res, callback) => {
    this.loading = false;
    if (res.data) {
      callback(res.data.notifications);
      // message.success("اعلانات جدید");
    }
  };

  onerrorNotCount = (e) => {
    this.loading = false;
    console.log(e);
  };

  getNotCount = (callback, data = {}, router = "notCount") => {
    this.loading = true;
    this.stateview = StateView.State.loading;

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessNotCount(res, callback),
      this.onerrorNotCount
    );
  };
}
