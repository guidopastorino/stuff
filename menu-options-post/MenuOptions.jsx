'use client'

import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

const MenuOptions = () => {
    // options for the menu
    const options = [
        "Follow",
        "Mute",
        "Report innapropiate content",
        "Report user"
    ]

    // references to the elements (button and menu)
    const ButtonRef = useRef(null);
    const MenuRef = useRef(null);


    // state when menu open or close
    const [menu, setMenu] = useState(false)

    // state for handling menu animation
    const [animation, setAnimation] = useState(false)

    useEffect(() => {
        // calling the function to set position to the menu
        updateSettings();
    }, [menu]);

    // positions and settings for the menu
    const [settings, setSettings] = useState({
        x: null,
        y: null
    })


    // clicking outside the menu in order to close itself
    useEffect(() => {
        let handler = e => {
            if (e.target === ButtonRef.current) return;
            if (menu && MenuRef) {
                if (!MenuRef.current.contains(e.target)) {
                    setAnimation(false)
                    setTimeout(() => {
                        setMenu(false)
                    }, 100);
                }
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    })


    // when resizing the screen, positioning the menu to the new settings
    useEffect(() => {
        let handler = () => {
            updateSettings()
        }

        window.addEventListener("resize", handler)

        return () => window.removeEventListener("resize", handler)
    })


    // onscroll
    useEffect(() => {
        let handler = e => {
            updateSettings()
        }
        document.addEventListener("scroll", handler)
        return () => document.removeEventListener("scroll", handler)
    })


    // function to update the settings when menu is open or when resizing the screen
    const updateSettings = () => {
        if (menu && MenuRef.current) {
            const { x, y, width, height, top, right, bottom, left } = ButtonRef?.current?.getBoundingClientRect()
            setSettings({
                x: (left - MenuRef.current.clientWidth) + width,
                y: (y > (window.innerHeight - MenuRef.current.clientHeight))
                    ? ((y - MenuRef.current.clientHeight) + height)
                    : y
            })
        } else {
            setSettings({
                x: null,
                y: null
            })
        }

    }


    return (
        <>
            {/* button */}
            <button ref={ButtonRef} onClick={(e) => {
                setAnimation(true)
                setMenu(!menu)
            }} className='border'>Open</button>


            {/* menu */}
            {menu && ReactDOM.createPortal(
                <>
                    <div className="z-40 fixed top-0 left-0 w-full h-screen"></div>

                    <div ref={MenuRef} style={{ top: settings.y, left: settings.x }} role='menu' className={`${animation ? "showMenu" : "hideMenu"} h-auto overflow-y-auto max-h-[90vh] w-60 fixed z-50 shadow-lg bg-white rounded-md py-1 border`}>
                        {options.map((el, i) => (
                            <div key={i} className='p-1.5 hover:bg-gray-100 text-sm font-medium active:bg-gray-200 duration-100 cursor-pointer' role="menuitem">{el}</div>
                        ))}
                    </div>
                </>,
                document.body
            )}
        </>
    )
}

export default MenuOptions