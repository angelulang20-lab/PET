import Login from "@/pages/Guest/home";
import GuestLayout from '@/components/layouts/GuestLayout'
/*
    [
        {
            path: '',
            Component: LayoutComponent,
            children: [
                {
                    (index: boolean,) || path: '',
                    Component: PageComponent
                    
                },
                {
                    path: '',
                    Component: PageComponent
                }
            ]
        }
    ]
*/
const GuestRouter = [
    {
        path: '/',
        Component: GuestLayout,// layout for Guest
        children: [
            {
                index: true,
                Component: Login
            }
        ]
    }
]

export default GuestRouter