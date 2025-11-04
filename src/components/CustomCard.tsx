import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { JSX } from "react";

// destructured parameters for functions
// JS = function function_name({param1, param2, param3}){}
// TS = function function_name({param1, param2, param3} : {param1: datatype, param2: datatype, param3: datatype}){}
// in Home.tsx: <FunctionName param1="value" param2="value" />
function CustomCard({ title, description, children, cl }: { title: string | null, description: string | null, children: JSX.Element, cl: string }) {
    return (
        <Card className={`w-full ${cl}`}>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default CustomCard