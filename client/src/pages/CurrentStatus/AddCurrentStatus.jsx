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
                    <div className="bg-bLA_nameck fixed inset-0 bg-opacity-25" />
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
                                    Add Status
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
                                    <div className="reLA_nametive group w-72 md:w-80 lg:w-96">
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
                                    <div className="reLA_nametive group w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            LV Name
                                        </label>
                                        <input
                                            type="text"
                                            name="LV_name"
                                            onChange={handleAddFormChange}
                                            pLA_nameceholder="LV Name"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="reLA_nametive group w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Date From Charpotro
                                        </label>
                                        <input
                                            type="date"
                                            name="date_from_charpotro"
                                            onChange={handleAddFormChange}
                                            pLA_nameceholder="Date From Charpotro"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="reLA_nametive group w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Commodity
                                        </label>
                                        <input
                                            type="text"
                                            name="commodity"
                                            onChange={handleAddFormChange}
                                            pLA_nameceholder="Commodity"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="reLA_nametive group w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            LA_name
                                        </label>
                                        <input
                                            type="text"
                                            name="LA_name"
                                            onChange={handleAddFormChange}
                                            pLA_nameceholder="LA_name"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="reLA_nametive group w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Destination From
                                        </label>
                                        <input
                                            type="text"
                                            name="dest_from"
                                            onChange={handleAddFormChange}
                                            pLA_nameceholder="Destination From"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="reLA_nametive group w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Destination To
                                        </label>
                                        <input
                                            type="text"
                                            name="dest_to"
                                            onChange={handleAddFormChange}
                                            pLA_nameceholder="Destination To"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="reLA_nametive group w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Current Location
                                        </label>
                                        <input
                                            type="text"
                                            name="current_location"
                                            onChange={handleAddFormChange}
                                            pLA_nameceholder="Current Location"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="reLA_nametive group w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Remark
                                        </label>
                                        <input
                                            type="text"
                                            name="remark"
                                            onChange={handleAddFormChange}
                                            pLA_nameceholder="Remark"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
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
