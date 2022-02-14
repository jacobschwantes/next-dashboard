import Wrapper, { SessionContext } from "../components/Wrapper";

export default function App() {
  return (
    <Wrapper title="CMS" active="cms">
      <SessionContext.Consumer>
        {(session) => <h1>hello world</h1>}
      </SessionContext.Consumer>
    </Wrapper>
  );
}
