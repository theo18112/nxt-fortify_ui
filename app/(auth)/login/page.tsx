"use client";
import AlertSuccess from "@/components/AlertSuccess";
import Card from "@/components/Card";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ searchParams }: any) {
  const { login } = useAuth({ middleware: "guest", redirectIfAuthenticated: "/dashboard" });

  const [errors, setErrors] = useState<any>([]);
  const [status, setStatus] = useState<string>("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: { target: { name: string; value: any } }) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login({ setErrors, setStatus, ...form }).then((r) => r);
  };

  useEffect(() => {
    if (searchParams?.status) {
      setStatus(searchParams?.status);
    } else {
      setStatus("");
    }
  }, [status]);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Login</Card.Title>
        <Card.Subtitle>
          Login to your account,{" "}
          <Link href="/register" className={"text-white underline"}>
            Register
          </Link>{" "}
          {/* eslint-disable react/no-unescaped-entities */}
          if you don't have an account
        </Card.Subtitle>
      </Card.Header>

      {status && status === "password-reset-success" && <AlertSuccess>Your password has been reset successfully. You can now login with your new password</AlertSuccess>}

      <form onSubmit={submit}>
        <div className="mb-5">
          <InputLabel htmlFor={"email"}>Email</InputLabel>
          <TextInput onChange={onChange} value={form.email} name="email" type={"email"} id={"email"} />
          <InputError message={errors?.email} />
        </div>

        <div className="mb-5">
          <InputLabel htmlFor={"password"}>Password</InputLabel>
          <TextInput onChange={onChange} value={form.password} name="password" type={"password"} id={"password"} />
          <InputError message={errors?.password} />
        </div>
        <div className="flex items-center justify-end gap-x-3">
          <Link className={"text-smoke-400 underline"} href={"/forgot-password"}>
            Forgot Password
          </Link>
          <PrimaryButton>Login</PrimaryButton>
        </div>
      </form>
    </Card>
  );
}
