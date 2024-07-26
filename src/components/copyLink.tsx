"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

const CopyLink = (props: any) => {
    const [isCopied, setIsCopied] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsCopied(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [isCopied]);
    return (
        <span
            className={"font-normal text-neutral h-full flex item-center tooltip" + (isCopied ? " tooltip-open" : "")}
            {...props}
            data-tip={isCopied ? "Copied!" : "Copy link"}
            onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
                setIsCopied(true);
            }}
        >
            <FontAwesomeIcon
                icon={fas.faLink}
                className={"cursor-pointer text-xl"}
            />
        </span>
    );
};

export default CopyLink;