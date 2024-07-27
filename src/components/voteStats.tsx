const VoteStats = async ({vote}: { vote: any }) => {
    const stats = [
        {
            title: "Up votes",
            value: vote.voteItems.reduce((acc: number, item: any) => {
                return acc + item.userVoteItems.filter((vote: any) => vote.voteType === "UPVOTE").length
            }, 0).toString()
        },
        {
            title: "Down votes",
            value: vote.voteItems.reduce((acc: number, item: any) => {
                return acc + item.userVoteItems.filter((vote: any) => vote.voteType === "DOWNVOTE").length
            }, 0).toString()
        },
        {
            title: "Neutral votes",
            value: vote.voteItems.reduce((acc: number, item: any) => {
                return acc + item.userVoteItems.filter((vote: any) => vote.voteType === "NEUTRAL").length
            }, 0).toString()
        },
        {
            title: "Total votes",
            value: vote.voteItems.reduce((acc: number, item: any) => {
                return acc + item.userVoteItems.length
            }, 0).toString()
        },
        {
            title: "Unique voters",
            value: vote.voteItems.reduce((acc: Set<string>, item: any) => {
                item.userVoteItems.forEach((vote: any) => acc.add(vote.user.email));
                return acc;
            }, new Set()).size.toString()
        }
    ]

    return (
        <div className="w-full flex items-center justify-around my-6">
            {stats.map((stat, index) => (
                <VoteStat key={index} title={stat.title} value={stat.value}/>
            ))}
        </div>
    )
}

export const VoteStat = ({title, value}: { title: string, value: string }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-accent">{value}</h1>
            <p className="text-sm font-semibold text-center">{title}</p>
        </div>
    )
}

export const MiniVoteStat = ({title, value}: { title: string, value: string | Element }) => {
    return (
        <div className="flex flex-col items-center justify-center grow">
            <h1 className="text-lg font-bold text-accent">{value as string}</h1>
            <p className="text-xs font-semibold text-center">{title}</p>
        </div>
    )
}

export default VoteStats;