"use client";

import Search from "../../data/components/search";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/pagination";
import Loading from "@/components/loading";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { User } from "../page";
import { format } from "date-fns";

interface TableUserProps {
    listUser: User[];
    isLoading: Boolean;
    setUser: (user: User) => void;
}

const TableUser = ({ listUser, isLoading, setUser }: TableUserProps) => {
    return (
        <div className="h-full col-span-2">
            <div>
                <Table className="overflow-x-auto w-full">
                    {/* <TableCaption className="text-4xl font-bold">
                        User Data
                    </TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">
                                Finger ID
                            </TableHead>
                            <TableHead className="cursor-pointer">
                                Username
                            </TableHead>
                            <TableHead className="cursor-pointer">
                                Phone
                            </TableHead>
                            <TableHead className="cursor-pointer">
                                Email
                            </TableHead>
                            <TableHead className="cursor-pointer">
                                Creat At
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className={cn(``, isLoading && "hidden")}>
                        {listUser.length > 0 ? (
                            <>
                                {listUser.map((item) => (
                                    <TableRow
                                        onClick={() => setUser(item)}
                                        key={item.id}
                                    >
                                        <TableCell className="font-medium">
                                            {item.fingerId}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap">
                                            {item.userName}
                                        </TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>
                                            {item.creatAt &&
                                                format(
                                                    new Date(item.creatAt),
                                                    "dd/MM/yyyy"
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

export default TableUser;
