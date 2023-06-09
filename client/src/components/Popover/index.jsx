import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

export default function Example({ text }) {
	return (
		<Popover className="relative w-4">
			{({ open }) => (
				<> 
					<Popover.Button
						className={`group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
							open && "text-opacity-90"
						}`}
					>
						<span>{text.substring(0, 10)}...</span>
						<ChevronDownIcon
							className={`${open && "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80 `}
							aria-hidden="true"
						/>
					</Popover.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel className="absolute z-10 mt-3 w-16 px-4 sm:px-0">
							<div className="w-4 overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
								<div className="w-4 bg-gray-50 p-4">
									<span className="flex w-4 items-center">
										<span className="w-4 text-sm font-medium text-gray-900">
											{text}
										</span>
									</span>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
}
