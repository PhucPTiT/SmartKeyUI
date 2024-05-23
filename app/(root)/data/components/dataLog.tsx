"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import Loading from "@/components/loading";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

interface Log {
    id: number;
    userFinger: {
        fingerId: string;
        userName: string;
    };
    action: boolean;
    time: Date;
}

const DataLog = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "http://localhost:5000/api/log/all",
            headers: {},
        };
        setIsLoading(true);
        axios
            .request(config)
            .then((response: any) => {
                setIsLoading(false);
                setData(response.data);
            })
            .catch((error: any) => {
                setIsLoading(false);
                console.log(error);
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                    description: "Error get history log",
                    action: (
                        <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                });
            });
    }, []);

    return (
        <div className="h-full">
            <div>
                <Table className="overflow-x-auto w-full">
                    <TableCaption className="text-4xl font-bold">
                        History Finger Lock
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">
                                FingerID
                            </TableHead>
                            <TableHead className="cursor-pointer">
                                <div className="flex flex-row items-center">
                                    <p>Name</p>
                                </div>
                            </TableHead>
                            <TableHead className="cursor-pointer">
                                <div className="flex flex-row items-center">
                                    <p>Action</p>
                                </div>
                            </TableHead>
                            <TableHead className="text-right">
                                <div className="flex justify-end items-center gap-1">
                                    <span className="">Time</span>
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className={cn(``, isLoading && "hidden")}>
                        {data.length > 0 ? (
                            <>
                                {data.map((item: Log) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">
                                            {item.userFinger.fingerId}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap">
                                            {item.userFinger.userName}
                                        </TableCell>
                                        <TableCell>
                                            {item.action
                                                ? `Mở cửa`
                                                : `Khoá cửa`}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {item.time &&
                                                format(
                                                    new Date(item.time),
                                                    "dd/MM/yyyy HH:mm:ss"
                                                )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    Không có dữ liệu
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {isLoading && <Loading />}
        </div>
    );
};

export default DataLog;
