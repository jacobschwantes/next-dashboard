import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  DotsHorizontalIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/solid";
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(async (res) => {
      if (res.ok) {
        return res
      } else {
        let text = await res.text();
        throw new Error(text);
      }
    })
    .catch((e) => {
      setCreateError(e.message);
      setLoading(false);
    });
  return response; // parses JSON response into native JavaScript objects
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  console.log(result);
  return result;
};
const createGroup = (name) => {
  return {
    id: name,
    tasks: [],
  };
};
const createTask = () => {
  return {
    title: `${Math.floor(Math.random() * 1000)}`,
    body: "very cool and fun task",
    bg_color: "blue",
    pinned: false,
  };
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  console.log("removed :", removed);
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  console.log("result: ", result);
  return result;
};

export default function ProjectBoard(props) {
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(props.project.groups)
  },[props.project])

  async function addGroup() {
    let id = 
    setState([...state, createGroup(Math.random())]);
  }

  function onDragEnd(result) {
    const { source, destination } = result;
    console.log(result);
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd].tasks, source.index, destination.index);
      const newState = [...state];
      newState[sInd].tasks = items;
      setState(newState);
    } else {
      const result = move(
        state[sInd].tasks,
        state[dInd].tasks,
        source,
        destination
      );
      const newState = [...state];
      console.log("new state before: ", newState);
      newState[sInd].tasks = result[sInd];
      newState[dInd].tasks = result[dInd];
      console.log("new state after: ", newState);

      setState(newState);


    }
  }

  return (
    <div className="overflow-x-auto">
      <DragDropContext onDragEnd={(e) => {onDragEnd(e); postData('/api/projects/updateprojectboard', {_id: props.project._id, groups: state})}}>
        <div className="flex space-x-2 items-start  ">

          {state.map((group, ind) => (
            

            <div className="bg-gray-200 p-2 rounded-md animate-fade-in-up max-h-screen overflow-y-auto">
              <span className="flex justify-between items-center mb-2">
                <h1 className=" font-medium capitalize text-sm"> {group.id}</h1>
                <button
                  onClick={() => {
                    const newState = [...state];
                    newState.splice(ind, 1);
                    setState(newState);
                    postData('/api/projects/updateprojectboard', {_id: props.project._id, groups: newState})
                  }}
                >
                  <DotsHorizontalIcon className="h-5 w-5 text-gray-500" />
                </button>
              </span>
              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <div
                    className="rounded-lg w-60 min-h-10 animate-fade-in-up  select-none    "
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {group.tasks.map((item, index) => (
                      <Draggable
                        key={item.title}
                        draggableId={item.title}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className="rounded-md p-1 bg-gray-100 shadow-sm mb-2 "
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="flex justify-between  ">
                              <span className="ml-1">{item.title}</span>
                              <button
                                className="hover:bg-gray-200 p-1 rounded-md"
                                type="button"
                                onClick={() => {
                                  const newState = [...state];
                                  newState[ind].tasks.splice(index, 1);
                                  setState(newState);
                                  postData('/api/projects/updateprojectboard', {_id: props.project._id, groups: newState})
                                }}
                              >
                                <PencilIcon className="text-gray-600 w-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <button
                className=" hover:bg-gray-300 w-full text-left px-2 py-1 rounded-md text-sm flex items-center text-gray-600 "
                type="button"
                onClick={() => {
                  const newState = [...state];
                  newState[ind].tasks.push(createTask());
                  setState(newState);
                  postData('/api/projects/updateprojectboard', {_id: props.project._id, groups: newState})
                }}
              >
                <PlusIcon className="h-4 w-4 text-gray-600 mr-1" /> Add a task
              </button>
            </div>
          ))}

          <button
            className="hover:bg-gray-300 w-60 text-left px-2 py-2 rounded-md text-sm flex items-center text-gray-600 bg-gray-200 "
            type="button"
            onClick={() => {
             addGroup();
             const newState = [...state];
             newState.push(createGroup(Math.random()))
             setState(newState);
             postData('/api/projects/updateprojectboard', {_id: props.project._id, groups: newState})
            }}
          >
            <PlusIcon className="h-4 w-4 text-gray-600 mr-1" /> Add new group
          </button>
        </div>
      </DragDropContext>
    </div>
  );
}
