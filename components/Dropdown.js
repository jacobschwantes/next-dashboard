/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/solid'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown(props) {
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="items-center inline-flex justify-center w-full rounded-lg border-2 dark:text-gray-400 dark:border-gray-700 border-gray-200  px-2 py-1 bg-white dark:bg-gray-800 text-sm  font-medium text-gray-700 hover:bg-gray-50 dark:focus:ring-offset-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
         <props.icon className="h-4 w-4 mr-1" /> {props.title}
          <ChevronDownIcon className="-mr-1 ml-2 h-6 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" origin-top-right absolute right-0 mt-2 w-40 z-20 rounded-lg shadow-lg   ring-1 ring-black ring-opacity-5 focus:outline-none">
         
            {props.options.map((item, index) => {
              return (
                 <Menu.Item key={index}>
              {({ active }) => (
                <div
                  onClick={() => props.update(item.id)}
                  className={classNames(
                    active ? ' bg-gray-100 text-gray-900 dark:text-gray-300 dark:bg-gray-700' : 'text-gray-700 dark:text-gray-400 dark:bg-gray-800 bg-white',
                    ' px-4 py-2 flex items-center justify-between text-sm capitalize cursor-pointer first:rounded-t-lg last:rounded-b-lg '
                  )}
                >
                  
                   {item.option}{props.active === item.option ? <CheckIcon className='text-blue-500 h-5 w-5 ml-1'/> : null}
                </div>
              )}
            </Menu.Item>
              )
            })}
           
         
        </Menu.Items>
      </Transition>
    </Menu>
  )
}