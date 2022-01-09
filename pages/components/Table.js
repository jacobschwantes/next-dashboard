import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from "@heroicons/react/solid";
const transactions = [
  {
    id: 1,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "failed",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  {
    id: 2,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "processing",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  {
    id: 3,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "success",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  // More transactions...
];
const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Table() {
  return (
    <div className="rounded-2xl bg-gray-50  border   border-gray-200">
      <table className="  min-w-full divide-y divide-gray-200 ">
        <thead >
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-2xl">
              Transaction
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
              Status
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-2xl">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200     ">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="bg-white ">
              <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900 rounded-2xl">
                <div className="flex ">
                  <a
                    href={transaction.href}
                    className="group inline-flex space-x-2 truncate text-sm "
                  >
                    <CashIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500 "
                      aria-hidden="true"
                    />
                    <p className="text-gray-500 truncate group-hover:text-gray-900 ">
                      {transaction.name}
                    </p>
                  </a>
                </div>
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500 ">
                <span className="text-gray-900 font-medium ">
                  {transaction.amount}{" "}
                </span>
                {transaction.currency}
              </td>
              <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block ">
                <span
                  className={classNames(
                    statusStyles[transaction.status],
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                  )}
                >
                  {transaction.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500 rounded-2xl">
                <time dateTime={transaction.datetime}>{transaction.date}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
