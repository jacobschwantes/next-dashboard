import { useState } from "react";
import Pagination from "../Pagintation";
import Input from "../Input";
import { PlusIcon } from "@heroicons/react/solid";
export default function Issues(props) {
  const [search, setSearch] = useState('');
  const data = Array(17).fill().map(Math.random);
  const batchSize = 5; // items per chunk
  const pages = data.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / batchSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  const [active, setActive] = useState(1);

  return (
    <div>
      <div className=" flex items-center justify-between  space-x-2 ">
          <Input
            expand={false}
            setInput={setSearch}
            value={search}
            type="search"
            name="search"
            id="search"
            placeholder="Search"
          />
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="flex  items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="mr-1 h-4" />
            New Issue
          </button>
        </div>
      <div className=" flex flex-col">
        {pages[active - 1].map((item) => {
          return (
            <div>
              <h1>{item}</h1>
            </div>
          );
        })}
      </div>
      <Pagination
        pages={pages}
        setActive={setActive}
        active={active}
        size={data.length}
        batchSize={5}
      />
    </div>
  );
}

const sample = {
  title:
    "sdf sdf sdf sdf sdf sdfsdfs dfsdfsd fsd fsd fsdfsdfsdf sdf sdfsd fsdf sdf sdf sdf sf sf sdf sdf",
  tags: ["sdf", "sdf", "sdfs", "sdf"],
  creator: ["sdfsdfsdfsdfsdfsdfsdf"],
  id: 1234,
  timestamp: 123123123123,

  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper qFuam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
  comments: [
    {
      user: {
        email: "sdfsdfsdfsdf",
        name: "sdfsdfsdfsfdfsdf",
        image: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
      },
      timestamp: 1232545345345345,
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper quam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
    },
    {
        user: {
          email: "sdfsdfsdfsdf",
          name: "sdfsdfsdfsfdfsdf",
          image: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        },
        timestamp: 1232545345345345,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper quam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
      },
      {
        user: {
          email: "sdfsdfsdfsdf",
          name: "sdfsdfsdfsfdfsdf",
          image: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        },
        timestamp: 1232545345345345,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper quam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
      },
      {
        user: {
          email: "sdfsdfsdfsdf",
          name: "sdfsdfsdfsfdfsdf",
          image: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        },
        timestamp: 1232545345345345,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper quam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
      },
      {
        user: {
          email: "sdfsdfsdfsdf",
          name: "sdfsdfsdfsfdfsdf",
          image: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        },
        timestamp: 1232545345345345,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper quam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
      },
      {
        user: {
          email: "sdfsdfsdfsdf",
          name: "sdfsdfsdfsfdfsdf",
          image: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        },
        timestamp: 1232545345345345,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper quam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
      },
      {
        user: {
          email: "sdfsdfsdfsdf",
          name: "sdfsdfsdfsfdfsdf",
          image: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        },
        timestamp: 1232545345345345,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper quam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
      },
      {
        user: {
          email: "sdfsdfsdfsdf",
          name: "sdfsdfsdfsfdfsdf",
          image: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        },
        timestamp: 1232545345345345,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper quam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
      },
      {
        user: {
          email: "sdfsdfsdfsdf",
          name: "sdfsdfsdfsfdfsdf",
          image: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        },
        timestamp: 1232545345345345,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper quam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
      },
      {
        user: {
          email: "sdfsdfsdfsdf",
          name: "sdfsdfsdfsfdfsdf",
          image: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        },
        timestamp: 1232545345345345,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper quam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
      },
      {
        user: {
          email: "sdfsdfsdfsdf",
          name: "sdfsdfsdfsfdfsdf",
          image: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        },
        timestamp: 1232545345345345,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper quam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
      },
      {
        user: {
          email: "sdfsdfsdfsdf",
          name: "sdfsdfsdfsfdfsdf",
          image: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        },
        timestamp: 1232545345345345,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, metus gravida tristique ornare, ipsum diam ultricies sem, congue efficitur risus erat ac ligula. Aenean non mollis urna, et euismod felis. Donec malesuada ipsum turpis, sed semper quam convallis ac. Maecenas in dui quis ante efficitur ullamcorper ac at risus. Praesent viverra tempus commodo. Donec congue elit quis elit blandit, non varius quam varius. In hac habitasse platea dictumst.",
      },
  ],
};
