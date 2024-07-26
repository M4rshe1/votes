'use client'

import {signIn, signOut} from "next-auth/react";
import {redirect} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
            onClick={() => {
                signOut().then(() => {
                    return redirect('/')
                })
            }}>Logout
        </button>
    )
}

export const GoogleLoginButton = ({className = ''}: { className: string }) => {
    return (
        <button
            className={'btn ml-2 btn-primary ' + className}
            onClick={() => signIn('google')}>
            <FontAwesomeIcon icon={['fab', 'google']} className="mr-2"/>
            Login with Google
        </button>
    )
}

export const GitHubLoginButton = ({className = ''}: { className: string }) => {
    return (
        <button
            className={'btn ml-2 btn-primary ' + className}
            onClick={() => signIn('github')}>
            <FontAwesomeIcon icon={['fab', 'github']} className="mr-2"/>
            Login with GitHub
        </button>
    )
}



