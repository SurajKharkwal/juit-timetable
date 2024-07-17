'use client'

import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

type Props = {
}

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

const DaysSlider = ({ }: Props) => {

    //const name = 'slider' + number
    const name = - 'slider';

    const scrollNext = () => {
        const slider = document.querySelector(`.${name}`)
        if (!slider) return
        const width = slider.clientWidth
        slider.scrollLeft += width;
    }

    const scrollPrev = () => {
        const slider = document.querySelector(`.${name}`)
        if (!slider) return
        const width = slider.clientWidth
        slider.scrollLeft -= width;
    }

    return (
        <div className="w-full ms-5 flex gap-x-2 items-center">
            <button onClick={() => scrollPrev()}>
                <BsChevronLeft />
            </button>
            <div className={`${name} w-[80%] flex gap-1 overflow-hidden scroll-smooth text-sm`}>
                {
                    days.map((day, i) => {
                        return (
                            <div key={i} className="w-max px-3 py-1 flex justify-center items-center shrink-0 bg-blue-500 text-white rounded-xl hover:bg-blue-700 duration-150">
                                {day}
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={() => scrollNext()}>
                <BsChevronRight />
            </button>
        </div>
    )
}

export default DaysSlider;
