"use client"
import { Switch } from "@/components/ui/switch";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Fan } from "lucide-react";
import { useEffect, useState } from "react";
import { ControlLogItem } from "../log/components/controlLog";

interface FanControlProps {
    dust: string;
    count ?: number;
    countAll ?: number;
}

const FanControl = ({dust, count} : FanControlProps) => {
    const [isOn, setIsOn] = useState<boolean>(false)
    const [lastStatus, setLastStatus] = useState<boolean>(false);

    const toggleSwitch = () => {
        
    }

    // lấy giá trị lúc mount lại
    useEffect(() => {
        const fetchData = async() =>  {
            try {
                const response = await axios.get("http://localhost:5000/api/controllog/first/fan")
                const data = response.data;
                setIsOn(data?.status ||false)
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                    description: "Error call api control first status fan"
                })
            }
            
        }
        fetchData();
        return () => {
        
        }
    }, [])

    // cập nhật thời gian bật tắt thiết bị
    const handleCLickToggleFan = async() => {
        setIsOn((prevValue) => !prevValue)
        try{
            const values : object = {
                device: "fan",
                status: !isOn,
            }
            await axios.post("http://localhost:5000/api/controllog", values)
            toast({
                description: "Success."
            })
        } catch(error) {
            console.error(error)
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: "Error call api control fan",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    } 

    
    const [countLightOn, setCountLightOn] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
        try {
          // setIsLoading(true);
          const response = await axios.get("http://localhost:5000/api/controllog");
          setCountAll(response.data.length);
            let lightCount = 0;
            let fanCount = 0;

            response.data.forEach((log: ControlLogItem) => {
                if (log.device === "light" && log.status) {
                    lightCount++;
                } else if (log.device === "fan" && log.status) {
                    fanCount++;
                }
            });

            setCountLightOn(lightCount)
        } catch (error) {
          console.error(error);
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Error get data control log",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      };
  
      fetchData();
      return () => {
        
      }
    });

    const [countFanOn, setCountFanOn] = useState<number>(0)
    const [countAll, setCountAll] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
        try {
          // setIsLoading(true);
          const response = await axios.get("http://localhost:5000/api/controllog");
          setCountAll(response.data.length);

            let lightCount = 0;
            let fanCount = 0;

            response.data.forEach((log: ControlLogItem) => {
                if (log.device === "light" && log.status) {
                    lightCount++;
                } else if (log.device === "fan" && log.status) {
                    fanCount++;
                }
            });

            setCountFanOn(fanCount);
            setCountLightOn(lightCount)
        } catch (error) {
          console.error(error);
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Error get data control log",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      };
  
      fetchData();
      return () => {
        
      }
    });




    return (
        <div className="
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
        ">  
            <div>
                <div>
                    <span>Số lần bật : </span>
                    <span>{countFanOn}</span>
                </div>
                <div>
                    <span>Số lần tắt : </span>
                    <span>{countAll - countFanOn}</span>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Fan width={120} height={120} color={isOn ? "Salmon" : "gray"} className={isOn ? "fan-rotating" : ""}/>
                <Switch checked={isOn} onClick={handleCLickToggleFan}/>
            </div>
        </div>
    );
}
 
export default FanControl;