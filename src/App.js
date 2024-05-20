import React from "react";
import './App.css';
import Keyboard from "./pages/keyboard";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";


function App() {
    const [dark, setDark] = React.useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    } 

    return (
        <>
        <div className="dark:bg-slate-800">
            <button className="w-10 h-10 m-2" onClick={()=> darkModeHandler()}>
                {
                    dark && <IoSunny />
                }

                {
                    !dark && <IoMoon />
                }
            </button>
            <Keyboard/>
        </div>
        </>
    );
};

export default App;
