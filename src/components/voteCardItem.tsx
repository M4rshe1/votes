"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useState} from "react";
import ProgressBar from "@/components/progressBar";

const VoteCardItem = ({title, description, id, isOwner, status, deleteHandler, code, endDate}: {
    title: string,
    description: string,
    id: string,
    isOwner: boolean,
    status: "open" | "closed" | "ended",
    deleteHandler: (voteId: string) => void,
    code: string,
    endDate: Date | null
}) => {
    const [inProgress, setInProgress] = useState(false)
    const router = useRouter()

    function editSettings() {
        localStorage.setItem("settingsMenu", "true")
        router.push(`/vote/${code}`)
    }

    return (
        <>
        <div className="shadow-md rounded p-4 border h-full border-neutral relative flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-bold">{title}</h2>
                <p>{description}</p>
            </div>
            <div className="flex justify-between items-end mt-4">
                <div
                    className={`flex gap-2 flex-col`}
                >

                    <span
                        className={`text-sm font-semibold ${status === "open" ? "text-success" : "text-error"}`}>{status}</span>
                    {
                        endDate && <span
                            className="text-sm">Ends: {endDate.toLocaleDateString("de-CH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}</span>
                    }
                </div>
                <div
                    className={`flex gap-2 justify-between`}
                >

                    {isOwner && <div
                        className={`flex gap-2`}
                    >
                        <button onClick={
                            () => {
                                const confirm = window.confirm("Are you sure you want to delete this vote?")
                                if (confirm) {

                                    deleteHandler(id)
                                }
                            }
                        }
                                className="btn btn-error btn-sm aspect-square text-white tooltip flex items-center justify-center"
                                data-tip={"Delete Vote"}
                        >
                            <FontAwesomeIcon icon={fas.faTrash}/>
                        </button>
                        <button onClick={editSettings}
                                className="btn btn-secondary btn-sm aspect-square text-white tooltip flex items-center justify-center"
                                data-tip={"Edit Settings"}
                        >
                            <FontAwesomeIcon icon={fas.faGear}/>
                        </button>
                    </div>
                    }
                </div>
            </div>
            <Link href={`/vote/${code}`} className="absolute top-2 right-4 cursor-pointer">
                <FontAwesomeIcon icon={fas.faArrowRight}/>
            </Link>
        </div>
            {inProgress && <ProgressBar/>}
        </>
    )
}

export default VoteCardItem