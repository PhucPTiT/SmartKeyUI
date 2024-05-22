import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useEffect } from "react";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { ControlLogItem } from "./controlLog";

interface PopupUpdateProps {
    data: ControlLogItem | {};
    onHandle: (a: ControlLogItem | {}) => void;
}

type FormData = {
    device: string;
    status: string;
};

const PopupUpdate = ({ data, onHandle }: PopupUpdateProps) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const schema = yup.object().shape({
        device: yup.string().required('Hãy điền đầy đủ trường này'),
        status: yup.string().required('Hãy điền đầy đủ trường này'),
    });

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            device: 'id' in data ? data.device : '',
            status: 'id' in data ? data.status.toString()  : '',
        }
    });

    const onEdit = async (formData: FormData) => {
        try {
            'id' in data && await axios.put(`http://localhost:5000/api/controllog/${data.id}`, formData);
            onHandle({});
            toast({
                description: `Update Success ${'id' in data && data.id}`
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
                    <label htmlFor="device" className="font-bold text-lg">Device</label>
                    <Controller
                        name="device"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                id="device"
                                className="opacity-80 mb-2 outline-none w-full md:w-auto border-none rounded text-sm"
                            >
                                <option value="fan">Fan</option>
                                <option value="light">Light</option>
                            </select>
                        )}
                    />
                    {errors.device && <span className="text-red-500 text-sm">{errors.device.message}</span>}
                    <label htmlFor="status" className="font-bold text-lg">Status</label>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                id="status"
                                className="opacity-80 mb-2 outline-none w-full md:w-auto border-none rounded text-sm"
                            >
                                <option value="true">On</option>
                                <option value="false">Off</option>
                            </select>
                        )}
                    />
                    {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
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
