import { useRouter } from "next/router";
import DefaultLayout from "../../../../layouts/DefaultLayout";
import ProjectLayout from '../../../../layouts/ProjectLayout';
export default function App (props) {
    const router = useRouter()
    const { issueId } = router.query;
    return <h1>{issueId}</h1>
}
App.Layout = ProjectLayout;
