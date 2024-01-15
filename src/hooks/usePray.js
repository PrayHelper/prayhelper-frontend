import { useQuery, useMutation } from "react-query";
import useApi from "./useApi";
import useToast from "./useToast";
import { ToastTheme } from "../components/Toast/Toast";

export const usePray = () => {
  const { getFetcher, postFetcher, putFetcher, deleteFetcher } = useApi();
  const { showToast } = useToast({});

  const { data, refetch: refetchPrayList } = useQuery(
    ["prayList", tabType],
    async (_, tabType) => {
      return await getFetcher(`/pray/?prayType=${tabType}`);
    },
    {
      onError: async (e) => {
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

  const { mutate: createPray } = useMutation(
    async (data) => {
      return await postFetcher("/pray", data);
    },
    {
      onError: async (e) => {
        console.log(e);
        showToast({
          message: e.response.data.message,
          theme: ToastTheme.ERROR,
        });
      },
      onSuccess: (res) => {
        console.log(res);
        showToast({
          message: "기도제목이 저장되었어요.",
          theme: ToastTheme.SUCCESS,
        });
        refetchPrayList("personal");
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: deletePray } = useMutation(
    async (data) => {
      return await deleteFetcher(`/pray/${data}`);
    },
    {
      onError: (e) => {
        console.log(e);
        showToast({
          message: e.response.data.message,
          theme: ToastTheme.ERROR,
        });
      },
      onSuccess: (res) => {
        console.log(res);
        showToast({
          message: "기도제목을 삭제했어요.",
          theme: ToastTheme.SUCCESS,
        });
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: completePray } = useMutation(
    async (data) => {
      return await putFetcher(`/pray/${data}/complete`);
    },
    {
      onError: async (e) => {
        console.log(e);
        showToast({
          message: e.response.data.message,
          theme: ToastTheme.ERROR,
        });
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

  const prayList = data?.data.data || [];

  return {
    prayList,
    refetchPrayList,
    createPray,
    deletePray,
    completePray,
  };
};