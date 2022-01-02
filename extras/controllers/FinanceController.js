import MainModel from "extras/models/classModels/MainModel";
import { makeAutoObservable, makeObservable } from "mobx";
import StateView from "extras/components/StateView/StateView";
import { DataService } from "extras/api";
import { Router } from "next/router";
import IncomesModel from "extras/models/classModels/FinanceModels/InComesModel";
import WalletModel from "extras/models/classModels/FinanceModels/WalletModel";
import CardModel from "extras/models/classModels/FinanceModels/CardModel";
import SettelmentModel from "extras/models/classModels/FinanceModels/SettelmentModel";
import { message } from "antd";

export default class FinanceController {
  constructor() {
    // super()
    makeAutoObservable(this);
  }

  response = false;
  loading = false;

  inComesList = [];
  allIncomes;
  settelmentList = [];
  wallet = new WalletModel();
  card = new CardModel();
  settelment = new SettelmentModel();

  success;

  stateview = StateView.State.loading;

  onsuccessAll = () => {
    this.stateview = StateView.State.content;
  };

  // GET All Incomes
  //_______________________

  onsuccessGetIncomes = (res) => {
    const incomes = [];
    this.loading = false;

    res.data.items.map((item) => {
      const model = new IncomesModel();
      model.setVals(item);
      incomes.push(model);
    });
    this.allIncomes = res.data.sum;
    this.inComesList = incomes;

    this.stateview = StateView.State.content;
  };

  onerrorGetIncomes = (e) => {
    this.loading = false;
    console.log(e);
    this.stateview = StateView.State.error;
  };

  getIncomes = (data = {}, router = "getIncomes") => {
    this.loading = true;
    this.stateview = StateView.State.loading;

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessGetIncomes(res),
      this.onerrorGetIncomes
    );
  };
  // GET WALLET INFOs
  //_______________________

  onsuccessGetWallet = (res) => {
    this.loading = false;

    this.wallet.setVals(res.data);
    this.stateview = StateView.State.content;
  };

  onerrorGetWallet = (e) => {
    this.loading = false;
    console.log(e);
    this.stateview = StateView.State.error;
  };

  getWalletInfo = (data = {}, router = "getWallet") => {
    this.loading = true;
    this.stateview = StateView.State.loading;

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessGetWallet(res),
      this.onerrorGetWallet
    );
  };
  // GET CARD INFOs
  //_______________________

  onsuccessGetCard = (res) => {
    this.loading = false;
    if (res.data) {
      this.card.setVals(res.data.item);
    }

    this.stateview = StateView.State.content;
  };

  onerrorGetCard = (e) => {
    this.loading = false;
    console.log(e);
    this.stateview = StateView.State.error;
  };

  getCardInfo = (data = {}, router = "getCard") => {
    this.loading = true;
    this.stateview = StateView.State.loading;

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessGetCard(res),
      this.onerrorGetCard
    );
  };
  // ADD CARD
  //_______________________

  onsuccessAddCard = (res, callback) => {
    this.loading = false;
    callback();
    this.stateview = StateView.State.content;
  };

  onerrorAddCard = (e) => {
    this.loading = false;
    console.log(e);
    this.stateview = StateView.State.error;
  };

  addCard = (data = {}, callback, router = "addCard") => {
    this.loading = true;
    this.stateview = StateView.State.loading;

    DataService.sendData(
      data,
      router,
      (res) => this.onsuccessAddCard(res, callback),
      this.onerrorAddCard
    );
  };
  // UPDATE CARD
  //_______________________

  onsuccessUpdateCard = (res, callback) => {
    this.loading = false;

    if (res.data) {
      message.success("بروزرسانی اطلاعات بانکی با موفقیت انجام شد");
      callback();
      // this.stateview = StateView.State.content;
    }
  };

  onerrorUpdateCard = (e) => {
    this.loading = false;

    message.error(e.data.error);

    this.stateview = StateView.State.error;
  };

  updateCard = (data = {}, callback, router = "updateCard") => {
    this.loading = true;
    this.stateview = StateView.State.loading;

    DataService.sendData(
      data,
      router,
      (res) => this.onsuccessUpdateCard(res, callback),
      this.onerrorUpdateCard
    );
  };
  // GET SETTELMENT LIST
  //_______________________

  onsuccessGetSettelmentList = (res) => {
    this.loading = false;
    let setlist = [];

    res.data.items.map((item) => {
      const model = new SettelmentModel();
      model.setVals(item);
      setlist.push(model);
    });

    this.settelmentList = setlist;

    // this.stateview = StateView.State.content
  };

  onerrorGetSettelmentList = (e) => {
    this.loading = false;
    console.log(e);
    this.stateview = StateView.State.error;
  };

  getSettelmentList = (data = {}, router = "getSettelmentList") => {
    this.loading = true;
    this.stateview = StateView.State.loading;

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessGetSettelmentList(res),
      this.onerrorGetSettelmentList
    );
  };
  // GET SETTELMENT VIEW
  //_______________________

  onsuccessGetSettelmentRequestView = (res) => {
    this.loading = false;
    this.settelment.setVals(res.data.item);
    this.stateview = StateView.State.content;
  };

  onerrorGetSettelmentRequestView = (e) => {
    this.loading = false;
    console.log(e);
    this.stateview = StateView.State.error;
  };

  getSettelmentView = (data = {}, router = "getSettelmentRequestView") => {
    this.loading = true;
    this.stateview = StateView.State.loading;

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessGetSettelmentRequestView(res),
      this.onerrorGetSettelmentRequestView
    );
  };
  // POST SETTELMENT REQUEST
  //_______________________

  onsuccessPostSettelmentRequest = (res) => {
    this.loading = false;
    this.success = res.success;
    if (res.data) {
      message.success("تصویه حساب با موفقیت انجام شد");
    }
    // this.stateview = StateView.State.content;
  };

  onerrorPostSettelmentRequest = (e) => {
    this.loading = false;
    console.log(e);
    message.error(e.message);
    // this.stateview = StateView.State.error;
  };

  postSettelment = (data = {}, router = "postSettelmentRequest") => {
    this.loading = true;
    // this.stateview = StateView.State.loading;

    DataService.sendData(
      data,
      router,
      (res) => this.onsuccessPostSettelmentRequest(res),
      this.onerrorPostSettelmentRequest
    );
  };
}
