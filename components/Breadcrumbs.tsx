/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid'
import Link from 'next/link'


export default function Breadcrumbs(props) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4 transition-colors">
        <li>
          <div>
            <Link href="/">
            <a  className="text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400 ">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a></Link>
          </div>
        </li>
        {props.pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-700 dark:text-gray-400" aria-hidden="true" />
              <Link href={page.href}>
              <a
                
                className="ml-4  font-medium text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 hover:text-gray-800 "
              >
                {page.name}
              </a></Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
