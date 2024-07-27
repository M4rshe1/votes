const VoteDiagram = async ({vote}: { vote: any }) => {
    const voteItemScores = vote.voteItems.map((item: any) => {
        return {
            [item.id]: item.userVoteItems.filter((vote: any) => vote.voteType === "UPVOTE").length - item.userVoteItems.filter((vote: any) => vote.voteType === "DOWNVOTE").length
        }
    }).reduce((acc: any, item: any) => {
        return {...acc, ...item}
    })

    const positiveVoteItems = vote.voteItems.filter((item: any) => {
        return item.userVoteItems.filter((vote: any) => vote.voteType === "UPVOTE").length >= item.userVoteItems.filter((vote: any) => vote.voteType === "DOWNVOTE").length
    }).sort((a: any, b: any) => {
        return voteItemScores[b.id] - voteItemScores[a.id]
    })

    const positiveMax = Math.max(...positiveVoteItems.map((item: any) => item.userVoteItems.filter((vote: any) => vote.voteType === "UPVOTE").length))

    const negativeVoteItems = vote.voteItems.filter((item: any) => {
        return item.userVoteItems.filter((vote: any) => vote.voteType === "UPVOTE").length < item.userVoteItems.filter((vote: any) => vote.voteType === "DOWNVOTE").length
    }).sort((a: any, b: any) => {
        return voteItemScores[b.id] - voteItemScores[a.id]
    })

    const negativeMax = Math.max(...negativeVoteItems.map((item: any) => item.userVoteItems.filter((vote: any) => vote.voteType === "DOWNVOTE").length))
    return (
        <div className="w-full flex flex-col items-center justify-center border-neutral rounded-lg border mt-4">
            {
                positiveVoteItems.length !== 0 &&
                <div
                    className={"w-full h-48 flex items-end justify-between border-b border-neutral gap-1 px-1"}
                >
                    {
                        positiveVoteItems.map((item: any, index: number) => (
                            <div
                                key={index}
                                className={"w-full h-full bg-success rounded-t-lg relative"}
                                style={{
                                    height: `${(voteItemScores[item.id] / positiveMax) * 80}%`
                                }}
                            >
                                <p
                                    data-tip={item.title}
                                    className={"text-center text-default-content absolute -top-6 font-bold w-full cursor-default tooltip"}
                                >
                                    {voteItemScores[item.id]}
                                </p>
                            </div>
                        ))
                    }
                    {
                        negativeVoteItems.map((item: any, index: number) => (
                            <div
                                key={index}
                                className={"w-full h-0 bg-error rounded-t-lg relative"}
                            >
                                <p
                                    className={"text-center text-default-content absolute -top-6 font-bold w-full"}
                                >
                                </p>
                            </div>
                        ))
                    }
                </div>
            }
            {
                negativeVoteItems.length !== 0 &&
                <div
                    className={"w-full h-48 flex items-start justify-between border-t border-neutral gap-1 px-1"}
                >
                    {
                        positiveVoteItems.map((item: any, index: number) => (
                            <div
                                key={index}
                                className={"w-full h-0 bg-success rounded-b-lg relative"}
                            >
                                <p
                                    className={"text-center text-default-content absolute -bottom-6 font-bold w-full"}
                                >
                                </p>
                            </div>
                        ))
                    }
                    {
                        negativeVoteItems.map((item: any, index: number) => (
                            <div
                                key={index}
                                className={"w-full h-full bg-error rounded-b-lg relative"}
                                style={{
                                    height: `${(Math.abs(voteItemScores[item.id]) / negativeMax) * 80}%`
                                }}
                            >
                                <p
                                    data-tip={item.title}
                                    className={"text-center text-default-content absolute -bottom-6 font-bold w-full cursor-default tooltip tooltip-bottom"}
                                >
                                    {Math.abs(voteItemScores[item.id])}
                                </p>
                            </div>
                        ))
                    }
                </div>
            }

        </div>
    )
}

export default VoteDiagram;