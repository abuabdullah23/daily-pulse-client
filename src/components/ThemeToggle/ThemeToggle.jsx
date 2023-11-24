import React, { useEffect } from "react";
import { BsMoon } from "react-icons/bs";
import { BiSun } from "react-icons/bi";

const DarkMode = ({ theme, setTheme }) => {

    const handleToggle = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        // Store the theme choice in localStorage
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        // Set the theme class on the HTML element
        document.querySelector("html")?.setAttribute("class", theme);
    }, [theme]);

    return (
        <label className="">
            <input
                onChange={handleToggle}
                checked={theme === "dark"}
                type="checkbox"
                className="hidden"
            />
            <div className="">
                {theme === "dark" ? (
                    <BsMoon className="cursor-pointer text-[17px] text-white" />
                ) : (
                    <BiSun className="cursor-pointer text-[17px] text-black" />
                )}
            </div>
        </label>
    );
};
export default DarkMode;