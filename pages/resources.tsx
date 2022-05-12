import DefaultLayout from "../layouts/DefaultLayout";
import { useSession } from "next-auth/react";


export default function App() {
  const { data: session, status } = useSession();
  return (
    <div className="px-4 py-4 xl:px-10">
      <h1>Resources</h1>
    </div>
  );
}

App.Layout = DefaultLayout;
