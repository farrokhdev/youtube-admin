import {
  BorderOuterOutlined,
  CreditCardOutlined,
  DollarOutlined,
  FileOutlined,
  HomeOutlined,
  NotificationOutlined,
  SettingOutlined,
  StepBackwardOutlined,
} from "@ant-design/icons";
import {
  BsFillBarChartFill,
  BsFillPieChartFill,
  BsBorderStyle,
} from "react-icons/bs";
import { FcFlowChart, FcLineChart, FcNegativeDynamic } from "react-icons/fc";
import { GiProgression } from "react-icons/gi";
import { FaVideo } from "react-icons/fa";
import { GrChannel, GrInProgress } from "react-icons/gr";

export const MenuItems = [
  {
    id: 0,
    title: "داشبرد",
    icon: <HomeOutlined />,
    url: "/provider/dashboard",
  },
  {
    id: 1,
    title: "تنظیمات",
    icon: <SettingOutlined />,
    url: "",
    submenus: [
      {
        id: "10",
        title: "ویرایش کاربر",
        url: "/provider/auth/account_update",
      },
      {
        id: "11",
        title: "تغییر کلمه عبور ",
        url: "/provider/auth/change_password",
      },
    ],
  },
  {
    id: 2,
    title: "کانال ها",
    icon: <GrChannel />,
    url: "",
    submenus: [
      {
        id: "20",
        title: "لیست کانال ها",
        url: "/provider/channels",
      },
      {
        id: "21",
        title: "اضافه کردن",
        url: "/provider/add_channel",
      },
    ],
  },
  {
    id: 3,
    title: "ویدیوها",
    icon: <FaVideo />,
    url: "/provider/allcontents",
  },
  {
    id: 4,
    title: "سفارشات",
    icon: <BsBorderStyle />,
    url: "/provider/orders",
  },
  {
    id: 5,
    title: "امور مالی",
    icon: <DollarOutlined />,
    url: "",
    submenus: [
      {
        id: "30",
        title: "در آمد ها",
        url: "/provider/incomes",
      },
      {
        id: "31",
        title: "حساب بانکی",
        url: "/provider/bank_account",
      },
      {
        id: "32",
        title: "تسویه حساب",
        url: "/provider/settelments",
      },
    ],
  },
  {
    id: 6,
    title: "تیکت ها",
    icon: <CreditCardOutlined />,
    url: "/provider/tickets",
  },
  {
    id: 7,
    title: "اعلانات",
    icon: <NotificationOutlined />,
    url: "/provider/notifications",
  },
];
