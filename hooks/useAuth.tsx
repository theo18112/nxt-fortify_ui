"use client";
import axios from "@/lib/axios";
import useSwr from "swr";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface useAuthProps {
  middleware?: string;
  redirectIfAuthenticated?: string;
}

interface ErrorType {
  setErrors: (error: any) => void;
}

interface StatusType {
  setStatus: (status: string) => void;
}

interface LoginProps extends ErrorType, StatusType {}
interface ForgotPasswordProps extends ErrorType, StatusType {
  email: string;
}

interface ResetPasswordProps extends ErrorType {}

export default function useAuth({ middleware, redirectIfAuthenticated }: useAuthProps = {}) {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSwr("/api/user", () =>
    axios("api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 403) throw error;
        router.push("/verify-email");
      })
  );

  const csrf = () => axios("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }: ErrorType) => {
    try {
      await csrf();
      await axios.post("/register", props);
      await mutate();
    } catch (error: any) {
      if (error?.response?.status !== 422) throw error;
      setErrors(error?.response?.data?.errors);
    }
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout");
      await mutate();
    }

    window.location.pathname = "/login";
  };

  const login = async ({ setErrors, setStatus, ...props }: LoginProps) => {
    setErrors([]);
    setStatus("");
    try {
      await csrf();
      await axios.post("/login", props);
      await mutate();
    } catch (error: any) {
      if (error?.response?.status !== 422) throw error;
      setErrors(error?.response?.data?.errors);
    }
  };

  const resendEmailVerification = async ({ setStatus }: StatusType) => {
    const response = await axios.post("/email/verification-notification");

    if (response.status === 202) {
      setStatus("verification-link-sent");
    }
  };

  const forgotPassword = async ({ setErrors, setStatus, email }: ForgotPasswordProps) => {
    await csrf();
    setErrors([]);
    setStatus("");

    try {
      await axios.post("/forgot-password", { email });
      setStatus("password-reset-link-sent");
    } catch (error: any) {
      if (error?.response?.status !== 422) throw error;
      setErrors(error?.response?.data?.errors);
    }
  };

  const resetPassword = async ({ setErrors, ...props }: ResetPasswordProps) => {
    await csrf();
    setErrors([]);

    try {
      await axios.post("/reset-password", props);
      await mutate();
      router.push("/login?status=password-reset-success");
    } catch (error: any) {
      if (error?.response?.status !== 422) throw error;
      setErrors(error?.response?.data?.errors);
    }
  };

  useEffect(() => {
    if (middleware == "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }

    if (location.pathname === "/verify-email" && user?.email_verified_at) {
      if (redirectIfAuthenticated) {
        router.push(redirectIfAuthenticated);
      }
    }

    if (middleware == "auth" && error) {
      logout().then((r) => r);
    }
  }, [user, error]);

  return {
    register,
    logout,
    login,
    resendEmailVerification,
    forgotPassword,
    resetPassword,
    user,
    mutate,
  };
}
