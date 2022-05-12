import {useProject} from "../../../../lib/utils";
import TeamCards from "../../../../components/projects/TeamCards";
import { useRouter } from "next/router";
import ProjectLayout from "../../../../layouts/ProjectLayout";
export default function App (props) {
    const router = useRouter();
    const { projectId } = router.query;
    const { project, isLoading, error } = useProject(projectId);
    return isLoading ? "loading" : (
        <TeamCards data={project} />
    )
}
App.Layout = ProjectLayout;