import MainLayout from "@/components/layouts/MainLayout";
import Home from "@/pages/Main/adopt";
import Users from "@/pages/Main/Users";
import Play from "@/pages/play/play";

const MainRouter = [
    {
        path: '/adopt',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: 'users',
                element: <Users/>,
            }
        ]
    },
    {
        path: '/game',  
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Play/>
            }
        ]
    }
]

export default MainRouter