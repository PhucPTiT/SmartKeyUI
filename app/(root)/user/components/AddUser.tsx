"use client";

import { set } from "date-fns";
import { useState } from "react";
import { User } from "../page";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface AddUserProps {
    user: User;
}

const AddUser = ({ user }: AddUserProps) => {
    const [userFingerID, setUserFingerID] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [gender, setGender] = useState<string>("");

    const addUserFinger = async (e: any) => {
        e.preventDefault();
        const axios = require("axios");
        let data = {
            fingerId: userFingerID,
            userName: username,
            phone: phoneNumber,
            email: email,
            gender: gender,
        };

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `http://localhost:5000/control`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response: any) => {
                console.log(JSON.stringify(response.data));
                toast({
                    description: "Success.",
                });
            })
            .catch((error: any) => {
                console.log(error);
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                    description: "Error add information user",
                    action: (
                        <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                });
            });
    };

    const updateUserFinger = async (e: any) => {
        e.preventDefault();
        const axios = require("axios");
        let data = {
            fingerId: userFingerID,
            userName: username,
            phone: phoneNumber,
            email: email,
            gender: gender,
        };
        let config = {
            method: "put",
            maxBodyLength: Infinity,
            url: `http://localhost:5000/control/${user.id}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response: any) => {
                console.log(JSON.stringify(response.data));
                toast({
                    description: "Success.",
                });
            })
            .catch((error: any) => {
                console.log(error);
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                    description: "Error edit information user",
                    action: (
                        <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                });
            });
    };

    const deleteUserFinger = async (e: any) => {
        e.preventDefault();
        const axios = require("axios");
        let config = {
            method: "delete",
            maxBodyLength: Infinity,
            url: `http://localhost:5000/control/${user.id}`,
            headers: {
                "Content-Type": "application/json",
            },
        };

        axios
            .request(config)
            .then((response: any) => {
                console.log(JSON.stringify(response.data));
                toast({
                    description: "Success.",
                });
            })
            .catch((error: any) => {
                console.log(error);
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                    description: "Error delete information user",
                    action: (
                        <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                });
            });
    };
    return (
        <div className="col-span-1">
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[400px] max-h-[800px] bg-primary rounded-xl px-6 py-16 flex-col gap-4 flex">
                    <div className="flex flex-col gap-2">
                        <p className="text-primary-foreground text-4xl font-bold">
                            {user ? "Edit User" : "Add User"}
                        </p>
                        <span className="text-primary-foreground text-lg font-normal">
                            {user
                                ? "Cập nhật thông tin người dùng của bạn!"
                                : " Thêm thông tin người dùng của bạn!"}
                        </span>
                    </div>
                    <form className="flex-col gap-4 bg-primary flex items-center w-full">
                        <div className="w-full bg-primary ">
                            <input
                                className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground"
                                type="text"
                                placeholder="UserFingerID"
                                onChange={(e) => {
                                    setUserFingerID(e.target.value);
                                }}
                                defaultValue={user?.fingerId}
                            />
                        </div>
                        <div className="w-full bg-primary ">
                            <input
                                className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground"
                                type="text"
                                placeholder="Username"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                defaultValue={user?.userName}
                            />
                        </div>
                        <div className="w-full bg-primary ">
                            <input
                                className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground"
                                type="tel"
                                placeholder="Phone Number"
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }}
                                defaultValue={user?.phone}
                            />
                        </div>
                        <div className="w-full bg-primary ">
                            <input
                                className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground"
                                type="email"
                                placeholder="User Email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                defaultValue={user?.email}
                            />
                        </div>
                        <div className="w-full bg-primary">
                            <select
                                className="w-full bg-primary px-2 py-2 rounded-sm border border-primary-foreground text-primary-foreground"
                                onChange={(e) => {
                                    setGender(e.target.value);
                                }}
                                defaultValue={user?.gender || "male"}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="bg-primary-foreground rounded-sm flex items-center justify-center mt-4">
                            <button
                                onClick={addUserFinger}
                                className="px-2 sm:px-8 py-2 hover:opacity-80 hover:bg-primary hover:text-primary-foreground"
                            >
                                Add
                            </button>
                            <button
                                onClick={updateUserFinger}
                                className="px-2 sm:px-8 py-2 hover:opacity-80 hover:bg-primary hover:text-primary-foreground"
                            >
                                Update
                            </button>
                            <button
                                onClick={deleteUserFinger}
                                className="px-2 sm:px-8 py-2 hover:opacity-80 hover:bg-primary hover:text-primary-foreground"
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
