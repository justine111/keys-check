import React, { useEffect, useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//This buttons will be prevented when they are pressed.
const lockedKeys = [
    "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
    "F11", "F12", "Tab", "CapsLock", "Backspace", "PrintScreen",
    "ScrollLock", "Pause", "Insert", "Home", "PageUp", "Delete",
    "End", "PageDown", "NumLock", "Fn"
];

const Keyboard = () => {

    //set keypress counter to 0 and get USB connected.
    const [keyPressCounter, setKeyPressCounter] = useState(0);
    const [keyboardName, setKeyboardName] = useState('');
    const keyRefs = useRef({});

    useEffect(() => {
        //this function is to highlight the pressed key tab (CSS part).
        const highlightKey = (e) => {
            const key = keyRefs.current[e.code];
            if (key) key.classList.add("highlightKey");
        };

        //this function is the indecator tab is being press (CSS part).
        const completeKeyDown = (e) => {
            const key = keyRefs.current[e.code];
            if (key) key.classList.add("keyDownStyle");
        };

        //This function removes the keyDownStyle class and adds the keyUpStyle class when the key is released (CSS part).
        const completeKeyUp = (e) => {
            const key = keyRefs.current[e.code];  
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
                        <span className="key Escape border-rose-400" ref={el => keyRefs.current['Escape'] = el}>Esc</span>

                        <span className="key F1 border-rose-400" ref={el => keyRefs.current['F1'] = el}>F1</span>
                        <span className="key F2 border-rose-400" ref={el => keyRefs.current['F2'] = el}>F2</span>
                        <span className="key F3 border-rose-400" ref={el => keyRefs.current['F3'] = el}>F3</span>
                        <span className="key F4 border-rose-400" ref={el => keyRefs.current['F4'] = el}>F4</span>

                        <span className="key F5 border-rose-400" ref={el => keyRefs.current['F5'] = el}>F5</span>
                        <span className="key F6 border-rose-400" ref={el => keyRefs.current['F6'] = el}>F6</span>
                        <span className="key F7 border-rose-400" ref={el => keyRefs.current['F7'] = el}>F7</span>
                        <span className="key F8 border-rose-400" ref={el => keyRefs.current['F8'] = el}>F8</span>

                        <span className="key F9 border-rose-400" ref={el => keyRefs.current['F9'] = el}>F9</span>
                        <span className="key F10 border-rose-400" ref={el => keyRefs.current['F10'] = el}>F10</span>
                        <span className="key F11 border-rose-400" ref={el => keyRefs.current['F11'] = el}>F11</span>
                        <span className="key F12 border-rose-400" ref={el => keyRefs.current['F12'] = el}>F12</span>
                    </div>

                    <div className="sec-row function-qwerty">
                        <span className="key Backquote border-rose-400" ref={el => keyRefs.current['Backquote'] = el}>`<br />~</span>
                        <span className="key Digit1 border-rose-400" ref={el => keyRefs.current['Digit1'] = el}>!<br />1</span>
                        <span className="key Digit2 border-rose-400" ref={el => keyRefs.current['Digit2'] = el}>@<br />2</span>
                        <span className="key Digit3 border-rose-400" ref={el => keyRefs.current['Digit3'] = el}>#<br />3</span>
                        <span className="key Digit4 border-rose-400" ref={el => keyRefs.current['Digit4'] = el}>$<br />4</span>
                        <span className="key Digit5 border-rose-400" ref={el => keyRefs.current['Digit5'] = el}>%<br />5</span>
                        <span className="key Digit6 border-rose-400" ref={el => keyRefs.current['Digit6'] = el}>^<br />6</span>
                        <span className="key Digit7 border-rose-400" ref={el => keyRefs.current['Digit7'] = el}>&<br />7</span>
                        <span className="key Digit8 border-rose-400" ref={el => keyRefs.current['Digit8'] = el}>*<br />8</span>
                        <span className="key Digit9 border-rose-400" ref={el => keyRefs.current['Digit9'] = el}>(<br />9</span>
                        <span className="key Digit0 border-rose-400" ref={el => keyRefs.current['Digit0'] = el}>)<br />0</span>
                        <span className="key Minus border-rose-400" ref={el => keyRefs.current['Minus'] = el}>_<br />-</span>
                        <span className="key Equal border-rose-400" ref={el => keyRefs.current['Equal'] = el}>+<br />=</span>
                        <span className="key Backspace medium-modifier border-rose-400  " ref={el => keyRefs.current['Backspace'] = el}>Backspace</span>
                    </div>

                    <div className="third-row function-qwerty">
                        <span className="key Tab small-modifier" ref={el => keyRefs.current['Tab'] = el}>Tab</span>
                        <span className="key KeyQ" ref={el => keyRefs.current['KeyQ'] = el}>Q</span>
                        <span className="key KeyW" ref={el => keyRefs.current['KeyW'] = el}>W</span>
                        <span className="key KeyE" ref={el => keyRefs.current['KeyE'] = el}>E</span>
                        <span className="key KeyR" ref={el => keyRefs.current['KeyR'] = el}>R</span>
                        <span className="key KeyT" ref={el => keyRefs.current['KeyT'] = el}>T</span>
                        <span className="key KeyY" ref={el => keyRefs.current['KeyY'] = el}>Y</span>
                        <span className="key KeyU" ref={el => keyRefs.current['KeyU'] = el}>U</span>
                        <span className="key KeyI" ref={el => keyRefs.current['KeyI'] = el}>I</span>
                        <span className="key KeyO" ref={el => keyRefs.current['KeyO'] = el}>O</span>
                        <span className="key KeyP" ref={el => keyRefs.current['KeyP'] = el}>P</span>
                        <span className="key BracketLeft" ref={el => keyRefs.current['BracketLeft'] = el}>{'{'}<br/>{'['}</span>
                        <span className="key BracketRight" ref={el => keyRefs.current['BracketRight'] = el}>{'}'}<br/>{']'}</span>
                        <span className="key Backslash small-modifier" ref={el => keyRefs.current['Backslash'] = el}>|<br/>\</span>
                    </div>

                    <div className="fourth-row function-qwerty">
                        <span className="key CapsLock medium-modifier">Caps Lock</span>
                        <span className="key KeyA" ref={el => keyRefs.current['KeyA'] = el}>A</span>
                        <span className="key KeyS" ref={el => keyRefs.current['KeyS'] = el}>S</span>
                        <span className="key KeyD" ref={el => keyRefs.current['KeyD'] = el}>D</span>
                        <span className="key KeyF" ref={el => keyRefs.current['KeyF'] = el}>F</span>
                        <span className="key KeyG" ref={el => keyRefs.current['KeyG'] = el}>G</span>
                        <span className="key KeyH" ref={el => keyRefs.current['KeyH'] = el}>H</span>
                        <span className="key KeyJ" ref={el => keyRefs.current['KeyJ'] = el}>J</span>
                        <span className="key KeyK" ref={el => keyRefs.current['KeyK'] = el}>K</span>
                        <span className="key KeyL" ref={el => keyRefs.current['KeyL'] = el}>L</span>
                        <span className="key Semicolon" ref={el => keyRefs.current['Semicolon'] = el}>:<br />;</span>
                        <span className="key Quote" ref={el => keyRefs.current['Quote'] = el}>"<br />'</span>
                        <span className="key Enter medium1-modifier" ref={el => keyRefs.current['Enter'] = el}>Enter</span>
                    </div>

                    <div className="fifth-row function-qwerty">
                        <span className="key ShiftLeft medium2-modifier">Shift</span>
                        <span className="key KeyZ" ref={el => keyRefs.current['KeyZ'] = el}>Z</span>
                        <span className="key KeyX" ref={el => keyRefs.current['KeyX'] = el}>X</span>
                        <span className="key KeyC" ref={el => keyRefs.current['KeyC'] = el}>C</span>
                        <span className="key KeyV" ref={el => keyRefs.current['KeyV'] = el}>V</span>
                        <span className="key KeyB" ref={el => keyRefs.current['KeyB'] = el}>B</span>
                        <span className="key KeyN" ref={el => keyRefs.current['KeyN'] = el}>N</span>
                        <span className="key KeyM" ref={el => keyRefs.current['KeyM'] = el}>M</span>
                        <span className="key Comma" ref={el => keyRefs.current['Comma'] = el}>{'<'}</span>
                        <span className="key Period" ref={el => keyRefs.current['Period'] = el}>{'>'}</span>
                        <span className="key Slash" ref={el => keyRefs.current['Slash'] = el}>?<br />/</span>
                        <span className="key ShiftRight medium3-modifier" ref={el => keyRefs.current['ShiftRight'] = el}>Shift</span>
                    </div>

                    <div className="sixth-row function-qwerty">
                        <span className="key ControlLeft small-modifier" ref={el => keyRefs.current['ControlLeft'] = el}>Control</span>
                        <span className="key MetaLeft small-modifier" ref={el => keyRefs.current['MetaLeft'] = el}>Windows</span>
                        <span className="key AltLeft small-modifier" ref={el => keyRefs.current['AltLeft'] = el}>Alt</span>
                        <span className="key Space large-modifier" ref={el => keyRefs.current['Space'] = el}></span>
                        <span className="key AltRight small-modifier" ref={el => keyRefs.current['AltRight'] = el}>Alt</span>
                        <span className="key ControlRight small-modifier" ref={el => keyRefs.current['ControlRight'] = el}>Control</span>
                        <span className="key Fn small1-modifier" ref={el => keyRefs.current['Fn'] = el}>Fn</span>
                    </div>
                </div>

                <div className="container navigation-container">
                    <div className="first-row navigation">
                        <span className="key PrintScreen" ref={el => keyRefs.current['PrintScreen'] = el}>Print</span>
                        <span className="key ScrollLock" ref={el => keyRefs.current['ScrollLock'] = el}>Scroll</span>
                        <span className="key Pause" ref={el => keyRefs.current['Pause'] = el}>Pause</span>
                    </div>

                    <div className="sec-row navigation">
                        <span className="key Insert" ref={el => keyRefs.current['Insert'] = el}>Insert</span>
                        <span className="key Home" ref={el => keyRefs.current['Home'] = el}>Home</span>
                        <span className="key PageUp" ref={el => keyRefs.current['PageUp'] = el}>Page<br />Up</span>
                    </div>

                    <div className="third-row navigation">
                        <span className="key Delete" ref={el => keyRefs.current['Delete'] = el}>Delete</span>
                        <span className="key End" ref={el => keyRefs.current['End'] = el}>End</span>
                        <span className="key PageDown" ref={el => keyRefs.current['PageDown'] = el}>Page<br />Down</span>
                    </div>

                    <div className="fifth-row arrows">
                        <span className="key ArrowUp border-blue-600" ref={el => keyRefs.current['ArrowUp'] = el}>&#8593;</span>
                    </div>

                    <div className="sixth-row arrows">
                        <span className="key ArrowLeft border-blue-600" ref={el => keyRefs.current['ArrowLeft'] = el}>&#8592;</span>
                        <span className="key ArrowDown border-blue-600" ref={el => keyRefs.current['ArrowDown'] = el}>&#8595;</span>
                        <span className="key ArrowRight border-blue-600" ref={el => keyRefs.current['ArrowRight'] = el}>&#8594;</span>
                    </div>
                </div>

                <div className="container numpad-container">
                    <div className="first-row"><span></span></div>
                    <div className="sec-row numpad">
                        <span className="key NumLock" ref={el => keyRefs.current['NumLock'] = el}>Num Lock</span>
                        <span className="key NumpadDivide" ref={el => keyRefs.current['NumpadDivide'] = el}>/</span>
                        <span className="key NumpadMultiply" ref={el => keyRefs.current['NumpadMultiply'] = el}>*</span>
                        <span className="key NumpadSubtract" ref={el => keyRefs.current['NumpadSubtract'] = el}>-</span>
                    </div>

                    <div className="third-row numpad">
                        <span className="key Numpad7" ref={el => keyRefs.current['Numpad7'] = el}>7</span>
                        <span className="key Numpad8" ref={el => keyRefs.current['Numpad8'] = el}>8</span>
                        <span className="key Numpad9" ref={el => keyRefs.current['Numpad9'] = el}>9</span>
                        <span className="key NumpadAdd" ref={el => keyRefs.current['NumpadAdd'] = el}>+</span>
                    </div>

                    <div className="fourth-row numpad">
                        <span className="key Numpad4" ref={el => keyRefs.current['Numpad4'] = el}>4</span>
                        <span className="key Numpad5" ref={el => keyRefs.current['Numpad5'] = el}>5</span>
                        <span className="key Numpad6" ref={el => keyRefs.current['Numpad6'] = el}>6</span>
                    </div>

                    <div className="fifth-row numpad">
                        <span className="key Numpad1" ref={el => keyRefs.current['Numpad1'] = el}>1</span>
                        <span className="key Numpad2" ref={el => keyRefs.current['Numpad2'] = el}>2</span>
                        <span className="key Numpad3" ref={el => keyRefs.current['Numpad3'] = el}>3</span>
                        <span className="key NumpadEnter" ref={el => keyRefs.current['NumpadEnter'] = el}>Enter</span>
                    </div>

                    <div className="sixth-row numpad">
                        <span className="key Numpad0" ref={el => keyRefs.current['Numpad0'] = el}>0</span>
                        <span className="key NumpadDecimal" ref={el => keyRefs.current['NumpadDecimal'] = el}>.</span>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Keyboard;
