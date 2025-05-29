import { Header } from "./sections/header/header";
import { Overview } from "./sections/overview/overview";

export default function Dashboard(){
    return(<div className="w-full flex flex-col gap-4 h-full">
        <Header/>
        <Overview/>
    </div>)
}