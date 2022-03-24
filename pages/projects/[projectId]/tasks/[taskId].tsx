import TaskBoard from '../../../../components/projects/TaskBoard';
import ProjectLayout from '../../../../layouts/ProjectLayout';
import Router, { useRouter } from 'next/router';
import { useProject } from '../../../../lib/utils';
const sampleTasks = [
    {
      group: "Completed",
      tasks: [
        {
          task: "Implement authentication",
          members: [
            {
              name: "Jacob Schwantes",
              image:
                "https://lh3.googleusercontent.com/a/AATXAJwnLnvk17d1sbwn7f1LNYre_d87AXvLc-zUdg3F=s96-c",
            },
            {
              name: "Aquas Motion",
              image:
                "https://lh3.googleusercontent.com/a-/AOh14GhLYOqpqb-0FA-K-6s0wnxq8G5vpGkqEz2i1WbjTQ=s96-c",
            },
          ],
          description:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
          priority: 0,
          subtasks: [
            {
              task: "Wireframe design",
              priority: 1,
              members: [],
              description:
                "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
            },
            {
              task: "get approval for base endpoints",
              priority: 0,
              members: [
                {
                  name: "Jacob Schwantes",
                  image:
                    "https://lh3.googleusercontent.com/a/AATXAJwnLnvk17d1sbwn7f1LNYre_d87AXvLc-zUdg3F=s96-c",
                },
              ],
              description:
                "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
            },
          ],
        },
        {
          task: "Implement authentication",
          priority: 3,
          members: [
            {
              name: "Jacob Schwantes",
              image:
                "https://lh3.googleusercontent.com/a/AATXAJwnLnvk17d1sbwn7f1LNYre_d87AXvLc-zUdg3F=s96-c",
            },
            {
              name: "Aquas Motion",
              image:
                "https://lh3.googleusercontent.com/a-/AOh14GhLYOqpqb-0FA-K-6s0wnxq8G5vpGkqEz2i1WbjTQ=s96-c",
            },
          ],
          description:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
          subtasks: [
            {
              task: "Wireframe design",
              complete: true,
              priority: 2,
              members: [],
              description:
                "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
            },
            {
              task: "get approval for base endpoints",
              complete: true,
              priority: 3,
              members: [
                {
                  name: "Jacob Schwantes",
                  image:
                    "https://lh3.googleusercontent.com/a/AATXAJwnLnvk17d1sbwn7f1LNYre_d87AXvLc-zUdg3F=s96-c",
                },
              ],
              description:
                "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
            },
          ],
        },
      ],
    },
    // More groups...
  ];
export default function App (props) {
    const router = useRouter();
    const { projectId } = router.query;
    const { project, isLoading, error } = useProject(`?id=${projectId}`);
    return (
        <TaskBoard  projectId={projectId} data={sampleTasks}/>
    )
}
App.Layout = ProjectLayout;