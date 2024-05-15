import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//This buttons will be prevented when they are pressed.
const lockedKeys = [
    "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
    "F11", "F12", "Tab", "CapsLock", "Backspace", "PrintScreen",
    "ScrollLock", "Pause", "Insert", "Home", "PageUp", "Delete",
    "End", "PageDown", "NumLock"
];

const Keyboard = () => {

    //set keypress counter to 0 and get USB connected.
    const [keyPressCounter, setKeyPressCounter] = useState(0);
    const [keyboardName, setKeyboardName] = useState('');

    useEffect(() => {
        //this function is to highlight the pressed key tab (CSS part).
        const highlightKey = (e) => {
            const key = document.querySelector(`.${e.code}`);
            if (key) key.classList.add("highlightKey");
        };

        //this function is the indecator tab is being press (CSS part).
        const completeKeyDown = (e) => {
            const key = document.querySelector(`.${e.code}`);
            if (key) key.classList.add("keyDownStyle");
        };

        //This function removes the keyDownStyle class and adds the keyUpStyle class when the key is released (CSS part).
        const completeKeyUp = (e) => {
            const key = document.querySelector(`.${e.code}`);   
            if (key) {
                key.classList.remove("keyDownStyle");
                key.classList.add("keyUpStyle");
            }
        };

        //Prevent the defualt action of the listed in "lockedKeys"
        const preventDefaults = (e) => {
            if (lockedKeys.includes(e.code)) {
                e.preventDefault();
            }
        };

        //This is the main handler for the keydown event. It prevents the default action if necessary and applies the highlightKey and completeKeyDown effects.
        const handleKeyDown = (e) => {
            preventDefaults(e);
            highlightKey(e);
            completeKeyDown(e);
        };

        //This is the main handler for the keyup event. It applies the completeKeyUp effect and increments the key press counter.
        const handleKeyUp = (e) => {
            completeKeyUp(e);
            setKeyPressCounter(prevCount => prevCount + 1);
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };

    }, []);

    //This function uses the WebUSB API to request access to a USB device (specifically a keyboard).
    const requestDevice = () => {
        navigator.usb.requestDevice({ filters: [{ classCode: 3, subclassCode: 1, protocolCode: 1 }] })
          .then(device => {
            setKeyboardName(device.productName);
            toast.success("USB Device Successfully Connected!");
            
            console.log('Device:', device);
            console.log('Manufacturer:', device.manufacturerName);
            console.log('Product:', device.productName);
          })
          .catch(error => {
            console.error('Error:', error);
            toast.error("Failed to request USB device access!");
          });
      };
    
    const handleButtonClick = () => {
        requestDevice();
    };


    return (
        <div className="page">
            <div className='header'>Keys Check</div>

            <div className='keyboardAccess'>
                <button id='requestButton' onClick={handleButtonClick}>Request USB Device Access</button>
                <div className='keyPressCounter'>Key press counter: {keyPressCounter}</div>
                <div className="keyboardName">Current Keyboard: {keyboardName}</div>
            </div>

            <div className="keyboard">
                <div className="container function-qwerty-container">
                    <div className="first-row function-qwerty">
                        <span className="key Escape">Esc</span>
                        <span className="key F1">F1</span>
                        <span className="key F2">F2</span>
                        <span className="key F3">F3</span>
                        <span className="key F4">F4</span>
                        <span className="key F5">F5</span>
                        <span className="key F6">F6</span>
                        <span className="key F7">F7</span>
                        <span className="key F8">F8</span>
                        <span className="key F9">F9</span>
                        <span className="key F10">F10</span>
                        <span className="key F11">F11</span>
                        <span className="key F12">F12</span>
                    </div>

                    <div className="sec-row function-qwerty">
                        <span className="key Backquote">`<br />~</span>
                        <span className="key Digit1">!<br />1</span>
                        <span className="key Digit2">@<br />2</span>
                        <span className="key Digit3">#<br />3</span>
                        <span className="key Digit4">$<br />4</span>
                        <span className="key Digit5">%<br />5</span>
                        <span className="key Digit6">^<br />6</span>
                        <span className="key Digit7">&<br />7</span>
                        <span className="key Digit8">*<br />8</span>
                        <span className="key Digit9">(<br />9</span>
                        <span className="key Digit0">)<br />0</span>
                        <span className="key Minus">_<br />-</span>
                        <span className="key Equal">+<br />=</span>
                        <span className="key Backspace medium-modifier">Backspace</span>
                    </div>

                    <div className="third-row function-qwerty">
                        <span className="key Tab small-modifier">Tab</span>
                        <span className="key KeyQ">Q</span>
                        <span className="key KeyW">W</span>
                        <span className="key KeyE">E</span>
                        <span className="key KeyR">R</span>
                        <span className="key KeyT">T</span>
                        <span className="key KeyY">Y</span>
                        <span className="key KeyU">U</span>
                        <span className="key KeyI">I</span>
                        <span className="key KeyO">O</span>
                        <span className="key KeyP">P</span>
                        <span className="key BracketLeft">{'{'}</span>
                        <span className="key BracketRight">{'}'}</span>
                        <span className="key Backslash small-modifier">|<br />\</span>
                    </div>

                    <div className="fourth-row function-qwerty">
                        <span className="key CapsLock medium-modifier">Caps Lock</span>
                        <span className="key KeyA">A</span>
                        <span className="key KeyS">S</span>
                        <span className="key KeyD">D</span>
                        <span className="key KeyF">F</span>
                        <span className="key KeyG">G</span>
                        <span className="key KeyH">H</span>
                        <span className="key KeyJ">J</span>
                        <span className="key KeyK">K</span>
                        <span className="key KeyL">L</span>
                        <span className="key Semicolon">:<br />;</span>
                        <span className="key Quote">"<br />'</span>
                        <span className="key Enter medium1-modifier">Enter</span>
                    </div>

                    <div className="fifth-row function-qwerty">
                        <span className="key ShiftLeft medium2-modifier">Shift</span>
                        <span className="key KeyZ">Z</span>
                        <span className="key KeyX">X</span>
                        <span className="key KeyC">C</span>
                        <span className="key KeyV">V</span>
                        <span className="key KeyB">B</span>
                        <span className="key KeyN">N</span>
                        <span className="key KeyM">M</span>
                        <span className="key Comma">{'<'}</span>
                        <span className="key Period">{'>'}</span>
                        <span className="key Slash">?<br />/</span>
                        <span className="key ShiftRight medium3-modifier">Shift</span>
                    </div>

                    <div className="sixth-row function-qwerty">
                        <span className="key ControlLeft small-modifier">Control</span>
                        <span className="key MetaLeft small-modifier">Windows</span>
                        <span className="key AltLeft small-modifier">Alt</span>
                        <span className="key Space large-modifier"></span>
                        <span className="key AltRight small-modifier">Alt</span>
                        <span className="key ControlRight small-modifier">Control</span>
                        <span className="key Fn small1-modifier">Fn</span>
                    </div>
                </div>

                <div className="container navigation-container">
                    <div className="first-row navigation">
                        <span className="key PrintScreen">Print</span>
                        <span className="key ScrollLock">Scroll</span>
                        <span className="key Pause">Pause</span>
                    </div>

                    <div className="sec-row navigation">
                        <span className="key Insert">Insert</span>
                        <span className="key Home">Home</span>
                        <span className="key PageUp">Page<br />Up</span>
                    </div>

                    <div className="third-row navigation">
                        <span className="key Delete">Delete</span>
                        <span className="key End">End</span>
                        <span className="key PageDown">Page<br />Down</span>
                    </div>

                    <div className="fifth-row arrows">
                        <span className="key ArrowUp">&#8593;</span>
                    </div>

                    <div className="sixth-row arrows">
                        <span className="key ArrowLeft">&#8592;</span>
                        <span className="key ArrowDown">&#8595;</span>
                        <span className="key ArrowRight">&#8594;</span>
                    </div>
                </div>

                <div className="container numpad-container">
                    <div className="first-row"><span></span></div>
                    <div className="sec-row numpad">
                        <span className="key NumLock">Num Lock</span>
                        <span className="key NumpadDivide">/</span>
                        <span className="key NumpadMultiply">*</span>
                        <span className="key NumpadSubtract">-</span>
                    </div>

                    <div className="third-row numpad">
                        <span className="key Numpad7">7</span>
                        <span className="key Numpad8">8</span>
                        <span className="key Numpad9">9</span>
                        <span className="key NumpadAdd">+</span>
                    </div>

                    <div className="fourth-row numpad">
                        <span className="key Numpad4">4</span>
                        <span className="key Numpad5">5</span>
                        <span className="key Numpad6">6</span>
                    </div>

                    <div className="fifth-row numpad">
                        <span className="key Numpad1">1</span>
                        <span className="key Numpad2">2</span>
                        <span className="key Numpad3">3</span>
                        <span className="key NumpadEnter">Enter</span>
                    </div>

                    <div className="sixth-row numpad">
                        <span className="key Numpad0">0</span>
                        <span className="key NumpadDecimal">.</span>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Keyboard;
