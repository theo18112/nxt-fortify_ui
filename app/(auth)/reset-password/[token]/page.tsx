"use client";

import { useState } from "react";
import Card from "@/components/Card";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import useAuth from "@/hooks/useAuth";
import InputError from "@/components/InputError";

export default function Page({ params, searchParams }: any) {
  const { resetPassword } = useAuth({ middleware: "guest" });
  const [errors, setErrors] = useState<any>([]);
  const [form, setForm] = useState({
    token: params.token,
    email: searchParams.email,
    password: "",
    password_confirmation: "",
  });

  const onChange = (e: { target: { name: any; value: any } }) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    resetPassword({ setErrors, ...form }).then((r) => r);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Reset Password</Card.Title>
        <Card.Subtitle>You can reset your password here</Card.Subtitle>
      </Card.Header>
      <form onSubmit={submit}>
        <div className="mb-5">
          <InputLabel htmlFor={"email"}>Email</InputLabel>
          <TextInput onChange={onChange} value={form.email} type={"email"} name="email" id={"email"} />
          <InputError message={errors.email} />
        </div>

        <div className="mb-5">
          <InputLabel htmlFor={"password"}>Password</InputLabel>
          <TextInput onChange={onChange} value={form.password} type={"password"} name="password" id={"password"} />
          <InputError message={errors.password} />
        </div>
        <div className="mb-5">
          <InputLabel htmlFor={"password_confirmation"}>Confirm Password</InputLabel>
          <TextInput onChange={onChange} value={form.password_confirmation} type={"password"} name="password_confirmation" id={"password_confirmation"} />
          <InputError message={errors.password_confirmation} />
        </div>
        <PrimaryButton>Reset Password</PrimaryButton>
      </form>
    </Card>
  );
}
