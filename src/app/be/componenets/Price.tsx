export default function Price({priceData,setPriceData } : {priceData: number, setPriceData: any}) {
    return (
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Price.Ex. 35 "
                    value={priceData}
                    onChange={(e) => setPriceData(e.target.value)}
                    className="block w-32 mr-1 p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
            </div>

    );
}
