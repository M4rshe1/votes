import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="footer bg-base-200 text-base-content items-center p-4">
            <aside className="flex items-center gap-2">
                <FontAwesomeIcon icon={fas.faSquarePollVertical} className={"w-8 aspect-square text-primary text-5xl"}/>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <Link
                    href={"https://github.com/M4rshel/votes"}
                    target={"_blank"}
                >
                    <FontAwesomeIcon icon={fab.faGithub} className={"w-8 aspect-square text-5xl"}/>
                </Link>
                <Link
                    href={"https://colin.heggli.dev"}
                    target={"_blank"}
                >
                    <FontAwesomeIcon icon={fas.faHashtag} className={"w-8 aspect-square text-5xl"}/>
                </Link>
            </nav>
        </footer>
    )
}

export default Footer;