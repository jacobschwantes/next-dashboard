import TaskBoard from "../../../../components/projects/TaskBoard";
import ProjectLayout from "../../../../layouts/ProjectLayout";
import Router, { useRouter } from "next/router";
import { Task } from "../../../../types/projects";
import { useTasks} from "../../../../lib/utils";
const sampleTask: Task = {
  name: "Implement authentication",
  team: [
    {
      name: "Jacob Schwantes",
      email: "jacobschwantes@outlook.com",
      image:
        "https://lh3.googleusercontent.com/a/AATXAJwnLnvk17d1sbwn7f1LNYre_d87AXvLc-zUdg3F=s96-c",
    },
    {
      name: "Aquas Motion",
      email: "aquasmotion@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a-/AOh14GhLYOqpqb-0FA-K-6s0wnxq8G5vpGkqEz2i1WbjTQ=s96-c",
    },
  ],
  description:
    "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  priority: 0,
  completed: false,
  comments: [],
  last_edit: 1648936776,
  created_at: 1648936776,
  subtasks: [
    {
      name: "Wireframe design",
      priority: 2,
      team: [],
      comments: [
        {
          author: {
            name: "Aquas Motion",
            email: "aquasmotion@gmail.com",
            image:
              "https://lh3.googleusercontent.com/a-/AOh14GhLYOqpqb-0FA-K-6s0wnxq8G5vpGkqEz2i1WbjTQ=s96-c",
          },
          created_at: 1648936776,
          body: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
          
        },
      ],
      created_at: 1648936776,
      last_edit: 1648936776,
      completed: false,
      description:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      name: "Get approval for base endpoints",
      priority: 3,
      team: [
        {
          name: "Jacob Schwantes",
          email: "jacobschwantes@outlook.com",
          image:
            "https://lh3.googleusercontent.com/a/AATXAJwnLnvk17d1sbwn7f1LNYre_d87AXvLc-zUdg3F=s96-c",
        },
      ],
      comments: [],
      created_at: 1648936776,
      last_edit: 1648936776,
      completed: false,
      description:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
  ],
};

// More groups...

export default function App(props) {
  const router = useRouter();
  const { projectId, taskId } = router.query;
  const { tasks, isLoading, error } = useTasks(projectId);

  return isLoading ? 'loading..' : <TaskBoard taskId={taskId} projectId={projectId} data={tasks.find(item => item._id === taskId)} />;
}
App.Layout = ProjectLayout;
