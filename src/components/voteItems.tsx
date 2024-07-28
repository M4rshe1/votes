"use client";

import VoteItem from './voteItem';
import {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "@/components/progressBar";

const VoteItems = ({
                       vote, onVote, addVote, deleteVoteItem, isOwner, userEmail, positiveOnly, anonymousVoting
                   }
                       : {
                       vote: any,
                       onVote: any,
                       addVote: any,
                       deleteVoteItem: any,
                       isOwner: boolean,
                       userEmail: string,
                       positiveOnly: boolean,
                       anonymousVoting: boolean,
                   }
) => {
    const [isAddingVote, setIsAddingVote] = useState(false);
    const [inProgress, setInProgress] = useState(false);

    const voteItemScores = vote.voteItems.length > 0 ? vote.voteItems.map((item: any) => ({
        [item.id]: item.userVoteItems.filter((vote: any) => vote.voteType === "UPVOTE").length - item.userVoteItems.filter((vote: any) => vote.voteType === "DOWNVOTE").length
    })).reduce((acc: any, item: any) => ({...acc, ...item})) : {};

    const sortedVoteItems = vote.voteItems.sort((a: any, b: any) => {
        return voteItemScores[b.id] - voteItemScores[a.id]
    })

    function handleAddVote(formData: FormData) {
        setInProgress(true)
        addVote(formData)
        setIsAddingVote(false)
    }

    const isClosed = vote.isClosed || (vote.endDate && vote.endDate < new Date().toISOString());

    let offset = 0

    return (
        <div
            className={"grid gap-4 w-full grid-cols-1 lg:grid-cols-2 items-center"}
        >
            {sortedVoteItems.map((item: any, index: number) => {
                const lastVoteScore = sortedVoteItems[index - 1] ? voteItemScores[sortedVoteItems[index - 1].id] : 0;
                const isSameScore = voteItemScores[item.id] === lastVoteScore;
                if (isSameScore) {
                    offset++;
                } else {
                    offset = 0;
                }

                return <VoteItem
                    key={index}
                    item={item}
                    onVote={onVote}
                    index={index + 1 - offset}
                    deleteItem={deleteVoteItem}
                    isOwner={isOwner}
                    isClosed={isClosed}
                    userEmail={userEmail}
                    positiveOnly={positiveOnly}
                    anonymousVoting={anonymousVoting}
                />
            })}
            {
                sortedVoteItems.length === 0 && (
                    <div
                        className={"lg:col-span-2 flex items-center justify-center"}
                    >
                        No votes
                    </div>
                )
            }
            {
                ((vote.usersCanAddItems && !isClosed) || isOwner) && (
                    <div
                        className="flex flex-col gap-2 justify-between p-4 border rounded border-neutral relative w-full h-full">

                        <div>
                            <div
                                className={"flex flex-row items-center gap-1"}
                            >

                                <h2
                                    className={"skeleton w-4 h-4"}
                                ></h2>
                                <h2
                                    className={"skeleton w-1/2 h-4 mt-2"}
                                ></h2>
                            </div>
                            <div>
                                <h2
                                    className={"skeleton w-full h-4 mt-2"}
                                ></h2>
                                <h2
                                    className={"skeleton w-1/4 h-4 mt-1"}
                                ></h2>
                            </div>
                        </div>
                        <div
                            className={"flex items-center justify-between"}
                        >
                            <div
                                className={"join join-horizontal"}
                            >
                                <div
                                    className={"join-item flex text-neutral-content cursor-pointer items-center justify-center bg-neutral hover:bg-success hover:text-white p-1 transition-all ease-in-out duration-300 px-2 py-1"}
                                >
                                    <FontAwesomeIcon icon={fas.faUpLong}/>
                                    <span
                                        className={"skeleton w-4 h-4 ml-1"}
                                    ></span>
                                </div>
                                <div
                                    className={"join-item flex text-neutral-content cursor-pointer items-center justify-center bg-neutral hover:bg-error hover:text-white p-1 transition-all ease-in-out duration-300 px-2 py-1"}
                                >
                                    <FontAwesomeIcon icon={fas.faDownLong}/>
                                    <span
                                        className={"skeleton w-4 h-4 ml-1"}
                                    ></span>
                                </div>
                            </div>
                            <div
                                className={"flex items-center gap-2"}
                            >
                                {
                                    isOwner &&
                                    <div
                                        data-tip={"Delete Item"}
                                        className={"tooltip text-neutral-content join-item cursor-pointer flex items-center aspect-square h-8 rounded justify-center bg-neutral hover:bg-error hover:text-white p-1 transition-all ease-in-out duration-300"}
                                    >
                                        <FontAwesomeIcon icon={fas.faTrash}/>
                                    </div>
                                }

                                <div
                                    data-tip={"Neutral vote"}
                                    className={"tooltip text-neutral-content join-item cursor-pointer flex items-center aspect-square h-8 rounded justify-center bg-neutral hover:bg-primary hover:text-white p-1 transition-all ease-in-out duration-300"}
                                >
                                    <FontAwesomeIcon icon={fas.faLeftRight}/>
                                </div>
                            </div>
                        </div>
                        <div
                            className={"absolute inset-0 flex items-center justify-center backdrop-blur"}
                        >
                            <button
                                className={"btn btn-primary"}
                                onClick={() => setIsAddingVote(!isAddingVote)}
                            >Add Item
                            </button>
                        </div>
                    </div>
                )
            }
            {
                isAddingVote && (
                    <div
                        className={"fixed inset-0 flex items-center justify-center bg-neutral bg-opacity-50"}
                    >
                        <div
                            className={"fixed inset-0 bg-neutral bg-opacity-50"}
                            onClick={() => setIsAddingVote(false)}
                        ></div>
                        <form action={handleAddVote}
                              className={"flex flex-col gap-4 p-4 bg-base-100 rounded-lg z-40"}
                        >

                            <label
                                className={"flex flex-col gap-2"}
                            >
                                <span>Title</span>
                                <input type="text"
                                       placeholder={"Title"}
                                       className={"input input-bordered"}
                                       name={"title"}
                                />
                            </label>
                            <label
                                className={"flex flex-col gap-2"}
                            >
                                <span>Description</span>
                                <textarea
                                    placeholder={"Description"}
                                    className={"textarea textarea-bordered resize h-48"}
                                    name={"description"}
                                />
                            </label>
                            <div
                                className={"flex items-center justify-between gap-4"}
                            >
                                <input type="submit"
                                       className={"btn btn-primary grow"}
                                       value={"Add"}
                                />
                                <input type="button"
                                       className={"btn btn-error grow"}
                                       value={"Cancel"}
                                       onClick={() => setIsAddingVote(false)}
                                />
                            </div>
                        </form>
                    </div>
                )
            }
            {
                inProgress && <ProgressBar/>
            }
        </div>
    )
}

export default VoteItems;