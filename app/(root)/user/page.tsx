"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "./swiper.css";
import AddUser from "./components/AddUser";
import TableUser from "./components/TableUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export interface User {
    id: number;
    fingerId: string;
    userName: string;
    email: string;
    phone: string;
    gender: string;
    creatAt: Date;
}

const User = () => {
    const [listUser, setListUser] = useState([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "http://localhost:5000/api/userfinger/all",
            headers: {},
        };
        setIsLoading(true);
        axios
            .request(config)
            .then((response: any) => {
                setIsLoading(false);
                setListUser(response.data);
            })
            .catch((error: any) => {
                setIsLoading(false);
                console.log(error);
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                    description: "Error get list user",
                    action: (
                        <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                });
            });
    }, []);
    return (
        <div className="w-full h-full">
            <div className="flex flex-col px-10 gap-5">
                <div className="text-center py-4 font-bold text-5xl">
                    Manage User
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <AddUser user={user as User} />
                    <TableUser
                        setUser={setUser}
                        isLoading={isLoading}
                        listUser={listUser}
                    />
                </div>
            </div>
        </div>
    );
};

export default User;
