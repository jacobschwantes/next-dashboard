import { SearchIcon } from '@heroicons/react/solid'

export default function Input(props) {
  return (
      <div className="relative rounded-lg shadow-sm flex items-center">
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          onChange={(e) => props.setInput(e.target.value)}
          value={props.value}
          type={props.type}
          name={props.name}
          id={props.id}
          className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md placeholder:font-semibold"
          placeholder={props.placeholder}
        />
      </div>
  )
}