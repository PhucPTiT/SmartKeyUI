"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Lock, LucideLightbulb } from "lucide-react";
import { useEffect, useState } from "react";

const KeyOff = () => {
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
                <Lock width={80} height={80} color={"red"} />
                <Button variant="outline" className="text-5xl font-bold py-8">
                    Off
                </Button>
            </div>
        </div>
    );
};

export default KeyOff;
