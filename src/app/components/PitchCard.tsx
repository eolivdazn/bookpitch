import Link from "next/link";
import BookSlot from "@/app/components/BookSlot";
import {SearchParams} from "@/app/search/page";
import {displayTime} from "@/app/help/help";

interface Props {
    pitch: any;
    searchParams: SearchParams
}

export default function PitchCard({ pitch, searchParams }: Props){
    return(
        <div className="w-64 h-82 m-3 rounded overflow-hidden border cursor-pointer p-2">
        <Link key={pitch.id} href={`/pitch/${pitch.slug}`}>

            <div className="text-black">
                {/* CARD */}

                    <img
                        src={pitch.main_image}
                        alt=""
                        className="w-full h-36"
                    />
                    <div className="p-1">
                        <h3 className="font-bold text-2xl mb-2 truncate ">{pitch.name}</h3>
                        <h4 className={" text-sm mb-2 "} >Hours:
                            <span className={"text-sm mb-2" + ( searchParams?.time < pitch.open_time || searchParams?.time > pitch.close_time ? ' font-bold underline' : ' null')}>{displayTime(pitch.open_time)}-{displayTime(pitch.close_time)}</span>
                        </h4>
                        <div className="flex items-start">
                    </div>
                        <div className="text-reg font-light capitalize">
                            <p className=" mr-3">Sport: <span className={"font-bold"}> {pitch.sport.name}</span></p>
                            <p className=" mr-3" >Price/hour: {pitch.price} €</p>
                            <p className=" mr-3">Location:<span className={"font-bold"}> {pitch.location.name}</span></p>
                            <p className=" mr-3">Surface: {pitch.surface.name}</p>
                            <p className=" mr-3">Size: {pitch.size.name}</p>
                            <p className=" mr-3">Outdoor: {pitch.outdoor}</p>
                        </div>
                    </div>
                </div>
        </Link>
        <BookSlot searchParams={searchParams} pitch={pitch}/>
        </div>

    )
}