import { redirect } from "next/navigation"
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import LoginForm from "@/components/loginForm";



const Page = async () => {
    const session = await getServerSession(authOptions)
    if (session) {
        return redirect("/")
    }

    return (
        <div
        className={"h-full w-full lg:max-w-4xl md:max-w-3xl flex flex-col items-center justify-center px-4 mt-24"}
        >
            <LoginForm/>
        </div>
    )
}

export default Page