import Wrapper, { SessionContext } from "../components/Wrapper";

export default function App() {
  return (
    <Wrapper title="Notes" active="notes">
      <SessionContext.Consumer>
        {(session) => <h1>{session.user.email}</h1>}
      </SessionContext.Consumer>
    </Wrapper>
  );
}