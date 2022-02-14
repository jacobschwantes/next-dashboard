import { useRouter } from "next/router";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProjectBoard from "../../components/ProjectBoard";
import Wrapper, { SessionContext } from "../../components/Wrapper";
import { useProject } from "../../lib/utils";
export default function App() {
  const router = useRouter();
  const { pid } = router.query;
  console.log(pid);
  const { project, isLoading, error } = useProject(`?id=${pid}`);

  return (
    <Wrapper
      title={
        <Breadcrumbs
          pages={[
            { name: "Projects", href: "/projects", current: false },
            {
              name: project ? project.name : error ? "Error" : "Loading",
              href: `/projects/${pid}`,
              current: true,
            },
          ]}
        />
      }
      active="projects"
    >
      <SessionContext.Consumer>
        {(session) => (
          <div className="2xl:px-8 xl:px-3 px-3 py-4">
            {isLoading ? (
              "loading..."
            ) : error ? (
              error.info
            ) : (
              <ProjectBoard project={project} />
            )}
          </div>
        )}
      </SessionContext.Consumer>
    </Wrapper>
  );
}
