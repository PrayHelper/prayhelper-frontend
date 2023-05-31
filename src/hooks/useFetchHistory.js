import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";
import { getFetcher, refresh } from "./api";
import { useMutation } from "react-query";

const getHis = async (accessToken, params) => {
  return await getFetcher('/history', {
    Authorization: accessToken,
  }, params);
};

export const useFetchHistory = (params) => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  const { mutate: fetchHistoryMutate } = useMutation(() => {
    return getHis(accessToken, params)}, {
      onError: (e) => {
        if (e.status === 403) {
          const data = refresh();
          if (typeof(data) === "string")
            setAccessToken(data);
        }
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
      },
      retry: (cnt) => {
        return cnt < 1;
      },
      retryDelay: 300,
    });

  return { fetchHistoryMutate };
}