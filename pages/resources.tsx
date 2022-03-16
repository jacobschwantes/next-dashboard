import DefaultLayout from "../layouts/DefaultLayout";
import { useSession } from "next-auth/react";
export default function App() {
const { data: session, status } = useSession();
  return (
  <h1>resources</h1>
  );
}

App.Layout = DefaultLayout
