import { useState } from "react";
import DeleteModal from "./DeleteModal";
import ProjectDropdown from "./ProjectDropdown";
import ProjectModal from "./ProjectModal";
export default function ProjectLoadingState(props) {

  return (
    <div
      className={
        "  shadow-gray-100 rounded-lg shadow-lg border-gray-100 border flex bg-white relative  animate-pulse   " +
        (props.grid ? " flex-col aspect-square" : " h-48 flex-row")
      }
    >
     
      <div className=" flex justify-between items-center absolute left-0 right-0 p-4  ">
        <h1 className="text-xs text-white w-10 bg-gray-300 h-2 rounded-lg ">
         
        </h1>
      
      </div>
     
      
      
        <div
          className={ " bg-gray-200" +
            (props.grid ? " rounded-t-lg h-1/2" : " rounded-l-lg w-1/4")
          }
        ></div>
      
      <a
       
        className={
          "p-4 flex flex-col   justify-between" +
          (props.grid ? " h-1/2 " : " w-3/4")
        }
      >
        <div className="flex flex-col ">
          <span className=" space-y-2 ">
            <h1 className="font-semibold text-2xl overflow-x-hidden h-3 rounded-lg bg-gray-300 w-3/4 ">
              
            </h1>
            <h1 className="font-medium capitalize text-gray-600 text-lg bg-gray-300 w-20 h-2 rounded-lg ">
             
            </h1>
          </span>

          <div className="space-x-1 flex flex-wrap w-5 h-2">
           
          </div>
        </div>
        <div className="flex flex-col w-full  text-sm font-medium space-y-2 ">
          <div className="flex justify-between">
            
            <span className=" w-10 h-2 rounded-lg bg-gray-300  ">
             
            </span>
          </div>
          <div className="flex flex-col relative">
           
            <span className="w-full h-2 bg-gray-300 rounded-lg "></span>
          </div>
        </div>
      </a>
    </div>
  );
}
