import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "../../components/Select";
import Switch from "../../components/Switch";

import { MdClose } from "react-icons/md";

export default function AddJob({
    isOpen,
    closeModal,
    handlePaymentModalFormSubmit,
    handlePaymentModalFormChange,
    paymentModalData,
    errorData,
    balance,
}) {
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
                                    Add Payment
                                    <button
                                        className="float-right"
                                        onClick={closeModal}
                                    >
                                        <MdClose className="inline text-red-600" />
                                    </button>
                                </Dialog.Title>
                                {/* // new end */}

                                <form
                                    onSubmit={handlePaymentModalFormSubmit}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Order Job Number
                                        </label>
                                        <input
                                            type="text"
                                            name="order_job_number"
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            disabled
                                            value={
                                                paymentModalData.order_job_number
                                            }
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
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            disabled
                                            value={paymentModalData.LV_name}
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            LA Name
                                        </label>
                                        <input
                                            type="text"
                                            name="LA_name"
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            disabled
                                            value={paymentModalData.LA_name}
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
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            disabled
                                            value={paymentModalData.commodity}
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            chq_issue_date
                                        </label>
                                        <input
                                            type="text"
                                            name="chq_issue_date"
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            disabled
                                            value={paymentModalData.chq_issue_date.slice(
                                                0,
                                                10
                                            )}
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Mode
                                        </label>
                                        <input
                                            type="text"
                                            name="mode"
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            disabled
                                            value={paymentModalData.mode}
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Amount
                                        </label>
                                        <input
                                            type="number"
                                            name="amount"
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            disabled
                                            value={paymentModalData.amount}
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            Part payment
                                        </label>
                                        <input
                                            type="number"
                                            name="part_pay"
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            disabled
                                            value={paymentModalData.part_pay}
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            payment
                                        </label>
                                        <input
                                            type="text"
                                            name="payment"
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            disabled
                                            value={paymentModalData.payment}
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            balance
                                        </label>
                                        <input
                                            type="text"
                                            name="balance"
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            disabled
                                            value={paymentModalData.balance}
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            payment chq no
                                        </label>
                                        <input
                                            type="text"
                                            name="payment_chq_no"
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            required
                                            value={
                                                paymentModalData.payment_chq_no
                                            }
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            payment_chq_amount
                                        </label>
                                        <input
                                            type="text"
                                            name="payment_chq_amount"
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            disabled
                                            value={
                                                paymentModalData.payment_chq_amount
                                            }
                                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="group relative w-72 md:w-80 lg:w-96">
                                        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                            payment_chq_date
                                        </label>
                                        <input
                                            type="date"
                                            name="payment_chq_date"
                                            onChange={
                                                handlePaymentModalFormChange
                                            }
                                            required
                                            value={
                                                paymentModalData.payment_chq_date
                                            }
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
