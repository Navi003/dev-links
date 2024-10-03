import { redirect } from "next/navigation";

export default function Home() {
  // Redirect the user to /main/links
  redirect("/main/links");
}
