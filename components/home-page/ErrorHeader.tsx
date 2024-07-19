'use client'
import { deleteCookie, getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

const ErrorHeader = () => {
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const cookieValue = getCookie('error')?.toString();
        if (cookieValue) {
            setIsError(true)
            deleteCookie('error')
        }
    }, [])

    return (
        <div className={`${isError ? "visible" : "hidden"} fixed top-0 left-0 w-full bg-red-500 text-white p-5 flex items-center justify-between shadow-md z-20`}>
            <span className='font-semibold'>
                Unable to fetch data, please try again
            </span>
            <button
                onClick={() => setIsError(false)}
                className="bg-transparent text-white font-semibold hover:text-gray-300 focus:outline-none"
            >
                &#10005;
            </button>
        </div>
    )
}

export default ErrorHeader;
