import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

async function getAuthAsync() {
  const response = await authFetch.get("/auth/getCurrentUser");
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  const user = response.data.user;
  return user;
}

export function useGetAuth({ state }) {
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["user"],
    queryFn: () => getAuthAsync(),
    refetchOnReconnect: true,
    retry: false,
  });
  useEffect(() => {
    if (query.error && state !== "login" && state !== "register") {
      navigate("/login");
      return;
    } else if (query.isSuccess) {
      if (state === "login") {
        if (!query.data.isAdmin) {
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
    }
  }, [query.isError, query.isSuccess, state]);

  return query;
}
