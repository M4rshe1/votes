import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {VoteField} from "@prisma/client";
import Image from "next/image";


const VoteItem = (
    {
        item, onVote, index, deleteItem, isOwner, isClosed, userEmail, positiveOnly, anonymousVoting
    }: {
        item: any,
        onVote: any,
        index: number,
        deleteItem: any,
        isOwner: boolean,
        isClosed: boolean,
        userEmail: string,
        positiveOnly: boolean,
        anonymousVoting: boolean
    }
) => {

    const userVote = item.userVoteItems.find((vote: any) => vote.user.email === userEmail)?.voteType;

    return (
        <div className="flex flex-col gap-2 justify-between p-4 border rounded border-neutral h-full w-full">
            <div>
                <h2 className={"text-secondary font-bold flex items-center justify-between"}>
                    <div>
                        <span className={"text-2xl text-secondary"}>#{index + 1}</span> {item.title}
                    </div>
                    <div>
                        {userVote === VoteField.UPVOTE &&
                            <FontAwesomeIcon
                                data-tip={"You upvoted this item"}
                                icon={fas.faUpLong} className={"text-success tooltip"}/>
                        }
                        {userVote === VoteField.DOWNVOTE &&
                            <FontAwesomeIcon
                                data-tip={"You downvoted this item"}
                                icon={fas.faDownLong} className={"text-error tooltip"}/>
                        }
                        {
                            userVote === VoteField.NEUTRAL &&
                            <FontAwesomeIcon
                                data-tip={"You voted neutral on this item"}
                                icon={fas.faLeftRight} className={"text-primary tooltip"}/>
                        }
                    </div>
                </h2>
                <p
                    className={"w-full mt-2 text-base text-neutral-500 overflow-ellipsis overflow-hidden whitespace-"}
                >
                    {item.description || "No description"}
                </p>
            </div>
            {!isClosed &&
                <div
                    className={"flex items-center justify-between"}
                >
                    <div
                        className={"join join-horizontal"}
                    >
                        <div
                            onClick={() => onVote(item.id, VoteField.UPVOTE)}
                            className={"join-item text-neutral-content flex cursor-pointer items-center justify-center bg-neutral hover:bg-success hover:text-white p-1 transition-all ease-in-out duration-300 px-2 py-1"}
                        >
                            <FontAwesomeIcon icon={fas.faUpLong}/>
                            <span className={"font-bold ml-2"}>
                            {item.userVoteItems.filter((vote: any) => vote.voteType === VoteField.UPVOTE).length}
                        </span>
                        </div>
                        {
                            !positiveOnly &&
                            <div
                                onClick={() => onVote(item.id, VoteField.DOWNVOTE)}
                                className={"join-item text-neutral-content flex cursor-pointer items-center justify-center bg-neutral hover:bg-error hover:text-white p-1 transition-all ease-in-out duration-300 px-2 py-1"}
                            >
                                <FontAwesomeIcon icon={fas.faDownLong}/>
                                <span className={"font-bold ml-2"}>
                            {item.userVoteItems.filter((vote: any) => vote.voteType === VoteField.DOWNVOTE).length}
                        </span>
                            </div>
                        }
                    </div>
                    {!anonymousVoting &&
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                            {
                                item.userVoteItems.slice(0, 3).map((vote: any, index: number) => (
                                    vote.user.image ?
                                        <div
                                            data-tip={vote.user.name + " - " + vote.voteType}
                                            key={index} className="avatar tooltip">
                                            <div className="w-12">
                                                <Image src={vote.user.image} alt={vote.user.name} width={32} height={32}
                                                       className="rounded-full"/>
                                            </div>
                                        </div> :
                                        < div
                                            key={index}
                                            data-tip={vote.user.name + " - " + vote.voteType}
                                            className="avatar placeholder tooltip">
                                            <div className="bg-neutral text-neutral-content w-8 rounded-full">
                                                <span>{vote.user.name.charAt(0)}</span>
                                            </div>
                                        </div>
                                ))
                            }
                            {
                                item.userVoteItems.length > 3 &&
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content w-8">
                                        <span>+{item.userVoteItems.length - 3}</span>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                    <div
                        className={"flex items-center gap-2"}
                    >
                        {
                            isOwner &&
                            <div
                                onClick={() => deleteItem(item.id)}
                                data-tip={"Delete Item"}
                                className={"tooltip text-neutral-content join-item cursor-pointer flex items-center aspect-square h-8 rounded justify-center bg-neutral hover:bg-error hover:text-white p-1 transition-all ease-in-out duration-300"}
                            >
                                <FontAwesomeIcon icon={fas.faTrash}/>
                            </div>
                        }

                        <div
                            onClick={() => onVote(item.id, VoteField.NEUTRAL)}
                            data-tip={"Neutral vote"}
                            className={"tooltip text-neutral-content join-item cursor-pointer flex items-center aspect-square h-8 rounded justify-center bg-neutral hover:bg-primary hover:text-white p-1 transition-all ease-in-out duration-300"}
                        >
                            <FontAwesomeIcon icon={fas.faLeftRight}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default VoteItem;