"use client"

import Chart from "chart.js/auto";
import { CategoryScale, LinearScale,
  PointElement,
  LineElement,
  Title, 
  Legend,
  Tooltip
} from "chart.js";
import LineChart from "./linechart";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastAction } from "@/components/ui/toast";

Chart.register(
  CategoryScale, 
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  );
export interface DataItem {
  id: number | null;
  brightness: string;
  temp: string;
  humidity: string;
  dust: string;
  time: string | null;
}


const ChartControl = () => {
  const[data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:5000/chartSSE/first');
        response.data && setData(response.data)
      }
      catch(error) {
        toast({
          variant: "destructive",
          title: "Some thing went wrong",
          description: "Error connect get datasensor first",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
    fetchData();

    return () => {

    }
  }, [])

  const connectSSE = () => {
    let eventSource: EventSource | null = null;
  
    const openSSEConnection = () => {
      eventSource = new EventSource('http://localhost:5000/chartSSE/data');
  
      eventSource.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data);
          setData(newData); // Assuming `setData` is a valid function in your component.
        } catch (error) {
          handleSSEError();
        }
      };
  
      eventSource.onerror = () => {
        handleSSEError();
      };
    };
  
    const handleSSEError = () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Error connecting to get data sensor",
        action: <ToastAction altText="Try again" onClick={openSSEConnection}>Try again</ToastAction>,
      });
  
      if (eventSource) {
        eventSource.close();
      }
    };
  
    useEffect(() => {
      openSSEConnection();
  
      return () => {
        if (eventSource) {
          eventSource.close();
        }
      };
    }, []);
  };
  connectSSE();
  

  const chartData = {
    labels: data.map((data) => data.time?.split(" ")[1] || "00:00:00"), // Convert 'year' to string
    datasets: [
      {
        label: "Temperature",
        data: data.map((item) => item.temp),
        backgroundColor: [
          "#22c55e"
        ],
        borderColor: "#22c55e",
        borderWidth: 2,
      },
      {
        label: "Humidity",
        data: data.map((item) => item.humidity),
        backgroundColor: [
          "#2563eb"
        ],
        borderColor: "#2563eb",
        borderWidth: 2,
      },
      {
        label: "Brighness",
        data: data.map((item) => (parseFloat(item.brightness)).toFixed(2)),
        backgroundColor: [
          "#facc15"
        ],
        borderColor: "#facc15",
        borderWidth: 2,
      },
    ],
  }
  

  // const hustChartData = {
  //   labels: data.map((data) => data.time?.split(" ")[1] || "00:00:00"),
  //   datasets: [
  //     {
  //       label: "Hust",
  //       data: data.map((item) => item.dust),
  //       backgroundColor: [
  //         "#00FF00"
  //       ],
  //       borderColor: "#00BB00",
  //       borderWidth: 2,
  //     }
  //   ]
  // }
  return (
       <div className="grid grid-cols-1 lg:h-full gap-4">
         <div className=""><LineChart str = "Data Sensor" chartData={chartData}/></div>
         {/* <div className="h-[290px] lg:h-full"><LineChart str = "Dust Sensor" chartData={hustChartData}/></div> */}
       </div>

  );
};
 
export default ChartControl;
