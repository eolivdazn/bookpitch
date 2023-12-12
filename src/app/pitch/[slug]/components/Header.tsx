export default function Header({name}: {name: string}) {

    const renderTitle = () => {
        const nameArray = name.split("-");
        nameArray[nameArray.length-1] = `(${nameArray[nameArray.length-1]})`
        return nameArray.join(" ")

    }
    return (
        <div className="lg:h-72 h-20 overflow-hidden">
            <div
                className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center"
            >
                <h1 className="capitalize lg:text-7xl sm:text-4xl text-white captitalize text-shadow text-center">
                    {renderTitle()}
                </h1>
            </div>
        </div>
    )
}