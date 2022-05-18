import ProjectCard3 from "../projects/ProjectCard3"

export default function ProjectCards(props) {
  
  return (
    <div>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      >
        {props.projects.map((project) => {
          return (
           <ProjectCard3 session={props.session} project={project} />
          );
        })}
      </ul>
    </div>
  );
}
