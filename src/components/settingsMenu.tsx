"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

const settingsMenu = ({
                          closeOrReopenVoting,
                          votingIsOpen,
                          anonymousVoting,
                          anonymousVote,
                          positiveOnly,
                          setPositiveOnly,
                          allowedVotes,
                          setAllowedVotes,
                          endDate,
                          setEndDate,
                          setUserCanAddItems,
                          userCanAddItems,
                          deleteVoting,
                          setTitle,
                          setDesc,
                          title,
                          desc
                      }: {
    closeOrReopenVoting: any,
    votingIsOpen: boolean,
    anonymousVoting: boolean
    anonymousVote: any,
    positiveOnly: boolean
    setPositiveOnly: any
    allowedVotes: number
    setAllowedVotes: any
    endDate: null | Date
    setEndDate: any,
    setUserCanAddItems: any
    userCanAddItems: boolean,
    deleteVoting: any,
    setTitle: any,
    title: string,
    setDesc: any,
    desc: string
}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const savedSetting = typeof window !== 'undefined'
            ? localStorage.getItem("settingsMenu")
            : "false"
        if (savedSetting) {
            setIsOpen(JSON.parse(savedSetting));
        }
    }, []);

    function toggleSettings() {
        localStorage.setItem("settingsMenu", JSON.stringify(!isOpen))
        setIsOpen(!isOpen)
    }

    return (
        <>
            <button
                onClick={toggleSettings}
                data-tip={"Settings"}
                className={"absolute right-4 top-4 btn btn-secondary btn-sm text-white p-2 rounded tooltip tooltip-left"}
            >
                <FontAwesomeIcon icon={fas.faGear} className={"cursor-pointer"}/>
            </button>
            {isOpen &&
                <div
                    className={"fixed inset-0"}
                >
                    <div
                        onClick={toggleSettings}
                        className={"fixed inset-0 bg-neutral bg-opacity-50"}
                    >

                    </div>
                    <div
                        className={"absolute right-0 top-0 bottom-0 bg-base-300 shadow-lg p-4 md:w-96 w-full z-[100] flex flex-col gap-4 pt-20"}
                    >
                        <h3
                            className={"text-lg font-bold text-primary flex items-center justify-between gap-2"}
                        >
                            <span>Settings</span>
                            <button
                                onClick={toggleSettings}
                                data-tip={"Close settings"}
                                className={"btn btn-error btn-sm text-white p-2 rounded tooltip tooltip-left aspect-square"}
                            >
                                <FontAwesomeIcon icon={fas.faTimes}/>
                            </button>
                        </h3>
                        <div
                            className={"flex items-center gap-2 justify-between"}
                        >
                            <span>
                                Voting is {votingIsOpen ? "open" : "closed"}
                            </span>
                            <button
                                onClick={() => closeOrReopenVoting("if it works dont touch it")}
                                data-tip={votingIsOpen ? "Close voting" : "Reopen voting"}
                                className={"btn btn-secondary btn-sm text-white p-2 rounded tooltip tooltip-left aspect-square"}
                            >
                                {votingIsOpen ?
                                    <FontAwesomeIcon icon={fas.faLockOpen}/> :
                                    <FontAwesomeIcon icon={fas.faLock}/>
                                }
                            </button>
                        </div>
                        <div
                            className={"flex items-center gap-2 justify-between"}
                        >
                            <span>
                                Voting is {anonymousVoting ? "anonymous" : "not anonymous"}
                            </span>
                            <button
                                onClick={() => anonymousVote("if it works dont touch it")}
                                data-tip={anonymousVoting ? "Disable anonymous voting" : "Enable anonymous voting"}
                                className={"btn btn-secondary btn-sm text-white p-2 rounded tooltip tooltip-left aspect-square"}
                            >
                                {anonymousVoting ?
                                    <FontAwesomeIcon icon={fas.faUserSecret}/> :
                                    <FontAwesomeIcon icon={fas.faUser}/>
                                }
                            </button>
                        </div>
                        <div
                            className={"flex items-center gap-2 justify-between"}
                        >
                            <span>
                                Only positive votes are allowed
                            </span>
                            <button
                                onClick={() => setPositiveOnly('if it works dont touch it')}
                                data-tip={positiveOnly ? "Allow negative votes" : "Allow only positive votes"}
                                className={"btn btn-secondary btn-sm text-white p-2 rounded tooltip tooltip-left aspect-square"}
                            >
                                {positiveOnly ?
                                    <FontAwesomeIcon icon={fas.faThumbsUp}/> :
                                    <FontAwesomeIcon icon={fas.faThumbsDown}/>
                                }
                            </button>
                        </div>
                        <div
                            className={"flex items-center gap-2 justify-between"}
                        >
                            <span>
                                Allowed votes per user: <span
                                className={"text-primary"}>{allowedVotes ? allowedVotes : "INF"}</span>
                            </span>
                            <div
                                className={"flex gap-2"}
                            >
                                <button
                                    onClick={() => setAllowedVotes(allowedVotes + 1)}
                                    data-tip={"Add vote"}
                                    className={"btn btn-secondary btn-sm text-white p-2 rounded tooltip tooltip-left aspect-square"}
                                >
                                    <FontAwesomeIcon icon={fas.faPlus}/>
                                </button>
                                <button
                                    onClick={() => setAllowedVotes(Math.abs(allowedVotes - 1))}
                                    data-tip={"Remove vote"}
                                    className={"btn btn-secondary btn-sm text-white p-2 rounded tooltip tooltip-left aspect-square"}
                                >
                                    <FontAwesomeIcon icon={fas.faMinus}/>
                                </button>
                            </div>
                        </div>
                        <div
                            className={"flex items-center gap-2 justify-between"}
                        >
                            <span>
                                Voting ends at: <span
                                className={"text-primary"}
                            >{endDate ? endDate.toLocaleString("de-CH", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                            }) : "never"}</span>
                            </span>
                            <div
                                className={"flex gap-2"}
                            >
                                {
                                    endDate &&
                                    <button
                                        onClick={() => setEndDate(null)}
                                        data-tip={"Remove end date"}
                                        className={"btn btn-error btn-sm text-white p-2 rounded tooltip tooltip-left aspect-square"}
                                    >
                                        <FontAwesomeIcon icon={fas.faCalendarTimes}/>
                                    </button>
                                }
                                <input
                                    type={"date"}
                                    data-tip={"Set end date"}
                                    defaultValue={endDate ? endDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
                                    onChange={(e) => setEndDate(new Date(e.target.value))}
                                    className={"btn btn-secondary btn-sm text-white p-2 rounded tooltip tooltip-left aspect-square"}
                                />
                            </div>
                        </div>
                        <div
                            className={"flex items-center gap-2 justify-between"}
                        >
                            <span>
                                Users can add items
                            </span>
                            <button
                                onClick={() => setUserCanAddItems(!userCanAddItems)}
                                data-tip={userCanAddItems ? "Disable adding items" : "Enable adding items"}
                                className={"btn btn-secondary btn-sm text-white p-2 rounded tooltip tooltip-left aspect-square"}
                            >
                                {userCanAddItems ?
                                    <FontAwesomeIcon icon={fas.faPlus}/> :
                                    <FontAwesomeIcon icon={fas.faMinus}/>
                                }
                            </button>
                        </div>
                        <div
                            className={"flex items-center gap-2 justify-between"}
                        >
                            <span>
                                Set a title
                            </span>
                            <button
                                onClick={() => {
                                    const newTitle = prompt("Enter a Title", title)
                                    if (newTitle) {
                                        setTitle(newTitle)
                                    }
                                }}
                                className={"btn btn-secondary btn-sm text-white p-2 rounded aspect-square"}
                            >
                                <FontAwesomeIcon icon={fas.faPen}/>
                            </button>
                        </div>
                        <div
                            className={"flex items-center gap-2 justify-between"}
                        >
                            <span>
                                Set a description
                            </span>
                            <button
                                onClick={() => {
                                    const newDesc = prompt("Enter a description", desc)
                                    if (newDesc) {
                                        setDesc(newDesc)
                                    }
                                }}
                                className={"btn btn-secondary btn-sm text-white p-2 rounded aspect-square"}
                            >
                                <FontAwesomeIcon icon={fas.faPen}/>
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                const confirm = window.confirm("Are you sure you want to delete this voting?")
                                if (confirm) {
                                    deleteVoting()
                                    setIsOpen(false)
                                }
                            }}
                            data-tip={"Delete voting"}
                            className={"btn btn-error btn-sm text-white p-2 rounded tooltip tooltip-left"}
                        >
                            <FontAwesomeIcon icon={fas.faTrash} className={"cursor-pointer"}/>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default settingsMenu;