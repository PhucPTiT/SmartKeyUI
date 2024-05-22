"use client"

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();
    const onLogin = (e: any) => {
        e.preventDefault();
        router.push("/");
    }
    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div className="w-full  max-w-[400px] max-h-[640px] bg-primary rounded-xl px-6 py-16 flex-col gap-4 flex">
                <div className="flex flex-col gap-2">
                    <p className="text-primary-foreground text-4xl font-bold">Login</p>
                    <span className="text-primary-foreground text-lg font-normal">Chào mừng bạn về nhà.!</span>
                </div>
                <form className="flex-col gap-4 bg-primary flex items-center w-full">
                    <div className="w-full bg-primary ">
                        <input className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground" type="text" placeholder="Username" />
                    </div>
                    <div className="w-full bg-primary relative">
                        <input type="password" className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground" placeholder="password" />
                        <div className="absolute right-2 bottom-3">
                            <Eye color="primary-foreground" className="hidden cursor-pointer" width={16} height={16} />
                            <EyeOff className="text-primary-foreground cursor-pointer" width={16} height={16} />
                        </div>
                    </div>
                    <div className="bg-primary-foreground rounded-sm flex items-center justify-center">
                        <button className="px-10 py-2 hover:opacity-80" onClick={onLogin}>Login</button>
                    </div>
                    <div className="h-[1px] bg-primary-foreground w-[80%] mt-8" />
                </form>
                <div className="flex gap-2 items-center justify-center mt-4">
                    <p className="text-primary-foreground text-sm">Don&apos;t have an account?</p>
                    <span className="text-primary-foreground font-bold cursor-pointer" onClick={() => { router.push("/auth/signup") }}>Sign up</span>
                </div>
            </div>
        </div>
    );
}

export default Login;