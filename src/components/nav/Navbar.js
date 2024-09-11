import { createClient } from "@/utils/supabase/server";
import NavBarClient from "./NavBarClient";

export default async function NavBarServer() {
  const supabase = createClient();
  let user = null;
  let isConfirmed = false;

  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      if (error.name !== "AuthSessionMissingError") {
        console.error("Error fetching user:", error);
      }
    } else if (data.user) {
      user = data.user;
      isConfirmed = !!data.user.email_confirmed_at;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }

  console.log("Server: user", user);
  console.log("Server: isConfirmed", isConfirmed);

  return <NavBarClient user={user} isConfirmed={isConfirmed} />;
}