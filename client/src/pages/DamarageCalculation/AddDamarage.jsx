import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "../../components/Select";
import Switch from "../../components/Switch";

import { MdClose } from "react-icons/md";

export default function AddJob({
    isOpen,
    closeModal,
    handleAddFormSubmit,
    handleAddFormChange,
    addFormData,
    setAddFormData,
    errorData,
    orderJobList,
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
                                    Add Dam
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
                                            Order Job Number
                                        </label>
                                        {orderJobList && (
                                            <Select
                                                options={orderJobList}
                                                name="order_job_number"
                                                addFormData={addFormData}
                                                setAddFormData={setAddFormData}
                                                isAddFromData={true}
                                            />
                                        )}
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            CP Number
                                        </label>
                                        <input
                                            type="number"
                                            name="cp_number"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Date From Charpotro
                                        </label>
                                        <input
                                            type="date"
                                            name="date_from_charpotro"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

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
                                            capacity
                                        </label>
                                        <input
                                            type="number"
                                            name="capacity"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            LV Name
                                        </label>
                                        <input
                                            type="text"
                                            name="LV_name"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            MV Name
                                        </label>
                                        <input
                                            type="text"
                                            name="MV_name"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Loading Location
                                        </label>
                                        <input
                                            type="text"
                                            name="loading_location"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Unloading Location
                                        </label>
                                        <input
                                            type="text"
                                            name="unloading_location"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Loading Start Time Stamp
                                        </label>
                                        <input
                                            type="date"
                                            name="loading_start_time_stamp"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Loading Completion Time Stamp
                                        </label>
                                        <input
                                            type="date"
                                            name="loading_completion_time_stamp"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Sailing Time Stamp
                                        </label>
                                        <input
                                            type="date"
                                            name="sailing_time_stamp"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Duration of Travel Time
                                        </label>
                                        <input
                                            type="time"
                                            name="duration_of_travel_time"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Unloading Start Time Stamp
                                        </label>
                                        <input
                                            type="date"
                                            name="unloading_start_time_stamp"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Unloading Completion Time Stamp
                                        </label>
                                        <input
                                            type="date"
                                            name="unloading_completion_time_stamp"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Others
                                        </label>
                                        <input
                                            type="text"
                                            name="others"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Total Elapsed Time
                                        </label>
                                        <input
                                            type="time"
                                            name="total_elapsed_time"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Voyage Time
                                        </label>
                                        <input
                                            type="time"
                                            name="voyage_time"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Free Time
                                        </label>
                                        <input
                                            type="time"
                                            name="free_time"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Total Dispatch
                                        </label>
                                        <input
                                            type="number"
                                            name="total_despatch"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Daily Dispatch
                                        </label>
                                        <input
                                            type="number"
                                            name="daily_despatch"
                                            onChange={handleAddFormChange}
                                            required
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
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
