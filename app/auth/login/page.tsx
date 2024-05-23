"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const onLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/login",
                {
                    accountName: username,
                    password: password,
                }
            );
            console.log(response.data);
            router.push("/");
        } catch (error) {
            console.error(error);
            setError(
                "Login failed. Please check your credentials and try again."
            );
        }
    };

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div className="w-full max-w-[400px] max-h-[640px] bg-primary rounded-xl px-6 py-16 flex-col gap-4 flex">
                <div className="flex flex-col gap-2">
                    <p className="text-primary-foreground text-4xl font-bold">
                        Login
                    </p>
                    <span className="text-primary-foreground text-lg font-normal">
                        Chào mừng bạn về nhà.!
                    </span>
                </div>
                <form
                    className="flex-col gap-4 bg-primary flex items-center w-full"
                    onSubmit={onLogin}
                >
                    <div className="w-full bg-primary">
                        <input
                            className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="w-full bg-primary relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                            className="absolute right-2 bottom-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff
                                    className="text-primary-foreground"
                                    width={16}
                                    height={16}
                                />
                            ) : (
                                <Eye
                                    className="text-primary-foreground"
                                    width={16}
                                    height={16}
                                />
                            )}
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="bg-primary-foreground rounded-sm flex items-center justify-center">
                        <button
                            className="px-10 py-2 hover:opacity-80"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                    <div className="h-[1px] bg-primary-foreground w-[80%] mt-8" />
                </form>
                <div className="flex gap-2 items-center justify-center mt-4">
                    <p className="text-primary-foreground text-sm">
                        Don&apos;t have an account?
                    </p>
                    <span
                        className="text-primary-foreground font-bold cursor-pointer"
                        onClick={() => {
                            router.push("/auth/signup");
                        }}
                    >
                        Sign up
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
