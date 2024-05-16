import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

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
    if (query.error) {
      if (state === "protected") {
        navigate("/login");
      }
      return;
    } else if (query.isSuccess) {
      if (state === "login") {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    }
  }, [query.isError, query.isSuccess, state]);

  return query;
}

const useLoginAuthAsync = ({ email, password }) => {
  return authFetch.post("/auth/login", {
    email,
    password,
  });
};

export const useLoginAuth = ({ setLoading }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: useLoginAuthAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error(t("Username or Password is wrong"));
      } else {
        toast.error(t("An error occurred"));
      }
      setLoading(false);
    },
    onSuccess: (response) => {
      if (response && response.status === 200) {
        toast.success(t("Login Success redirecting"));
      }
      queryClient.invalidateQueries(["user"]);
    },
  });
};

const registerAsync = ({ name, email, password }) => {
  return authFetch.post("/auth/createUser", {
    name,
    email,
    password,
  });
};
export const useRegisterUser = ({ setLoading, setValues }) => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: registerAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error(t("UnAuthenticated User Should Logout"));
        //TODO: LOGOUT
      } else if (e.response) {
        toast.error(e.response.data.msg);
      } else {
        toast.error(t("An error occurred"));
      }
      setLoading(false);
    },
    onSuccess: (response) => {
      if (response && response.status === 201) {
        toast.success(t("Register Success"));
        setTimeout(() => {
          setValues({ name: "", email: "", password: "", isMember: true });
        }, 2000);
      }
      setLoading(false);
    },
  });
};

const editProfileAsync = ({ formData }) => {
  return authFetch.post("/auth/editProfile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const useEditProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: editProfileAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error(t("UnAuthenticated User Should Logout"));
        //TODO: LOGOUT
      } else if (e.response) {
        toast.error(e.response.data.msg);
      } else {
        toast.error(t("An error occurred"));
      }
    },
    onSuccess: (response) => {
      if (response && response.status === 200) {
        toast.success(t("Profile Updated"));
      }
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export const logoutUserAsync = () => {
  return authFetch("/auth/logout");
};
export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUserAsync,
    onError: (e) => {
      toast.error(e.response.data.msg);
    },
    onSuccess: () => {
      navigate("/login");
      queryClient.clear();
      queryClient.removeQueries("user");
    },
  });
};
