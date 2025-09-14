import Link from "next/link";
import Section from "@/components/Section/Section";
import { fetchUser } from "@/lib/api/serverApi";

export default async function Profile() {
  // 1. запит за юзером і рендер
  // 2. рендер користувача
  // 3. Редагування

  const data = await fetchUser();

  return (
    <>
      <Section>
        <h1>Profile Page</h1>
        <div>{data.username}</div>
        <div>{data.email}</div>
        <Link href="/profile/edit">Edit</Link>
      </Section>
    </>
  );
}
