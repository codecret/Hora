import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "../utils/fetch";
import { useLogoutUser } from "./useAuth";
import toast from "react-hot-toast";

async function getApprovalsAsync() {
  const { data } = await authFetch("/approvals");
  return data.approvals;
}

export function useGetApprovals() {
  const query = useQuery({
    queryKey: ["approvals"],
    queryFn: () => getApprovalsAsync(),
    keepPreviousData: true,
  });
  return query;
}

const approveRequestAsync = ({ id, type }) => {
  if (type === "reject") {
    return authFetch.delete(`/approvals/reject/${id}`);
  }
  return authFetch.delete(`/approvals/${id}`);
};
export const useApproveRequest = () => {
  const queryClient = useQueryClient();
  const logoutMutation = useLogoutUser();

  return useMutation({
    mutationFn: approveRequestAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error("UnAuthenticated User");
        logoutMutation.mutate();
      } else {
        toast.error(
          e.response?.data?.msg || "Error occurred sending deleting request."
        );
      }
    },
    onSuccess: () => {
      toast.success("Done.");
      queryClient.invalidateQueries(["approvals"]);
    },
  });
};
