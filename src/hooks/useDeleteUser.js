import { useMutation } from "react-query";
import useApi from './useApi';

export const useDeleteUser = () => {
  const { deleteFetcher } = useApi();
  return useMutation(async (data) => {
    return await deleteFetcher('/user/withdrawal')
  }, {
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (res) => {
      console.log(res);
    },
    retry: (cnt) => {
      return cnt < 3;
    },
    retryDelay: 300,
    refetchOnWindowFocus: false,
  });
}