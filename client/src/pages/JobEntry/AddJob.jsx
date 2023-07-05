import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
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
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="mb-4 text-left text-3xl font-medium text-gray-900"
								>
									Add Job
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
											Importer Name
										</label>
										<input
											type="text"
											name="importer_name"
											onChange={handleAddFormChange}
											required
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Mother Vessel Name
										</label>
										<input
											type="text"
											name="mother_vessel_name"
											onChange={handleAddFormChange}
											required
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Mother Vessel Location
										</label>
										<input
											type="text"
											name="mv_location"
											onChange={handleAddFormChange}
											required
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									{/* <div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"></label>
										<Select
											options={[
												{
													value: "Sri Lanka",
												},
												{
													value: "India",
												},
												{
													value: "USA",
												},
												{
													value: "UK",
												},
												{
													value: "Bangladesh",
												},
											]}
											name="mv_location"
											addFormData={addFormData}
											setAddFormData={setAddFormData}
											isAddFromData={true}
										/>
									</div> */}
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Commodity
										</label>
										<input
											type="text"
											name="commodity"
											onChange={handleAddFormChange}
											required
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>

									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											BL Quantity in Metric Ton
										</label>
										<input
											type="number"
											onWheel={(e) => e.target.blur()}
											name="bl_quantity"
											onChange={handleAddFormChange}
											onInput={(e) => {
												e.target.value < 0 &&
													(e.target.value = 0);
											}}
											required
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Estimated time of arrival
										</label>
										<input
											type="date"
											name="eta"
											onChange={handleAddFormChange}
											required
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Stevedore Name
										</label>
										<input
											type="text"
											name="stevedore_name"
											onChange={handleAddFormChange}
											required
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Stevedore Contact Number
										</label>
										<input
											type="number"
											onWheel={(e) => e.target.blur()}
											onInput={(e) => {
												e.target.value.length > 11 &&
													(e.target.value =
														e.target.value.slice(
															0,
															11
														));
											}}
											name="stevedore_contact_number"
											onChange={handleAddFormChange}
											required={
												errorData?.stevedore_contact_number !==
												""
													? true
													: false
											}
											className={`peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out  ${
												errorData?.stevedore_contact_number !==
													"" &&
												"text-red-600 ring-2 ring-red-500"
											}`}
										/>
									</div>
									<button
										type="submit"
										className="inline-flex w-72 justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 md:w-80 lg:w-96"
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
