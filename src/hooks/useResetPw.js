import { useMutation } from "react-query";
import useApi from './useApi';

export const useResetPw = (data) => {
  const { postFetcher } = useApi();
  return useMutation(async () => {
    return await postFetcher('/member/change-pw', data)
  }, {
    onError: (e) => {
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
}