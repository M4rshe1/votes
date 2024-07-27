"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import Link from "next/link";

const VoteCardItem = ({title, description, id, isOwner, status, deleteHandler, code}: {
    title: string,
    description: string,
    id: string,
    isOwner: boolean,
    status: "open" | "closed" | "ended",
    deleteHandler: (voteId: string) => void,
    code: string
}) => {

    const router = useRouter()

    function editSettings() {
        localStorage.setItem("settingsMenu", "true")
        router.push(`/vote/${code}`)
    }

    return (
        <div className="shadow-md rounded p-4 border border-neutral relative">
            <h2 className="text-lg font-bold">{title}</h2>
            <p>{description}</p>
            <div className="flex justify-between items-center mt-4">
                <span
                    className={`text-sm font-semibold ${status === "open" ? "text-success" : "text-error"}`}>{status}</span>
                {isOwner && <div
                    className={`flex gap-2`}
                >
                    <button onClick={
                        () => deleteHandler(id)
                    } className="btn btn-error btn-sm aspect-square text-white">
                        <FontAwesomeIcon icon={fas.faTrash}/>
                    </button>
                    <button onClick={editSettings} className="btn btn-secondary btn-sm aspect-square text-white">
                        <FontAwesomeIcon icon={fas.faGear}/>
                    </button>
                </div>
                }
            </div>
            <Link href={`/vote/${code}`}>
                <FontAwesomeIcon icon={fas.faArrowRight} className="absolute top-4 right-4 cursor-pointer"/>
            </Link>
        </div>
    )
}

export default VoteCardItem