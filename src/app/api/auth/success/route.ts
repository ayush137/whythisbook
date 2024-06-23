import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id)
    throw new Error("something went wrong with authentication" + user);

  const dbUser = db.select().from(users).where(eq(users.id, user.id));

  if (!dbUser) {
    db.insert(users).values({
      firstName: user.given_name || "",
      lastName: user.family_name || "",
      email: user.email || "",
      id: user.id || "",
      image: user.picture,
    });
  }

  return NextResponse.redirect(process.env.KINDE_SITE_URL as string);
}
