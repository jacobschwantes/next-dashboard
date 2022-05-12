import ProjectLayout from '../../../../layouts/ProjectLayout';
import Tasks from '../../../../components/projects/Tasks';
import { useRouter } from 'next/router';
import { useTasks } from '../../../../lib/utils';
export default function App () {
    const router = useRouter();
    const { projectId } = router.query;
    const { tasks, isLoading, error } = useTasks(projectId);
    return isLoading ? "loading" : (
       <Tasks projectId={projectId} data={tasks}/> 
    )
}
App.Layout = ProjectLayout;