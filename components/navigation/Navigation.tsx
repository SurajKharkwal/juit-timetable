import React from 'react'
import DropDown from '../home-page/DropDown';

const Navigation = () => {
    return (
        <nav className='w-full fixed top-0 left-0 flex items-center justify-center  h-[10vh]'>
            <div className='max-w-7xl flex items-center justify-end pl-4 pr-4 w-full h-full '>
                <DropDown />
            </div>

        </nav>
    )
}

export default Navigation