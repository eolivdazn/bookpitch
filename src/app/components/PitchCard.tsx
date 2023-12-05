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
        <Link href={`/pitches/${pitch.slug}`}>
            <div className="text-black">
                {/* CARD */}
                <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
                    <img
                        src={pitch.main_image}
                        alt=""
                        className="w-full h-36"
                    />
                    <div className="p-1">
                        <h3 className="font-bold text-7xl mb-2">{pitch.name}</h3>
                        <div className="flex items-start">
                            {/*<ReviewStars reviewRate={review}/>*/}
                            {/*<ReviewCount review={review}/>*/}

                        </div>
                        <div className="flex text-reg font-light capitalize">
                            <p className=" mr-3">{pitch.sport.name}</p>
                            <p>{pitch.price} €</p>
                            <p>{pitch.location.name}</p>
                            <p>{pitch.surface.name}</p>
                        </div>
                        <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
                    </div>
                </div>
                {/* CARD */}
            </div>
        </Link>
    )
}