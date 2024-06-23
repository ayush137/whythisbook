import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

export default async function Home() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  return <main className=""></main>;
}
