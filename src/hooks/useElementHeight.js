import { useEffect, useState } from "react";

const useElementHeight = space => {
    const [eleHeight, setEleHeight] = useState(0);

    useEffect(() => {
        const myTimeout = setTimeout(() => {
            const ele = document.querySelector("#header");
            setEleHeight(ele?.clientHeight + space);
        }, 1000);

        return () => {
            clearTimeout(myTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return eleHeight;
};
export default useElementHeight;
