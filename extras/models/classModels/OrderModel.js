import MainModel from "./MainModel";
import { makeObservable, observable, makeAutoObservable } from "mobx";

export default class OrderModel {
  id = "";
  order_number = "";
  date_from = "";
  date_to = "";
  amount = "";
  status = "";
  created_at = "";
  content = {};
  description = "";
  video_link = "";
  days = "";
  user = {};

  constructor() {
    // super()
    makeAutoObservable(this);
  }

  setVals = (data) => {
    try {
      Object.keys(data).map((item, key) => {
        if (this[item] !== undefined) {
          this[item] = data[item];
        } else {
          // console.log(item)
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  setVal = (key, val) => {
    if (this[key] != undefined) {
      this[key] = val;
    }
  };
}
