import db from "@/lib/db";
import {notFound, redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import VoteDiagram from "@/components/voteDiagram";
import VoteItems from "@/components/voteItems";
import {revalidatePath} from "next/cache";
import {VoteField} from "@prisma/client";
import CopyLink from "@/components/copyLink";
import VoteStats, {MiniVoteStat} from "@/components/voteStats";
import SettingsMenu from "@/components/settingsMenu";

const Page = async ({params}: { params: { id: string } }) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect("/auth/login")
    }
    const vote = await db.vote.findUnique({
        where: {code: params.id},
        include: {
            voteItems: {
                include: {
                    userVoteItems: {
                        include: {
                            user: true
                        }
                    },
                    createdBy: true
                }
            },
            voteOwner: {
                select: {
                    user: true
                }
            },
        }
    })

    if (!vote) {
        return notFound()
    }

    // write the vote variable to a json file
    // const fs = require('fs');
    // const voteJson = JSON.stringify(vote);
    // fs.writeFileSync('vote.json', voteJson, 'utf8');

    async function onVote(itemId: string, voteField: string) {
        "use server"

        const vote = await db.vote.findUnique({
            where: {
                code: params.id
            },
            include: {
                voteItems: {
                    include: {
                        userVoteItems: {
                            include: {
                                user: true
                            }
                        }
                    }
                },
                voteOwner: {
                    select: {
                        user: true
                    }
                },
                userVoteItems: {
                    include: {
                        user: true
                    }
                }
            }
        })

        if (!vote || vote.isClosed) {
            return revalidatePath("/vote/" + params.id)
        }

        // @ts-ignore
        const userVoteItems = vote.userVoteItems.filter((voteItem) => (voteItem.user.email === session.user.email && voteItem.voteField !== VoteField.NEUTRAL))

        if (vote.votesAllowed !== 0 && userVoteItems.length >= vote.votesAllowed && voteField != VoteField.NEUTRAL) {
            return revalidatePath("/vote/" + params.id)
        }

        const userVoteItem = await db.userVoteItem.findFirst({
            where: {
                voteItemId: itemId,
                user: {
                    // @ts-ignore
                    email: session.user.email
                }
            }
        })

        if (userVoteItem && userVoteItem.voteType !== voteField as VoteField) {
            await db.userVoteItem.delete({
                where: {
                    id: userVoteItem.id
                }
            })
        } else if (userVoteItem && userVoteItem.voteType === voteField as VoteField) {
            return revalidatePath("/vote/" + params.id)
        }

        await db.userVoteItem.create({
            data: {
                voteItem: {
                    connect: {
                        id: itemId
                    }
                },
                user: {
                    connect: {
                        // @ts-ignore
                        email: session.user.email
                    }
                },
                voteType: voteField as VoteField,
                vote: {
                    connect: {
                        code: params.id
                    }
                }
            }
        })

        return revalidatePath("/vote/" + params.id)
    }

    async function addVote(formData: FormData) {
        "use server"

        const vote = await db.vote.findUnique({
            where: {
                code: params.id
            }
        })

        if (!vote || vote.isClosed) {
            return revalidatePath("/vote/" + params.id)
        }

        await db.voteItem.create({
            data: {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                vote: {
                    connect: {
                        code: params.id
                    }
                },
                createdBy: {
                    connect: {
                        // @ts-ignore
                        email: session.user.email
                    }
                }
            }
        })

        return revalidatePath("/vote/" + params.id)
    }

    async function deleteVoteItem(itemId: string) {
        "use server"
        await db.userVoteItem.deleteMany({
            where: {
                voteItemId: itemId
            }
        })
        await db.voteItem.delete({
            where: {
                id: itemId
            }
        })
        return revalidatePath("/vote/" + params.id)
    }

    async function closeOrReopenVote(keep: string) {
        "use server"
        await db.vote.update({
            where: {
                code: params.id
            },
            data: {
                isClosed: !vote?.isClosed
            }
        })
        return revalidatePath("/vote/" + params.id)
    }

    async function anonymizeVote(keep: string) {
        "use server"
        await db.vote.update({
            where: {
                code: params.id
            },
            data: {
                anonymous: !vote?.anonymous
            }
        })
        return revalidatePath("/vote/" + params.id)
    }

    async function allowOnlyPositiveVotes(keep: string) {
        "use server"
        await db.vote.update({
            where: {
                code: params.id
            },
            data: {
                upVotesOnly: !vote?.upVotesOnly || false
            }
        })
        return revalidatePath("/vote/" + params.id)
    }

    async function allowVotes(votes: string) {
        "use server"
        await db.vote.update({
            where: {
                code: params.id
            },
            data: {
                votesAllowed: parseInt(votes)
            }
        })
        return revalidatePath("/vote/" + params.id)
    }

    async function setEndDate(date: string) {
        "use server"
        await db.vote.update({
            where: {
                code: params.id
            },
            data: {
                endDate: date
            }
        })
        return revalidatePath("/vote/" + params.id)
    }

    async function setUserCanAddItems(canAddItems: boolean) {
        "use server"
        await db.vote.update({
            where: {
                code: params.id
            },
            data: {
                usersCanAddItems: canAddItems
            }
        })
        return revalidatePath("/vote/" + params.id)
    }

    async function deleteVote() {
        "use server"
        await db.vote.delete({
            where: {
                code: params.id
            }
        })
        return redirect("/")
    }

    async function setTitle(title: string) {
        "use server"
        await db.vote.update({
            where: {
                code: params.id
            },
            data: {
                title: title
            }
        })
        return revalidatePath("/vote/" + params.id)
    }

    async function setDescription(description: string) {
        "use server"
        await db.vote.update({
            where: {
                code: params.id
            },
            data: {
                description: description
            }
        })
        return revalidatePath("/vote/" + params.id)
    }

    // @ts-ignore
    const isOwner = vote.voteOwner[0].user.email === session?.user.email;
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    let hasVotingEnded = false;
    if (vote.endDate) {
        const endDate = new Date(vote.endDate)
        endDate.setHours(0, 0, 0, 0)
        hasVotingEnded = endDate < currentDate
    }
    const uniqueVoters: { name: string, email: string, votes: any[] }[] = [];
    vote.voteItems.forEach((voteItem) => {
        voteItem.userVoteItems.forEach((userVoteItem) => {
            if (!uniqueVoters.some((voter) => voter.email === userVoteItem.user.email)) {
                uniqueVoters.push({
                    name: userVoteItem.user.name as string,
                    email: userVoteItem.user.email,
                    votes: vote.voteItems.flat().filter((item) => item.userVoteItems.some((vote) => vote.user.email === userVoteItem.user.email))
                });
            }
        });
    })

    return (
        <div className="h-full w-full lg:max-w-4xl md:max-w-3xl flex flex-col items-center px-4 mb-8 relative">

            <div
                className={"mt-5"}
            >

            </div>
            <h1
                className={"text-3xl font-bold mt-4 text-primary relative"}
            >
                {vote.title} <CopyLink
                className={"absolute text-base-content -right-6 top-1/2 transform translate-x-2 -translate-y-2/3 cursor-pointer"}
            />
            </h1>
            <p>
                {vote.description}
            </p>
            <div className={"w-full flex items-start justify-around mt-4 flex-wrap"}>
                <MiniVoteStat title={"Creator"} value={vote.voteOwner[0].user.name as string}/>
                <MiniVoteStat title={"Votes"}
                              value={vote.votesAllowed > 0 ? vote.votesAllowed.toString() : 'INF'}/>
                <MiniVoteStat title={"Positive only"} value={vote.upVotesOnly ? "Yes" : "No"}/>
                {
                    (hasVotingEnded || vote.isClosed) ? (
                        <MiniVoteStat title={"Status"} value={hasVotingEnded ? "Ended" : "Closed"}/>
                    ) : vote.endDate ? (
                        <MiniVoteStat title={"Ending"} value={new Date(vote.endDate).toLocaleString("de-CH", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        })}/>
                    ) : (
                        <MiniVoteStat title={"Status"} value={"Open"}/>
                    )
                }
                <MiniVoteStat title={"Anonymous"} value={vote.anonymous ? "Yes" : "No"}/>
            </div>

            {
                vote.voteItems.length > 0 ?
                    <VoteDiagram vote={vote}/> : <div
                        className={"w-full flex items-center justify-center mt-4 h-96 rounded border border-neutral"}
                    >
                        No votes
                    </div>
            }
            <VoteStats vote={vote}/>
            <VoteItems vote={vote}
                       onVote={onVote}
                       addVote={addVote}
                       deleteVoteItem={deleteVoteItem}
                       isOwner={isOwner}
                // @ts-ignore
                       userEmail={session.user.email}
                       positiveOnly={vote.upVotesOnly}
                       anonymousVoting={vote.anonymous}
            />
            {
                isOwner &&
                <SettingsMenu closeOrReopenVoting={closeOrReopenVote}
                              votingIsOpen={!vote.isClosed}
                              anonymousVoting={vote.anonymous}
                              anonymousVote={anonymizeVote}
                              positiveOnly={vote.upVotesOnly}
                              setPositiveOnly={allowOnlyPositiveVotes}
                              allowedVotes={vote.votesAllowed}
                              setAllowedVotes={allowVotes}
                              endDate={vote.endDate}
                              setEndDate={setEndDate}
                              setUserCanAddItems={setUserCanAddItems}
                              userCanAddItems={vote.usersCanAddItems}
                              deleteVoting={deleteVote}
                              setTitle={setTitle}
                              setDesc={setDescription}
                              title={vote.title}
                              desc={vote.description as string}
                />
            }
        </div>
    )
}

export default Page;
