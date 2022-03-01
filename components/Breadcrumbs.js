/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid'


export default function Breadcrumbs(props) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4 transition-colors">
        <li>
          <div>
            <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400 ">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {props.pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-700 dark:text-gray-400" aria-hidden="true" />
              <a
                href={page.href}
                className="ml-4 text-lg font-medium text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 hover:text-gray-800 "
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
