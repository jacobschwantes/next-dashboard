import Wrapper, { SessionContext } from "../components/Wrapper";

export default function App() {
  return (
    <Wrapper title="News" active="news">
      <SessionContext.Consumer>
        {(session) => (<h1>hello world</h1>)}
      </SessionContext.Consumer>
    </Wrapper>
  );
}