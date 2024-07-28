"use client";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import ProgressBar from "@/components/progressBar";

const CreateVote = ({handleCreate}: { handleCreate: () => void }) => {
    const [isLoading, setIsLoading] = useState(false)
    return (
        <>
        <div className="shadow-md rounded p-4 border border-neutral relative">
            <h2 className="text-lg font-bold w-1/2 h-6 skeleton"></h2>
            <p className={`skeleton w-full h-4 mt-2`}></p>
            <p className={`skeleton w-2/3 h-4 mt-1`}></p>
            <div className="flex justify-between items-end mt-4">
                <div className={`flex gap-2 flex-col w-full`}>
                    <span className={`skeleton text-sm font-semibold w-2/4 h-4`}></span>
                    <span className={`skeleton text-sm font-semibold w-3/4 h-4`}></span>
                </div>
                <div className={`flex gap-2`}>
                    <button className="btn btn-error btn-sm aspect-square text-white">
                        <FontAwesomeIcon icon={fas.faTrash}/>
                    </button>
                    <button className="btn btn-secondary btn-sm aspect-square text-white">
                        <FontAwesomeIcon icon={fas.faGear}/>
                    </button>
                </div>
            </div>
            <div>
                <FontAwesomeIcon icon={fas.faArrowRight} className="absolute top-4 right-4 cursor-pointer"/>
            </div>
            <div
                className={`absolute inset-0 bg-opacity-50 z-10 backdrop-blur flex items-center justify-center`}
            >
                <button
                    className={`btn btn-primary tooltip`}
                    onClick={() => {
                        setIsLoading(true)
                        localStorage.setItem("settingsMenu", "true")
                        handleCreate()
                    }}
                    data-tip={"Create Vote"}
                >
                    <FontAwesomeIcon icon={fas.faPlus}/>
                </button>
            </div>
        </div>
            {isLoading && <ProgressBar/>}
        </>

    )
}

export default CreateVote