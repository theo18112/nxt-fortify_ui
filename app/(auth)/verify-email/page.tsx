"use client";
import AlertSuccess from "@/components/AlertSuccess";
import Card from "@/components/Card";
import PrimaryButton from "@/components/PrimaryButton";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

export default function Page() {
  const [status, setStatus] = useState<string>("");
  const { resendEmailVerification, logout } = useAuth({ redirectIfAuthenticated: "/dashboard", middleware: "auth" });
  const resend = () => {
    resendEmailVerification({ setStatus });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Verify your email address</Card.Title>
        <Card.Subtitle>To continue, please check your email for a verfication link</Card.Subtitle>
      </Card.Header>
      {status === "verification-link-sent" && <AlertSuccess>A new verification link has been sent to the email address</AlertSuccess>}
      <PrimaryButton onClick={resend}>Resend email verification link</PrimaryButton>
    </Card>
  );
}
