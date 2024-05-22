"use client"
import { useEffect, useState } from "react";
import FanControl from "./fan-control";
import LightControl from "./light-control";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { DataLog } from "./data";
import { ControlLogItem } from "../log/components/controlLog";
import axios from "axios";
interface ControlData {
    id: number;
    device: string;
    status: boolean;
    time: string;
}

const Control = () => {
    const [dataLog, setDataLog] = useState<DataLog>({
        temp: "0",
        humidity: "0",
        brightness: "0",
        dust: "0",
    }) ;

    const [controlLog, setControlLog] = useState<ControlLogItem[]>([]);
    const [countFanOn, setCountFanOn] = useState<number>(0)
    const [countLightOn, setCountLightOn] = useState<number>(0)
    const [countAll, setCountAll] = useState<number>(0)
    useEffect(() => {
        const fetchData = async () => {
        try {
          // setIsLoading(true);
          const response = await axios.get("http://localhost:5000/api/controllog");
          setControlLog(response.data);
          setCountAll(response.data.length);

            let lightCount = 0;
            let fanCount = 0;

            response.data.forEach((log: ControlData) => {
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
          setControlLog([]);
        }
      };
  
      fetchData();
      return () => {
        
      }
    });

    console.log(controlLog);

    // const connectSSE = () => {
    //     let eventSource: EventSource | null = null;
      
    //     const openSSEConnection = () => {
    //       eventSource = new EventSource('http://localhost:5000/sseCheck/test');
      
    //       eventSource.onmessage = (event) => {
    //         try {
    //           const newData = JSON.parse(event.data);
    //           setDataLog(newData); // Assuming `setData` is a valid function in your component.
    //         } catch (error) {
    //           handleSSEError();
    //         }
    //       };
      
    //       eventSource.onerror = () => {
    //         handleSSEError();
    //       };
    //     };
      
    //     const handleSSEError = () => {
    //       toast({
    //         variant: "destructive",
    //         title: "Something went wrong",
    //         description: "Error connecting to get data sensor",
    //         action: <ToastAction altText="Try again" onClick={openSSEConnection}>Try again</ToastAction>,
    //       });
      
    //       if (eventSource) {
    //         eventSource.close();
    //       }
    //     };
      
    //     useEffect(() => {
    //       openSSEConnection();
      
    //       return () => {
    //         if (eventSource) {
    //           eventSource.close();
    //         }
    //       };
    //     }, []);
    //   };
    //   connectSSE();

    return ( 
        <>
            <LightControl countAll={countAll} count={countLightOn} dust = {dataLog.dust}/>
            <FanControl count={countFanOn} countAll={countAll}  dust = {dataLog.dust}/>
        </>
    );
}
 
export default Control;