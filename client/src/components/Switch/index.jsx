import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function Example({ enabled, setEnabled }) {
    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? "bg-blue-600" : "bg-blue-400"}
          relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">Own Agency</span>
            <span
                aria-hidden="true"
                className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    );
}
