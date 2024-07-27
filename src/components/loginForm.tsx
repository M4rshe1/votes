"use client";

import {GitHubLoginButton, GoogleLoginButton} from "@/lib/auth";

const LoginForm = () => {
    return (
        <div className="flex flex-col gap-2 justify-between p-4 border rounded border-neutral max-w-sm w-full">
            <div

            >
                <h2 className={"text-secondary font-bold text-2xl text-center w-full mb-4"}>
                    Login
                </h2>
                <div
                className={"flex flex-col gap-2"}
                >
                    <GoogleLoginButton className={"w-full"}/>
                    <GitHubLoginButton className={"w-full"}/>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;