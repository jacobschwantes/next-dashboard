import { CheckCircleIcon } from "@heroicons/react/solid";

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
  },
  {
    name: "Cody Fisher",
    title: "Product Directives Officer",
    role: "Owner",
    email: "cody.fisher@example.com",
  },
  // More people...
];
const tasks = [
  { name: "Create backend", completed: 7, total_tasks: 15 },
  { name: "Create front end wireframe", completed: 0, total_tasks: 15 },
  { name: "Create initial project objectives", completed: 3, total_tasks: 3 },
  { name: "Create backend", completed: 7, total_tasks: 15 },
  { name: "Create front end wireframe", completed: 0, total_tasks: 15 },
  { name: "Create initial project objectives", completed: 3, total_tasks: 3 },
  { name: "Create backend", completed: 7, total_tasks: 15 },
  { name: "Create front end wireframe", completed: 0, total_tasks: 15 },
  { name: "Create initial project objectives", completed: 3, total_tasks: 3 },
  { name: "Create backend", completed: 7, total_tasks: 15 },
  { name: "Create front end wireframe", completed: 0, total_tasks: 15 },
  { name: "Create initial project objectives", completed: 3, total_tasks: 3 },
];

export default function TaskTable(props) {
  return (
   
      
     
        
            <table className="min-w-full  divide-y divide-gray-200  ">
              <thead className="">
                <tr className="">
                  <th
                    scope="col"
                    className=" py-3 px-2 text-left text-sm font-medium text-gray-700"
                  >
                    Task
                  </th>
                  <th
                    scope="col"
                    className=" py-3 px-2 text-left text-sm font-medium text-gray-700  "
                  >
                    Members
                  </th>
                  <th
                    scope="col"
                    className=" py-3 px-2 text-left text-sm font-medium text-gray-700  "
                  >
                    Progress
                  </th>
                  <th
                    scope="col"
                    className=" py-3 px-2 text-left text-sm font-medium text-gray-700  "
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-2   py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className=" ">
                {tasks.sort((a, b) => (a.total_tasks - a.completed) - (b.total_tasks - b.completed)).map((task, ind) => (
                  <tr key={ind}>
                    <td className={" px-2 py-4 whitespace-nowrap text-sm font-medium flex items-center " + (task.total_tasks === task.completed ? " text-gray-500" : " text-gray-900")}>
                      {task.completed === task.total_tasks ? <CheckCircleIcon className="h-5 pr-1"/> : <span className="mr-1.5 h-4 w-4 rounded-full bg-white border border-gray-900"></span>}{task.name}
                    </td>
                    <td className=" px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                      {" "}
                      <div className="flex -space-x-2 overflow-hidden">
                        {props.project.members.map((item) => {
                          return (
                            <img
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src={item.image}
                              alt=""
                            />
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.completed + ' / ' + task.total_tasks}
                    </td>
                    <td className=" px-2 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                        <span className={"rounded-full px-3 py-1 " + (task.completed === 0 ? "bg-green-100 text-green-500" : task.completed === task.total_tasks ? "text-blue-500 bg-blue-100" : "bg-yellow-100 text-yellow-500")}>
                        {task.completed === 0 ? "Active" : task.completed === task.total_tasks ? "Completed" : "In-Progress"}</span>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         
      
    

  );
}
