"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { ControlLogItem } from "./controlLog";
import { useEffect } from "react";

interface PopupDeleteProps {
    data: ControlLogItem | {};
    onHandle: (a : ControlLogItem | {}) => void
}
const PopupDelete = ({data, onHandle}: PopupDeleteProps) => {
    const onDelete = async () => {
        if('id' in data) {
            try {
                await axios.delete(`http://localhost:5000/api/controllog/${data.id}`)
                onHandle({});
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                    description: "Error call API delete control",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            }
        }
    };
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return ( 
        <div className="fixed inset-0 z-5 ml-[80px] mt-16 flex flex-col justify-center items-center bg-primary-foreground/90">
            <p className="text-sm text-red-500 font-bold">Are you sure want to delete ?</p>
            <p className="text-xs text-yellow-300">This action can't be undone </p>
            <div className="flex gap-4 mt-4">
                <Button variant="secondary" onClick={() => onHandle({})}>
                    No
                </Button>
                <Button onClick={onDelete}>
                    Yes
                </Button>
            </div>
        </div>
     );
}
 
export default PopupDelete;