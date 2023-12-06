export default function ImagesPitch({images}: {images: string[]}) {
    return (
        <div>
            <h1 className="text-black font-bold text-3xl mt-10 mb-7 border-b pb-5">
                {images.length} photo{images.length > 1 ? "s" : ""}
            </h1>
            <div className="flex flex-wrap">
                {images.map((image) => (
                    <img
                        className="lg:w-56 lg:h-44 sm:w-45 sm:h-35 mr-1 mb-1"
                        src={image}
                        alt=""
                    />
                ))}

            </div>
        </div>
    );
}