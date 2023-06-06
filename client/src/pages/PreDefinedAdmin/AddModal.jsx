import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdClose } from "react-icons/md";
import Switch from "../../components/Switch";
import DynamicStaffInfo from "./DynamicStaffInfo";

export default function AddModal({
	isOpen,
	closeModal,
	handleAddFormChange,
	handleAddFormSubmit,
	saveFile,
	addStaff,
	setAddStaff,
	leased,
	setLeased,
	active,
	setActive,
	saveLv_documents_attachementFile,
}) {
	const onClickAddStaffButton = (event) => {
		event.preventDefault();
		setAddStaff([...addStaff, "#"]);
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="z-10 overflow-y-auto"
				// new start
				onClose={() => {}}
				// new end
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
									Add Ship
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
											LV Name
										</label>
										<input
											type="text"
											name="LV_name"
											onChange={handleAddFormChange}
											required
											placeholder="LV Name"
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Capacity
										</label>
										<input
											type="text"
											name="capacity"
											onChange={handleAddFormChange}
											required
											placeholder="Capacity"
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Master Registration Number
										</label>
										<input
											type="text"
											name="master_reg_number"
											onChange={handleAddFormChange}
											required
											placeholder="Master Registration Number"
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Master's Name
										</label>
										<input
											type="text"
											name="masters_name"
											onChange={handleAddFormChange}
											required
											placeholder="Master's Name"
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Master's Contact Number
										</label>
										<input
											type="text"
											name="masters_contact_number"
											onChange={handleAddFormChange}
											required
											placeholder="Master's Contact Number"
											className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
											Master's NID Image
										</label>
										<input
											type="file"
											name="masters_nid_image_attachment"
											onChange={saveFile}
											required
											placeholder="Master's NID Image"
											className="peer block h-10 w-full rounded-md border border-black/50 bg-gray-50 px-4 text-sm text-slate-500 outline-none drop-shadow-sm transition-all duration-200 ease-in-out file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-400"
										/>
									</div>
									<DynamicStaffInfo
										{...{
											handleAddFormChange,
											addStaff,
											setAddStaff,
										}}
									/>
									<button
										className=" w-full rounded-md bg-blue-400 py-2 font-medium text-white transition-all duration-200 ease-in-out hover:bg-blue-500 md:w-80 lg:w-96"
										onClick={onClickAddStaffButton}
									>
										Add Another Staff
									</button>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<div className="flex space-x-2">
											<label className="block w-full pb-1 text-lg font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
												Leased
											</label>
											<div className="flex items-center space-x-2">
												<span>No</span>
												<Switch
													enabled={leased}
													setEnabled={setLeased}
												/>
												<span>Yes</span>
											</div>
										</div>
									</div>
									{/* a divder needed  */}
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label
											className={`block w-full pb-1 text-sm font-medium  transition-all duration-200 ease-in-out  ${
												!leased
													? " text-red-500 "
													: "text-gray-500 group-focus-within:text-blue-400"
											} `}
										>
											Company Name
										</label>
										<input
											type="text"
											name="company_name"
											onChange={handleAddFormChange}
											required={leased}
											disabled={!leased}
											placeholder="Company Name"
											className={`peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 ${
												!leased
													? "cursor-not-allowed border-red-600"
													: ""
											} `}
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label
											className={`block w-full pb-1 text-sm font-medium  transition-all duration-200 ease-in-out  ${
												!leased
													? " text-red-500 "
													: "text-gray-500 group-focus-within:text-blue-400"
											} `}
										>
											Proprieter's Name
										</label>
										<input
											type="text"
											name="proprietors_name"
											onChange={handleAddFormChange}
											required={leased}
											disabled={!leased}
											placeholder="Proprieter's Name"
											className={`peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 ${
												!leased
													? "cursor-not-allowed border-red-600"
													: ""
											} `}
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label
											className={`block w-full pb-1 text-sm font-medium  transition-all duration-200 ease-in-out  ${
												!leased
													? " text-red-500 "
													: "text-gray-500 group-focus-within:text-blue-400"
											} `}
										>
											Office Address
										</label>
										<input
											type="text"
											name="office_address"
											onChange={handleAddFormChange}
											required={leased}
											disabled={!leased}
											placeholder="Office Address"
											className={`peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 ${
												!leased
													? "cursor-not-allowed border-red-600"
													: ""
											} `}
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label
											className={`block w-full pb-1 text-sm font-medium  transition-all duration-200 ease-in-out  ${
												!leased
													? " text-red-500 "
													: "text-gray-500 group-focus-within:text-blue-400"
											} `}
										>
											AC Number
										</label>
										<input
											type="text"
											name="ac_number"
											onChange={handleAddFormChange}
											required={leased}
											disabled={!leased}
											placeholder="AC Number"
											className={`peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 ${
												!leased
													? "cursor-not-allowed border-red-600"
													: ""
											} `}
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label
											className={`block w-full pb-1 text-sm font-medium  transition-all duration-200 ease-in-out  ${
												!leased
													? " text-red-500 "
													: "text-gray-500 group-focus-within:text-blue-400"
											} `}
										>
											Contact Details
										</label>
										<input
											type="text"
											name="contact_details"
											onChange={handleAddFormChange}
											required={leased}
											disabled={!leased}
											placeholder="Contact Details"
											className={`peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 ${
												!leased
													? "cursor-not-allowed border-red-600"
													: ""
											} `}
										/>
									</div>
									<div className="group relative w-72 md:w-80 lg:w-96">
										<label
											className={`block w-full pb-1 text-sm font-medium  transition-all duration-200 ease-in-out  ${
												!leased
													? " text-red-500 "
													: "text-gray-500 group-focus-within:text-blue-400"
											} `}
										>
											L/V Documents Attachement
										</label>
										<input
											type="file"
											name="lv_documents_attachement"
											disabled={!leased}
											onChange={
												saveLv_documents_attachementFile
											}
											placeholder="L/V Documents Attachement"
											// className="peer block h-10 w-full rounded-md border border-black/50 bg-gray-50 px-4 text-sm text-slate-500 outline-none drop-shadow-sm transition-all duration-200 ease-in-out file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-400"
											className={`file:border-1 peer h-10 w-full rounded-md  bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:px-4 file:text-sm  file:font-semibold file:text-blue-700 hover:file:bg-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-400 ${
												!leased
													? "cursor-not-allowed border border-red-600"
													: "border border-black/50"
											} `}
										/>
									</div>
									{/* <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Status
                                        </label>
                                        <input
                                            type="text"
                                            name="status"
                                            onChange={handleAddFormChange}
                                            required={leased}
                                            disabled={!leased}
                                            placeholder="Status"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div> */}
									<div className="group relative w-72 md:w-80 lg:w-96">
										<div className="flex space-x-2">
											<label
												className={`block w-full pb-1 text-lg font-medium  transition-all duration-200 ease-in-out  ${
													!leased
														? " text-red-500 "
														: "text-gray-500 group-focus-within:text-blue-400"
												} `}
											>
												Status
											</label>
											<div className="flex items-center space-x-2">
												<span>Disable</span>
												<Switch
													enabled={active}
													setEnabled={setActive}
												/>
												<span>Active</span>
											</div>
										</div>
									</div>

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
