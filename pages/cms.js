import DefaultLayout from "../layouts/DefaultLayout";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function App() {
  const { data: session, status } = useSession();
  const [preview, setPreview] = useState("");
  const [input, setInput] = useState("");
  const [fields, setFields] = useState([]);
  const getFields = () => {
    fetch("/api/cms/getinterface")
      .then((res) => res.json())
      .then((data) => setFields(data.fields));
  };

  return (
    <div>
      <button onClick={() => getFields()}>get img</button>
      {fields.map(item => {
        return <div>{JSON.stringify(item)}</div>
      })}
      <img src={preview}></img>
    </div>
  );
}

App.Layout = DefaultLayout;
