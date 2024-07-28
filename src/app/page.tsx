import {authOptions} from "@/lib/authOptions";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import db from "@/lib/db";
import VoteCardItem from "@/components/voteCardItem";
import CreateVote from "@/components/createVote";
import {revalidatePath} from "next/cache";

const Page = async () => {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return redirect('/auth/login')
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

        await db.userVoteItem.deleteMany({
            where: {
                voteId: voteId
            }
        })

        await db.voteItem.deleteMany({
            where: {
                voteId: voteId
            }
        })

        await db.voteOwner.deleteMany({
            where: {
                voteId: voteId
            }
        })

        await db.vote.delete({
            where: {
                id: voteId
            }
        })

        revalidatePath("/")
    }

    async function createVote() {
        "use server";

        await new Promise((resolve) => setTimeout(resolve, 9000))

        const code = Math.random().toString(36).substring(2, 32)

        await db.vote.create({
            data: {
                title: "New Vote",
                description: "Description",
                code: code,
                voteOwner: {
                    create: {
                        user: {
                            connect: {
                                // @ts-ignore
                                email: session.user.email as string
                            }
                        }
                    }
                }
            }
        })
        return redirect(`/vote/${code}`)
    }

    return (
        <main className="h-full w-full lg:max-w-4xl md:max-w-3xl flex flex-col items-center px-4 mb-8 relative">
            <div
            className={`w-full h-full`}
            >
                <h1
                    className={`text-2xl font-bold text-primary text-center w-full mt-8 mb-4`}
                >
                    My Votes
                </h1>
                <div
                    className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}
                >
                    <CreateVote handleCreate={createVote}/>
                    {
                        ownedVotes.map((ownedVote, index) => {
                            const currentDate = new Date()
                            currentDate.setHours(0, 0, 0, 0)
                            let status = "open"
                            if (ownedVote.vote.endDate) {
                                const endDate = new Date(ownedVote.vote.endDate)
                                endDate.setHours(0, 0, 0, 0)
                                // @ts-ignore
                                status = endDate < currentDate ? "ended" : !ownedVote.vote.isClosed ? "open" : "closed"
                            }

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
                                    endDate={ownedVote.vote.endDate}
                                />
                            )
                        })
                    }
                </div>
            </div>
            {
                votedVotes.length > 0 &&
            <div
            className={`w-full h-full`}
            >
                <h1
                    className={`text-2xl font-bold text-primary text-center w-full mt-8 mb-4`}
                >
                    Voted Votes
                </h1>
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full`}>
                    {
                        votedVotes.map((votedVote, index) => {
                            const currentDate = new Date()
                            currentDate.setHours(0, 0, 0, 0)
                            let status = "open"
                            if (votedVote.vote.endDate) {
                                const endDate = new Date(votedVote.vote.endDate)
                                endDate.setHours(0, 0, 0, 0)
                                // @ts-ignore
                                status = endDate < currentDate ? "ended" : !votedVote.vote.isClosed ? "open" : "closed"
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
                                    endDate={votedVote.vote.endDate}
                                />
                            )
                        })
                    }
                </div>
            </div>
            }
        </main>
    );
}

export default Page;
