import Header from "./components/Header";


export default function PitchLayout({
                                             children,
                                             params
                                         }: {
    children: React.ReactNode,
    params: { slug: string }
}) {
    return (
        <div className="">
            <Header name={params.slug}/>
            <div className="lg:flex m-auto lg:w-2/3 justify-between items-start-0 mt-2">
                {children}
            </div>
        </div>
    )
        ;
}