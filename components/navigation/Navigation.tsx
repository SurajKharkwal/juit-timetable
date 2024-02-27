import React from 'react'
import DropDown from '../home-page/DropDown';

const Navigation = () => {
    return (
        <nav className='w-full fixed top-0 left-0 flex items-center justify-center  h-[10vh]'>
            <div className='max-w-[100vw] md:max-w-[90vw] flex items-center justify-end pl-4 pr-4 w-full h-full '>
                <p
                    className='opacity-0 sm:opacity-100 text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold"'>
                    Check out our</p>
                <DropDown />
            </div>

        </nav>
    )
}

export default Navigation
