import api from "./contacts";

export const fetchChannels = async (onSuccess, onError) => {
  try {
    const { data } = await api.get("channels");
    if (data) {
      onSuccess(data);
    }
  } catch (err) {
    onError(err);
  }
};
