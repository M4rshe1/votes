'use client'

import {signIn, signOut} from "next-auth/react";
import {redirect} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fab} from "@fortawesome/free-brands-svg-icons";

export const LoginButton = ({className = ''}: { className: string }) => {
    return (
        <button
            className={'btn ml-2 btn-primary ' + className}
            onClick={() => signIn()}>Login</button>
    )
}

export const LogoutButton = ({className = ''}: { className: string }) => {
    return (
        <button
            className={'btn btn-neutral ' + className}
            onClick={async () => {
                await signOut()
                redirect('/')
            }}>Logout
        </button>
    )
}

export const GoogleLoginButton = ({className = ''}: { className: string }) => {
    return (
        <button
            className={'btn btn-primary ' + className}
            onClick={() => signIn('google')}>
            <FontAwesomeIcon icon={fab.faGoogle} className="mr-2 text-2xl"/>
            Login with Google
        </button>
    )
}

export const GitHubLoginButton = ({className = ''}: { className: string }) => {
    return (
        <button
            className={'btn btn-primary ' + className}
            onClick={() => signIn('github')}>
            <FontAwesomeIcon icon={fab.faGithub} className="mr-2 text-2xl"/>
            Login with GitHub
        </button>
    )
}



