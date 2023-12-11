// import Link from "next/link";
// import {RestaurantCardType, ReviewType} from "../page";
// import ReviewCount from "./ReviewCount";
// import ReviewStars from "./ReviewStars";
import Link from "next/link";
import BookSlot from "@/app/components/BookSlot";
import {SearchParams} from "@/app/search/page";

interface Props {
    pitch: any;
    searchParams: SearchParams
}

export default function PitchCard({ pitch, searchParams }: Props){
    return(
        <Link href={`/pitch/${pitch.slug}`}>
            key={pitch.id}
            <div className="text-black">
                {/* CARD */}
                <div className="w-64 h-82 m-3 rounded overflow-hidden border cursor-pointer">
                    <img
                        src={pitch.main_image}
                        alt=""
                        className="w-full h-36"
                    />
                    <div className="p-1">
                        <h3 className="font-bold text-2xl mb-2">{pitch.name}</h3>
                        <div className="flex items-start">
                    </div>
                        <div className="text-reg font-light capitalize">
                            <p className=" mr-3">Sport: {pitch.sport.name}</p>
                            <p className=" mr-3" >Price/hour: {pitch.price} €</p>
                            <p className=" mr-3">Location: {pitch.location.name}</p>
                            <p className=" mr-3">Surface: {pitch.surface.name}</p>
                            <p className=" mr-3">Surface: {pitch.size.name}</p>
                            <p className=" mr-3">Outdoor: {pitch.outdoor}</p>
                        </div>
                        <BookSlot searchParams={searchParams} slug={pitch.slug}/>
                    </div>
                </div>
                {/* CARD */}
            </div>
        </Link>
    )
}