import "../assets/css/loader.css";

export default function Loader() {
    return (
        <div className="flex h-screen items-center justify-center">
            {/* <div className="configure-border-1">
                <div className="configure-core"></div>
            </div>
            <div className="configure-border-2">
                <div className="configure-core"></div>
            </div> */}
            <div
                className="h-12 w-12 animate-spin rounded-full border-x-2
                    border-solid border-blue-500 border-t-transparent bg-transparent shadow-md"
            ></div>
        </div>
    );
}
