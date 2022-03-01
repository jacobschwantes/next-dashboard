import DefaultLayout from "../layouts/DefaultLayout";
import { useSession } from "next-auth/react";
export default function App() {
const { data: session, status } = useSession();
  return (
  status.loading ? <h1>loading...</h1> : <h1>I am a template for new pages</h1>
  );
}

App.Layout = DefaultLayout