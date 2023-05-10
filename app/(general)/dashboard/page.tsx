"use client";
import Container from "@/components/Container";
import useAuth from "@/hooks/useAuth";

export default function Page() {
  const { user } = useAuth({ middleware: "auth" });
  return <Container>Hello, {user?.name} This is your dashboard</Container>;
}
