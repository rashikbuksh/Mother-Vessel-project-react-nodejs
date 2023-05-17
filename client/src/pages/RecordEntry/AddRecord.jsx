import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "../../components/Select";
import Switch from "../../components/Switch";
import { useEffect } from "react";
import { fetchData } from "../../hooks/fetchData";

import { MdClose } from "react-icons/md";

export default function AddJob({
    isOpen,
    closeModal,
    handleAddFormSubmit,
    handleAddFormChange,
    addFormData,
    setAddFormData,
    errorData,
    OrderNumber,
    maxCapacity,
    enabled,
    setEnabled,
}) {
    const [LVlist, setLVlist] = useState([]);

    // fetch data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchData(
            `${process.env.REACT_APP_API_URL}/management/getLVname`,
            setLVlist,
            setLoading,
            setError
        );
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
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
                                {/* // new start */}
                                <Dialog.Title
                                    as="h3"
                                    className="mb-4 text-left text-3xl font-medium text-gray-900"
                                >
                                    Add Record
                                    <button
                                        className="float-right"
                                        onClick={closeModal}
                                    >
                                        <MdClose className="inline text-red-600" />
                                    </button>
                                </Dialog.Title>
                                {/* // new end */}
                                <form
                                    onSubmit={handleAddFormSubmit}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Order Number
                                        </label>
                                        {OrderNumber && (
                                            <Select
                                                options={OrderNumber}
                                                name="order_number"
                                                addFormData={addFormData}
                                                setAddFormData={setAddFormData}
                                                isAddFromData={true}
                                            />
                                        )}
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Date From Charpotro
                                        </label>
                                        <input
                                            type="date"
                                            name="date_from_charpotro"
                                            onChange={handleAddFormChange}
                                            placeholder="dd-mm-yyyy"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            CP Number From Charpotro
                                        </label>
                                        <input
                                            type="number"
                                            onWheel={(e) => e.target.blur()}
                                            name="cp_number_from_charpotro"
                                            onChange={handleAddFormChange}
                                            placeholder="CP Number From Charpotro"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <div className="flex items-center justify-between">
                                            <label
                                                className={`block w-full pb-1 text-sm font-medium  transition-all duration-200 ease-in-out  ${
                                                    enabled
                                                        ? " text-red-500 "
                                                        : "text-gray-500 group-focus-within:text-blue-400"
                                                } `}
                                            >
                                                Local Agency Name
                                            </label>
                                            <span className="flex items-center">
                                                <Switch
                                                    {...{ enabled, setEnabled }}
                                                />
                                                <label
                                                    className={`ml-1 block text-sm font-medium transition-all duration-200 ease-in-out  ${
                                                        enabled
                                                            ? "text-gray-500 group-focus-within:text-blue-600"
                                                            : " text-red-500 "
                                                    } `}
                                                >
                                                    Own
                                                </label>
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="LA_name"
                                            onChange={handleAddFormChange}
                                            disabled={enabled}
                                            placeholder="Local Agency Name"
                                            className={`peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 ${
                                                enabled
                                                    ? "cursor-not-allowed border-red-600"
                                                    : ""
                                            } `}
                                        />
                                    </div>

                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Lighter Vessel Name
                                        </label>
                                        {enabled ? (
                                            <Select
                                                options={LVlist}
                                                name="LV_name"
                                                addFormData={addFormData}
                                                setAddFormData={setAddFormData}
                                                isAddFromData={true}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                name="LV_name"
                                                onChange={handleAddFormChange}
                                                placeholder="Lighter Vessel Name"
                                                className={`peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 `}
                                            />
                                        )}
                                    </div>

                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Destination From
                                        </label>
                                        <Select
                                            options={[
                                                {
                                                    value: "Chittagong",
                                                },
                                                {
                                                    value: "Dhaka",
                                                },
                                                {
                                                    value: "Kapashia",
                                                },
                                                {
                                                    value: "Khulna",
                                                },
                                                {
                                                    value: "Narsingdi",
                                                },
                                            ]}
                                            name="dest_from"
                                            addFormData={addFormData}
                                            setAddFormData={setAddFormData}
                                            isAddFromData={true}
                                        />
                                    </div>

                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Destination To
                                        </label>
                                        <input
                                            type="text"
                                            name="dest_to"
                                            onChange={handleAddFormChange}
                                            placeholder="Destination To"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Capacity
                                        </label>
                                        <input
                                            type="number"
                                            onWheel={(e) => e.target.blur()}
                                            name="capacity"
                                            onChange={handleAddFormChange}
                                            min={0}
                                            max={maxCapacity}
                                            placeholder={`Capacity (Max: ${maxCapacity})`}
                                            // oninput="if(this.value>maxCapacity)this.value=maxCapacity;"
                                            onInput={(e) => {
                                                (e.target.value > maxCapacity &&
                                                    (e.target.value =
                                                        maxCapacity)) ||
                                                    (e.target.value < 0 &&
                                                        (e.target.value = 0));
                                            }}
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Rate
                                        </label>
                                        <input
                                            type="number"
                                            onWheel={(e) => e.target.blur()}
                                            name="rate"
                                            onChange={handleAddFormChange}
                                            placeholder="Rate"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            LV Master Name
                                        </label>
                                        <input
                                            type="text"
                                            name="LV_master_name"
                                            onChange={handleAddFormChange}
                                            required={
                                                errorData?.LV_master_name !== ""
                                                    ? true
                                                    : false
                                            }
                                            placeholder="LV Master Name"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            LV Master Number
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
                                            name="LV_master_contact_number"
                                            onChange={handleAddFormChange}
                                            required={
                                                errorData?.LV_master_contact_number !==
                                                ""
                                                    ? true
                                                    : false
                                            }
                                            placeholder="LV Master Number"
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-green-300 py-2 text-sm font-medium text-green-900 hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
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
