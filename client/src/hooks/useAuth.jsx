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
  // console.log(state);
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: useLoginAuthAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error("Username or Password is wrong");
      } else {
        toast.error("An error occurred");
      }
      setLoading(false);
    },
    onSuccess: (response) => {
      if (response && response.status === 200) {
        toast.success(`Login Success redirecting`);
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
  return useMutation({
    mutationFn: registerAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error("UnAuthenticated User Should Logout");
        //TODO: LOGOUT
      } else if (e.response) {
        toast.error(e.response.data.msg);
      } else {
        toast.error("An error occurred");
      }
      setLoading(false);
    },
    onSuccess: (response) => {
      if (response && response.status === 201) {
        toast.success("Register Success");
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

  return useMutation({
    mutationFn: editProfileAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error("UnAuthenticated User Should Logout");
        //TODO: LOGOUT
      } else if (e.response) {
        toast.error(e.response.data.msg);
      } else {
        toast.error("An error occurred");
      }
    },
    onSuccess: (response) => {
      if (response && response.status === 200) {
        toast.success("Profile Updated");
      }
      setTimeout(() => {
        navigate("/");
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
