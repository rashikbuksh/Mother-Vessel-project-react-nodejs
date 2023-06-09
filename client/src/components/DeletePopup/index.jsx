import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { MdClose } from "react-icons/md";

export default function Index({
	isOpenDelete,
	closeModalDelete,
	handleDeleteModal,
	deleteInfo = { title: "", body: "" },
}) {
	return (
		<Transition appear show={isOpenDelete} as={Fragment}>
			<Dialog
				as="div"
				className="z-10 overflow-y-auto"
				onClose={() => {}}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="mb-4 text-left text-3xl font-medium text-gray-900"
								>
									{deleteInfo.title}
									<button
										className="float-right"
										onClick={closeModalDelete}
									>
										<MdClose className="inline text-red-600" />
									</button>
								</Dialog.Title>
								<form
									onSubmit={handleDeleteModal}
									className="flex flex-col gap-4"
								>
									<div className="flex max-w-md flex-col gap-2 rounded-md p-6">
										<h2 className="flex items-center gap-2 text-xl font-semibold leading-tight tracking-wide">
											{deleteInfo.body}
										</h2>

										<div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row">
											<button
												type="button"
												onClick={closeModalDelete}
												className="rounded-md px-6 py-2"
											>
												No
											</button>
											<button
												type="submit"
												className="rounded-md bg-red-600 px-6 py-2 text-white shadow-sm"
											>
												Yes
											</button>
										</div>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
