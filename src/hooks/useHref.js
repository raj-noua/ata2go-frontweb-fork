import { useEffect } from "react";
// import { useHref } from "react-router-dom";

export const useHref = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (hash) => {
    window.location.hash = hash;
  };
};
