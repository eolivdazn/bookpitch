"use client";
import Link from "next/link";
import {times} from "../../../data/times";
import {SearchParams} from "@/app/search/page";
import UseAvailabilities from "../../../hooks/UseAvailabilities";
import {useEffect} from "react";


export default  function BookSlot({searchParams, slug}: {
    searchParams: SearchParams;
    slug: string;
}) {
    const {findSlot,data} = UseAvailabilities()

    //TODO: fix this
    // if (searchParams.day === undefined || searchParams.time === undefined || slug) return null

    useEffect(() => {
         findSlot({
            day: searchParams.day,
            slug,
            time: searchParams.time
        })
    },[searchParams])

    console.log(data)
    return (
        <div>
            <div className="text-center  font-bold">
            <h4 className="text-black mr-2 text-lg border-b">Available slots</h4>
            {data && data.length > 0 ?
                <div  className="bg-white py-3 font-light text-white flex flex-wrap">
                    {data.map(( slot:any ) => (
                        slot.available ?
                            (<Link
                                className=" bg-red-600 rounded cursor-pointer  p-2 w-18 text-white ml-1 mr-1 mb-1"
                                key={slot.time}
                                href={`pitch/${slug}/reserve?&day=${searchParams.day}&time=${searchParams.time}`}
                            >
                                {times.find(x => x.time === slot.time)?.displayTime}
                            </Link>)
                            :   (<p className="bg-gray-300 p-2 w-18 ml-1 mb-1 rounded mr-1">
                                {times.find(x => x.time === slot.time)?.displayTime}
                            </p>)
                    ))}

            </div>: <p className="bg-gray-300 p-2 w-24 mb-3 mt-2 rounded mr-3">No slots</p>}
            </div>
        </div>

    );
}
