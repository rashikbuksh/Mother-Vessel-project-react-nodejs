import "../assets/css/loader.css";

export default function Loader() {
    return (
        <div class="flex h-screen items-center justify-center">
            {/* <div class="configure-border-1">
                <div class="configure-core"></div>
            </div>
            <div class="configure-border-2">
                <div class="configure-core"></div>
            </div> */}
            <div
                className="h-12 w-12 animate-spin rounded-full
                    border-x-2 border-solid border-blue-500 border-t-transparent shadow-md"
            ></div>
        </div>
    );
}
