"use client";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const KeyOn = () => {
    return (
        <div
            className="
            flex-1
            px-2 
            py-4
            flex 
            items-center 
            justify-center
            gap-4
            cursor-pointer
            rounded-xl
            bg-primary/10
        "
        >
            <div className="flex flex-col items-center gap-2">
                <Lock width={80} height={80} color={"green"} />
                <Button variant="default" className="py-8 text-5xl font-bold">
                    On
                </Button>
            </div>
        </div>
    );
};

export default KeyOn;
