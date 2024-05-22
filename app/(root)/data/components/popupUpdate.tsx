import { Button } from "@/components/ui/button";
import { DataItem } from "../../components/chart-control";
import { format } from "date-fns";
import { useEffect } from "react";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

interface PopupUpdateProps {
    data: DataItem | {};
    onHandle: (a: DataItem | {}) => void;
}

type FormData = {
    temp: string;
    brightness: string;
    humidity: string;
};

const PopupUpdate = ({ data, onHandle }: PopupUpdateProps) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const schema = yup.object().shape({
        temp: yup.string().required('Hãy điền đầy đủ trường này'),
        brightness: yup.string().required('Hãy điền đầy đủ trường này'),
        humidity: yup.string().required('Hãy điền đầy đủ trường này'),
    });

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            temp: 'id' in data ? data.temp : '',
            brightness: 'id' in data ? data.brightness : '',
            humidity: 'id' in data ? data.humidity : '',
        }
    });

    const onEdit = async (formData: FormData) => {
        try {
            'id' in data && await axios.put(`http://localhost:5000/api/data/${data.id}`, formData);
            onHandle({});
            toast({
                description: "Update Success"
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: "Error calling API to update data",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    };

    if ('id' in data) {
        return (
            <div className="fixed inset-0 z-5 md:ml-[80px] mt-16 flex flex-col justify-center items-center bg-primary-foreground/90">
                <span className="font-bold text-xl mb-3">Edit My Data</span>
                <form className="flex flex-col bg-primary/30 px-2 py-1 rounded-sm" onSubmit={handleSubmit(onEdit)}>
                    <span className="font-bold text-lg">ID</span>
                    <span className="text-sm opacity-80 mb-2">{data.id}</span>
                    <label htmlFor="temp" className="font-bold text-lg">Nhiệt độ</label>
                    <Controller
                        name="temp"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                id="temp"
                                className="opacity-80 mb-2 outline-none w-full md:w-auto border-none rounded text-sm"
                                placeholder="Nhập vào giá trị nhiệt độ..."
                            />
                        )}
                    />
                    {errors.temp && <span className="text-red-500 text-sm">{errors.temp.message}</span>}
                    <label htmlFor="brightness" className="font-bold text-lg">Độ sáng</label>
                    <Controller
                        name="brightness"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                id="brightness"
                                className="opacity-80 mb-2 outline-none w-full md:w-auto border-none rounded text-sm"
                                placeholder="Nhập vào giá trị độ sáng..."
                            />
                        )}
                    />
                    {errors.brightness && <span className="text-red-500 text-sm">{errors.brightness.message}</span>}
                    <label htmlFor="humidity" className="font-bold text-lg">Độ ẩm</label>
                    <Controller
                        name="humidity"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                id="humidity"
                                className="opacity-80 mb-2 outline-none w-full md:w-auto border-none rounded text-sm"
                                placeholder="Nhập vào giá trị độ ẩm..."
                            />
                        )}
                    />
                    {errors.humidity && <span className="text-red-500 text-sm">{errors.humidity.message}</span>}
                    <span className="font-bold text-lg">Record Time</span>
                    <span className="text-sm opacity-80 mb-2">{data.time && format(new Date(data.time), "dd/MM/yyyy HH:mm:ss")}</span>
                    <div className="flex gap-3 justify-between items-center">
                        <Button variant="secondary" className="h-[42px]" onClick={() => onHandle({})}>Cancel</Button>
                        <Button type="submit" color="green">Save</Button>
                    </div>
                </form>
            </div>
        );
    }
    return (
        <></>
    );
};

export default PopupUpdate;
