import React from "react";
import { Router } from "tg-resources";
import { SuperAgentResource as Resource } from "@tg-resources/superagent";

import Cookies from "js-cookie";

export function routerList() {
  return new Router(
    {
      //auth routes
      login: new Resource("auth/login"),
      register: new Resource("auth/register"),
      forgotPassword: new Resource("auth/forgot/email"),
      resetPassword: new Resource("auth/password/reset"),
      resendEmail: new Resource("auth/email/resend"),

      // channel route
      getSearchChannels: new Resource("channel/search"),
      getChannelDetails: new Resource("channel/view"),
      getShowChannelDetails: new Resource("channel/show"),
      getChannelContents: new Resource("channel/videos"),
      getChannelList: new Resource("channel/my-channels"),
      getAccounts: new Resource("account/info"),
      updateAccount: new Resource("account/update"),
      changePassword: new Resource("account/password-change"),
      addChannel: new Resource("channel/add"),
      deleteChannel: new Resource("channel/delete"),
      updateChannel: new Resource("channel/update"),
      // channel categories
      Categories: new Resource("category/list"),
      getVideo: new Resource(
        "/channel/videos?channelId=UCk1SpWNzOs4MYmr0uICEntg"
      ),
      // finance routes
      getIncomes: new Resource("finance/income"),
      getWallet: new Resource("finance/wallet"),
      getCard: new Resource("finance/card"),

      addCard: new Resource("finance/card-add"),
      updateCard: new Resource("finance/card-update"),
      getSettelmentList: new Resource("finance/settlement-request-list"),
      getSettelmentRequestView: new Resource("finance/settlement-request-view"),
      postSettelmentRequest: new Resource("finance/settlement-request"),

      // content routes
      addContent: new Resource("content/add"),
      allContents: new Resource("content/my-contents"),
      updateContent: new Resource("content/update"),
      deleteContent: new Resource("content/delete"),
      viewContent: new Resource("content/view"),

      // order routes
      orderList: new Resource("orders/list"),
      orderView: new Resource("orders/view"),
      orderAccept: new Resource("orders/accept"),
      events: new Resource("events"),

      // tickets routes
      getTickets: new Resource("ticket/list"),
      singleTicket: new Resource("ticket/view"),
      addTicket: new Resource("ticket/add"),
      uploadTicket: new Resource("ticket/upload"),
      replyTicket: new Resource("ticket/reply"),
      closeTicket: new Resource("ticket/close"),

      // notification routes
      allNotifications: new Resource("notification/list"),
      notCount: new Resource("notification/count"),

      // dashboard
      dashboard: new Resource("dashboard/list"),
    },
    {
      statusValidationError: 442,
      mutateError: (error, rawResponse, resource, requestConfig) => {
        let response = JSON.parse(error.responseText);
        if (error.statusCode === 401) _AuthenticationDo();
        return response;
      },
      apiRoot:
        "http://192.168.1.10/customers/youtube_panel/public/api/provider/",
      // 'http://94.139.165.200:8080/customers/youtube_panel/public/api/provider/',

      headers: {
        Authorization: "Bearer " + Cookies.get("tokenprovider"),
      },
    }
  );
}

export const _AuthenticationDo = () => {
  Cookies.clear();
  console.log("hi");
  localStorage.clear();
  location.replace("/login");
};
