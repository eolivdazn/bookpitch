// import Link from "next/link";
// import {RestaurantCardType, ReviewType} from "../page";
// import ReviewCount from "./ReviewCount";
// import ReviewStars from "./ReviewStars";
import Link from "next/link";

interface Props {
    pitch: any;
}

export default function PitchCard({ pitch }: Props){
    return(
        <Link href={`/pitch/${pitch.slug}`}>
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
                            {/*<ReviewStars reviewRate={review}/>*/}
                            {/*<ReviewCount review={review}/>*/}

                        </div>
                        <div className="text-reg font-light capitalize">
                            <p className=" mr-3">Sport: {pitch.sport.name}</p>
                            <p className=" mr-3" >Price/hour: {pitch.price} €</p>
                            <p className=" mr-3">Location: {pitch.location.name}</p>
                            <p className=" mr-3">Surface: {pitch.surface.name}</p>
                            <p className=" mr-3">Surface: {pitch.size.name}</p>
                            <p className=" mr-3">Outdoor: {pitch.outdoor}</p>
                        </div>
                    </div>
                </div>
                {/* CARD */}
            </div>
        </Link>
    )
}