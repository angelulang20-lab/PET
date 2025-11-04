import { Outlet } from "react-router";

function GuestLayout(){
    return (
        <div className="flex flex-col items-center justify-center p-5 h-[100vh]">
            <Outlet/>
        </div>
    )
}

export default GuestLayout
