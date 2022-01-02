import MainModel from "./MainModel";
import { makeObservable, observable } from "mobx";

export default class ChannelModel extends MainModel {
  loading = false;
  id = "";
  channelId = "";
  is_activated = "";
  description = "";
  title = "";
  thumbnail = "";
  view_count = "";
  subscriber_count = "";
  video_count = "";
  created_at = "";
  price_ads = "";
  price_suggestion = "";
  grade = "";
  price_from = "";
  price_to = "";
  // add = ''
  published_at = "";

  // channel = []

  category = {};
  provider;
  contents;
  page = "";
  contents_total = "";

  constructor() {
    super();
    makeObservable(this);
  }
}
