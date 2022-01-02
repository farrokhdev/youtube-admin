const { redirect } = require("next/dist/next-server/server/api-utils");

// const withTM = require("next-transpile-modules")([
//   "@fullcalendar/common",
//   "@babel/preset-react",
//   "@fullcalendar/common",
//   "@fullcalendar/daygrid",
//   "@fullcalendar/interaction",
//   "@fullcalendar/react",
//   // '@fullcalendar/timegrid',
// ]);

module.exports = {
  future: {
    webpack5: false,
  },
  images: {
    domains: ["yt3.ggpht.com", "192.168.1.10", "helpx.adobe.com"],
  },
  async redirects() {
    return [
      { source: "/", destination: "/provider/dashboard", permanent: true }, // a permanent redirect
    ];
  },

  async rewrites() {
    return [
      {
        source: "/provider/channel_single/:id",
        destination: "/provider/channel_single",
      },
      {
        source: "/provider/order_single/:id",
        destination: "/provider/order_single",
      },
      {
        source: "/provider/content_single/:id",
        destination: "/provider/content_single",
      },
      {
        source: "/provider/ticket_details/:id",
        destination: "/provider/ticket_details",
      },
      {
        source: "/provider/settelment_details/:id",
        destination: "/provider/settelment_details",
      },
      {
        source: "/provider/channel_single/:id/:channel_id/add_content",
        destination: "/provider/add_content",
      },
    ];
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.s[ac]ss$/i,
  //       use: [
  //         // Creates `style` nodes from JS strings
  //         'style-loader',
  //         // Translates CSS into CommonJS
  //         'css-loader',
  //         // Compiles Sass to CSS
  //         'sass-loader',
  //       ],
  //     },
  //   ],
  // },
  options: {
    lessOptions: {
      // If you are using less-loader@5 please spread the lessOptions to options directly
      modifyVars: {
        "primary-color": "#5f6368",
        "link-color": "#1DA57A",
        "border-radius-base": "2px",
      },
      javascriptEnabled: true,
    },
  },
};
