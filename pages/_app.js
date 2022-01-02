// all styles
// font
import "../styles/fontiran.css";
// bootstarap
import "../styles/bootstrap.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "../styles/globals.scss";
import "../styles/layout.scss";
import "../styles/navbar.scss";
import "../styles/mobile_navbar.scss";
import "../styles/sidebar.scss";
import "../styles/content.scss";
import "../styles/ticket.scss";
import "../styles/dashboard.scss";
import "../styles/tickets.scss";
import "../styles/ticket_details.scss";
import "../styles/content_single.scss";
// auth styles
import "../styles/auth_global.scss";
// details layout styles
import "../styles/add_details.scss";
import "../styles/channel_single.scss";
import "../styles/order_details.scss";
// modal style
import "../styles/modal.scss";
// calendar
import "../styles/calendar.scss";
// new styles
import "../styles/add_channel.scss";

// chart
import "@antv/xflow/dist/index.css";

// finance
import "../styles/incomes.scss";
import "../styles/bank_account.scss";
import "../styles/settelments.scss";
import "../styles/settelment_details.scss";
// state view
import "../styles/stateview.scss";
// ant design global styles
import "../styles/ant_globals.scss";
// table
import "../styles/table.scss";

import { Provider } from "mobx-react";
import { ConfigProvider } from "antd";
// import { ProviderProvider } from 'extras/context/ProviderContext'
import { I18nextProvider } from "react-i18next";
import i18n from "../i18next";
import initializeStore from "extras/controllers/globalStore";

function MyApp({ Component, pageProps, mobxStore }) {
  const isServer = typeof window === "undefined";
  const mobxStores = isServer
    ? mobxStore
    : initializeStore(isServer, mobxStore);

  return (
    <Provider coreProviderStore={mobxStores}>
      <I18nextProvider i18n={i18n}>
        <ConfigProvider direction="rtl">
          <Component {...pageProps} direction="rtl" />
        </ConfigProvider>
      </I18nextProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { Component, router, ctx, req, props } = appContext;
  let pageProps = {};
  const query = ctx.query;
  if (Component.getInitialProps) {
    pageProps = Component.getInitialProps(ctx);
  }
  const mobxStore = initializeStore();
  appContext.ctx.mobxStore = mobxStore;
  // const appProps = MyApp.getInitialProps(appContext)
  return { pageProps, query, mobxStore: mobxStore }; // mobxStore: mobxStore,
};

export default MyApp;
