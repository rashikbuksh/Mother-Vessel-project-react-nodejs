import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastBody = ({ text }) => (
	<div
		className="flex items-center"
		onClick={() => navigator.clipboard.writeText(text.split(" ")[0])}
	>
		<div className="flex-1">
			<p className="text-sm font-medium text-gray-900">{text}</p>
		</div>
		<div className="ml-4 flex-shrink-0">
			<button className="inline-flex text-orange-400 transition duration-150 ease-in-out hover:text-orange-500 focus:text-orange-500 focus:outline-none">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
					/>
				</svg>
			</button>
		</div>
	</div>
);

export const success = (text) => toast.success(<ToastBody {...{ text }} />);
export const warning = (text) => toast.warn(<ToastBody {...{ text }} />);
export const error = (text) => toast.error(<ToastBody {...{ text }} />);

export const generatedToast = (toast) => {
	const { status, message } = toast?.data;
	// eslint-disable-next-line default-case
	switch (status) {
		case "create":
			success(message);
			break;
		case "update":
			success(message);
			break;
		case "delete":
			error(message);
			break;
		case "error":
			error(message);
			break;
		case "warning":
			warning(message);
			break;
	}
};

const DefaultConfig = {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	closeButton: false,
};

export const Toast = () => {
	return (
		<ToastContainer
			style={{ width: "auto" }}
			transition={Slide}
			{...DefaultConfig}
		/>
	);
};
