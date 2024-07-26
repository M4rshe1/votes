import React from 'react'
import {getServerSession} from 'next-auth'
import {authOptions} from '@/lib/authOptions'
import {LoginButton} from '@/lib/auth'
import Link from "next/link";
import Image from "next/image";
import {ThemeButton} from "@/components/themeButton"
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import {LogoutButton} from "@/lib/auth";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const fullConfig = resolveConfig(tailwindConfig);


const Header = async () => {
    const session = await getServerSession(authOptions)
    const themes: string[] = fullConfig.daisyui.themes
    return (
        <header
            className="sticky bg-base-200 top-0 z-50 w-full h-16 flex items-center justify-between"
        >
            <div className="navbar">
                <div className="flex-1">
                    <Link href={'/'} className="p-4 text-xl font-semibold flex items-center gap-2">
                        <FontAwesomeIcon icon={fas.faSquarePollVertical} className={"w-8 aspect-square text-primary text-5xl"}/>
                        NoVotes
                    </Link>
                </div>
                <div>
                    <div title="Change Theme"
                         className="dropdown dropdown-end hidden [@supports(color:oklch(0%_0_0))]:block ml-2">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24"
                                 className="h-5 w-5 stroke-current md:hidden">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                            </svg>
                            <span className="hidden md:inline">Theme</span>
                            <svg width="12px" height="12px"
                                 className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                            </svg>
                        </div>
                        <div
                            className="dropdown-content bg-base-200 rounded-box top-px max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 mt-16">
                            <div className="grid grid-cols-1 gap-3 p-3">
                                {
                                    themes.map((theme: string, index: number) => {
                                        return (
                                            <ThemeButton key={index} theme={theme}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex-none">
                        {
                            session ? null : <LoginButton className={""}/>
                        }
                    </div>
                </div>


                {
                    session?.user ?
                        <div className="dropdown dropdown-end mx-2">
                            <div tabIndex={0} role="button" className="btn btn-circle ring ring-neutral">
                                {
                                    <div className="rounded-full flex items-center justify-center">
                                        {
                                            session?.user?.image ? <Image src={session?.user.image} alt={session?.user.name as string}
                                                                          className={"rounded-full h-10 w-10"}
                                                                            width={40} height={40}
                                                /> :
                                                // @ts-ignore
                                            session?.user?.name.split(' ').map((name: string, index: number) => {
                                                return (
                                                    <span key={index}
                                                          className={"text-lg font-bold"}>{name.charAt(0)}</span>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>
                            <ul tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-md w-52 grid grid-cols-1 gap-1">
                                <p
                                    className={"text-center font-bold text-lg"}
                                >
                                    {session?.user.name}
                                </p>
                                <li><Link className="justify-between"
                                          href={"/account/votes"}>My Votes</Link></li>
                                <li>{<LogoutButton className={'btn-error'}/>}</li>
                            </ul>
                        </div> : null
                }
            </div>
        </header>
    )
}


export default Header