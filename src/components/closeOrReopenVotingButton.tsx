"use client";

const CloseOrReopenVotingButton = ({closeOrReopenVoting, isOpen}: { closeOrReopenVoting: any, isOpen: boolean }) => {
    return (
        <button
            onClick={() => closeOrReopenVoting("if it works dont touch it")}
            className={"btn btn-secondary btn-sm text-white p-2 rounded"}
        >
            {isOpen ? "Close voting" : "Reopen voting"}
        </button>
    )
}

export default CloseOrReopenVotingButton;