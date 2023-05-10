"use client";
import AlertSuccess from "@/components/AlertSuccess";
import Card from "@/components/Card";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { SetStateAction, useState } from "react";

export default function Page() {
  const { forgotPassword } = useAuth({ middleware: "guest" });

  const [errors, setErrors] = useState<any>([]);
  const [status, setStatus] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    forgotPassword({ setErrors, setStatus, email }).then((r) => r);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Reset Password</Card.Title>
        <Card.Subtitle>
          {/* eslint-disable react/no-unescaped-entities */}
          Enter your email address and we'll send you a link to reset password
        </Card.Subtitle>
      </Card.Header>
      {status === "password-reset-link-sent" && <AlertSuccess>A password reset link has been sent to the email address</AlertSuccess>}

      <form onSubmit={submit}>
        <div className="mb-5">
          <InputLabel htmlFor={"email"}>Email</InputLabel>
          <TextInput onChange={(e: { target: { value: string } }) => setEmail(e.target.value)} value={email} name="email" type={"email"} id={"email"} />
          <InputError message={errors?.email} />
        </div>

        <div className="flex items-center justify-end gap-x-3">
          <PrimaryButton>Send password reset link</PrimaryButton>
        </div>
      </form>
    </Card>
  );
}
