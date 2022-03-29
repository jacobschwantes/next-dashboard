import DefaultLayout from "../layouts/DefaultLayout";
import { useSession } from "next-auth/react";

export default function App() {
  const { data: session, status } = useSession();
  return (
    <div>
        settings
    </div>
  );
}

App.Layout = DefaultLayout;
