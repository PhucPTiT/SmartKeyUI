"use client";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [codeDevice, setCodeDevice] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const onSignup = async (e: any) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            if (codeDevice !== "123456") {
                return;
            }
            const response = await axios.post(
                "http://localhost:5000/api/signup",
                {
                    accountName: username,
                    password: password,
                    email: email,
                }
            );
            console.log(response.data);
            router.push("/auth/login");
        } catch (error) {
            console.error(error);
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div className="w-full max-w-[400px] max-h-[700px] bg-primary rounded-xl px-6 py-16 flex-col gap-4 flex">
                <div className="flex flex-col gap-2">
                    <p className="text-primary-foreground text-4xl font-bold">
                        Sign Up
                    </p>
                    <span className="text-primary-foreground text-lg font-normal">
                        Tạo tài khoản mới của bạn!
                    </span>
                </div>
                <form
                    className="flex-col gap-4 bg-primary flex items-center w-full"
                    onSubmit={onSignup}
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
                    <div className="w-full bg-primary">
                        <input
                            className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground"
                            type="text"
                            placeholder="Code Device"
                            value={codeDevice}
                            onChange={(e) => setCodeDevice(e.target.value)}
                        />
                    </div>
                    <div className="w-full bg-primary">
                        <input
                            className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-full bg-primary relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground"
                            placeholder="Password"
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
                    <div className="w-full bg-primary relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div
                            className="absolute right-2 bottom-3 cursor-pointer"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? (
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
                            Sign Up
                        </button>
                    </div>
                    <div className="h-[1px] bg-primary-foreground w-[80%] mt-8" />
                </form>
                <div className="flex gap-2 items-center justify-center mt-4">
                    <p className="text-primary-foreground text-sm">
                        Already have an account?
                    </p>
                    <div
                        className="text-primary-foreground font-bold cursor-pointer"
                        onClick={() => {
                            router.push("/auth/login");
                        }}
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
