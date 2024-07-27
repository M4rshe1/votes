import {authOptions} from "@/lib/authOptions";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import db from "@/lib/db";
import VoteCardItem from "@/components/voteCardItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";

const Page = async () => {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return redirect('/api/auth/signin')
    }

    const ownedVotes = await db.voteOwner.findMany({
        where: {
            user: {
                email: session.user.email as string
            }
        },
        include: {
            vote: true
        }
    })

    const votedVotes = await db.userVoteItem.findMany({
        where: {
            user: {
                email: session.user.email as string
            }
        },
        include: {
            vote: true
        },
        distinct: ['voteId']
    })

    async function deleteVote(voteId: string) {
        "use server";
        await db.vote.delete({
            where: {
                id: voteId
            }
        })
    }

    return (
        <main className="h-full w-full lg:max-w-4xl md:max-w-3xl flex flex-col items-center px-4 mb-8 relative">
            <div>
                <h1
                    className={`text-2xl font-bold text-primary text-center w-full mt-8 mb-4`}
                >
                    My Votes
                </h1>
                <div
                    className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}
                >
                    {
                        ownedVotes.map((ownedVote, index) => {
                            const currentDate = new Date()
                            currentDate.setHours(0, 0, 0, 0)
                            let status = "open"
                            if (ownedVote.vote.endDate) {
                                const endDate = new Date(ownedVote.vote.endDate)
                                endDate.setHours(0, 0, 0, 0)
                                // @ts-ignore
                                status = endDate < currentDate ? "ended" : ownedVotes.vote.startDate > currentDate ? "open" : "closed"
                            }
                            console.log(ownedVote)
                            return (
                                <VoteCardItem
                                    key={index}
                                    title={ownedVote.vote.title}
                                    description={ownedVote.vote.description as string}
                                    id={ownedVote.vote.id}
                                    isOwner={true}
                                    status={status as "open" | "closed" | "ended"}
                                    deleteHandler={deleteVote}
                                    code={ownedVote.vote.code}
                                />
                            )
                        })
                    }
                    <div className="shadow-md rounded p-4 border border-neutral relative">
                        <h2 className="text-lg font-bold w-1/2 h-6 skeleton"></h2>
                        <p className={`skeleton w-full h-4 mt-2`}></p>
                        <p className={`skeleton w-2/3 h-4 mt-1`}></p>
                        <div className="flex justify-between items-center mt-4">
                            <span className={`skeleton text-sm font-semibold w-1/4 h-4`}></span>
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
                            className={`btn btn-primary`}
                            >
                                <FontAwesomeIcon icon={fas.faPlus}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1
                className={`text-2xl font-bold text-primary text-center w-full mt-8 mb-4`}
                >
                    Voted Votes
                </h1>
                <div className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
                    {
                        votedVotes.map((votedVote, index) => {
                            const currentDate = new Date()
                            currentDate.setHours(0, 0, 0, 0)
                            let status = "open"
                            if (votedVote.vote.endDate) {
                                const endDate = new Date(votedVote.vote.endDate)
                                endDate.setHours(0, 0, 0, 0)
                                // @ts-ignore
                                status = endDate < currentDate ? "ended" : votedVote.vote.startDate > currentDate ? "open" : "closed"
                            }
                            return (
                                <VoteCardItem
                                    key={index}
                                    title={votedVote.vote.title}
                                    description={votedVote.vote.description as string}
                                    id={votedVote.vote.id}
                                    isOwner={false}
                                    status={status as "open" | "closed" | "ended"}
                                    deleteHandler={deleteVote}
                                    code={votedVote.vote.code}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </main>
    );
}

export default Page;
