import { postFetcher, refresh, usePostFetcher } from "./api";
import { useMutation } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";

const postCheckPassword = (data, accessToken) => {
  return postFetcher('/user/check/pw', data, {
    Authorization: accessToken,
  });
};

export const useCheckPassword = (data) => {
  const accessToken = useRecoilValue(tokenState);
  const setAccessToken = useSetRecoilState(tokenState);
  return useMutation(() => {
    postCheckPassword(data, accessToken)}, {
      onError: (e) => {
        if (e.status === 403) {
          const data = refresh();
          if (typeof(data) === "string")
            setAccessToken(data);
        }
        console.log(e);
      },
      onSuccess: (data) => {
        console.log(data);
        alert("성공");
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 1000,
    });
};
