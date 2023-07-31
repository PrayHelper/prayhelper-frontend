import { getFetcher } from "./api";
import { useQuery } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const getSharedList = async (getAccessToken, params) => {
  return await getFetcher(
    "/share",
    {
      Authorization: getAccessToken(),
    },
    params
  );
};

export const useFetchSharedList = (params) => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useQuery(
    ["SharedList", params],
    () => {
      return getSharedList(getAccessToken, params);
    },
    {
      onError: async (e) => {
        if (e.status === 403) {
          await refresh();
        }
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
    }
  );
};
