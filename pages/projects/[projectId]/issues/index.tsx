import Issues from "../../../../components/projects/Issues";
import ProjectLayout from "../../../../layouts/ProjectLayout";
import { useProject } from "../../../../lib/utils";
import { useRouter } from "next/router";

export default function App (props) {
    const router = useRouter();
    const { projectId } = router.query;
    const { project, isLoading, error } = useProject(projectId);
    return isLoading ? "loading" : (
       <Issues projectId={projectId} data={project}/> 
    )
}
App.Layout = ProjectLayout