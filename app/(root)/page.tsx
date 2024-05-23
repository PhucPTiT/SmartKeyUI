import ChatControl from "./components/chart-control";
import Clock from "./components/clock";
import Control from "./components/control";
import Data from "./components/data";
import KeyOff from "./components/keyOff";
import KeyOn from "./components/keyOn";

export default async function Home() {
    return (
        <div className="flex flex-col w-full px-12 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pb-10">
                <div className="col-span-4 lg:col-span-2 grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <KeyOn />
                    </div>
                    <div className="col-span-1">
                        <KeyOff />
                    </div>
                </div>
                <div className="col-span-2">
                    <Clock />
                </div>
            </div>
        </div>
    );
}
