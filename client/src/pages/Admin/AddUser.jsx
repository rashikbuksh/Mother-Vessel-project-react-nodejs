import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Select from "../../components/Select";

import { MdClose } from "react-icons/md";

export default function AddJob({
	isOpen,
	closeModal,
	handleAddFormSubmit,
	handleAddFormChange,
	addFormData,
	setAddFormData,
	errorData,
}) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={() => {}}>
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
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="mb-4 text-left text-3xl font-medium text-gray-900"
								>
									Add User
									<button
										className="float-right"
										onClick={closeModal}
									>
										<MdClose className="inline text-red-600" />
									</button>
								</Dialog.Title>
								<form
									onSubmit={handleAddFormSubmit}
									className="flex flex-col gap-4"
								>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Name
										</label>
										<input
											type="text"
											name="name"
											onChange={handleAddFormChange}
											required
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Position
										</label>
										<Select
											options={[
												{
													value: "admin",
												},
												{
													value: "operations",
												},
												{
													value: "accounts-manager",
												},
												{
													value: "accounts",
												},
											]}
											name="position"
											addFormData={addFormData}
											setAddFormData={setAddFormData}
											isAddFromData={true}
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Username
										</label>
										<input
											type="text"
											name="username"
											onChange={handleAddFormChange}
											required
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Password
										</label>
										<input
											type="password"
											name="password"
											onChange={handleAddFormChange}
											required
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>

									{/* <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Department
                                        </label>
                                        <input
                                            type="text"
                                            name="department"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div> */}
									<button
										type="submit"
										className="inline-flex justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
									>
										Add
									</button>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
