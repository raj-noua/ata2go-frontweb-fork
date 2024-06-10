import { useEffect } from "react";

const Layout = ({ children }) => {
    useEffect(() => {
        const myTimeout = setTimeout(() => {
            const ele = document.querySelector("#header");
            const bannerEle = document.querySelector("#main");
            bannerEle.style.paddingTop = `calc(0.5em + ${ele.clientHeight + "px"}`;
        }, 1000);

        return () => {
            clearTimeout(myTimeout);
        };
    }, []);

    return <main id="main">{children}</main>;
};

export default Layout;
