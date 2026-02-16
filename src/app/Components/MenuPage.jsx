export default function MenuPage({children}){
    return (
        <div className="relative h-[95vh] w-[40vw] bg-linear-to-b from-gray-600 to-gray-800 flex justify-center shadow-[0px_15px_25px_0px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col h-[92%] w-[92%] border-10 border-amber-300 self-center justify-center gap-8">
                {children}
            </div>
        </div>
    )
}