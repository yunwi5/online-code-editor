import { useState, useEffect } from "react";

const PREFIX = "codepen-clone";

const useLocalStorage = (key: string, initialValue: string | Function) => {
    const prefixedKey = PREFIX + key;

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        // if we have one already
        if (!!jsonValue) {
            // console.log("jsonValue:", jsonValue);
            return jsonValue;
        }

        if (typeof initialValue === "function") {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, value);
    }, [prefixedKey, value]);

    return [value, setValue];
};

export default useLocalStorage;
