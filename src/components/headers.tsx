// multiple export in one file, use export instead of export default

export function HeaderOne({cl, text}:{cl:string|null, text: string|null}){
    return <h1 className={`text-4xl font-bold ${cl}`}>{text}</h1>
}

export function HeaderTwo({cl, text}:{cl:string|null, text: string|null}){
    return <h1 className={`text-3xl font-bold ${cl}`}>{text}</h1>
}