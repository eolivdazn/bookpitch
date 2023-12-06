"use client";
import Link from "next/link";
import {times} from "../../../data/times";
// import React, {useEffect} from "react";
import {SearchParams} from "@/app/search/page";
import UseAvailabilities from "../../../hooks/UseAvailabilities";
import {useEffect} from "react";


export default function BookSlot({searchParams, slug}: {
    searchParams: SearchParams;
    slug: string;
}) {
    const {findSlot,loading,error,data} = UseAvailabilities()

    if (searchParams.day === undefined || searchParams.time === undefined) return null

    useEffect(() => {
         findSlot({
            day: searchParams.day,
            slug,
            time: searchParams.time
        })
    },[data])

    return (
        <div>
            <div className="text-center  font-bold">
            <h4 className="text-black mr-2 text-lg border-b">Available slots</h4>
            {data && data.length > 0 ?

                <div  className="bg-white py-3 font-light text-white flex flex-wrap">
                    {data.map(( time:any  , index:any) => (
                        time ?
                            (<Link
                                className=" bg-red-600 rounded cursor-pointer  p-2 w-24 text-white mr-3 mb-3 disabled"
                                key={index}
                                href={`reserve/${slug}?&day=${searchParams.day}&time=${searchParams.time}`}
                            >
                                {times.find(x => x.time === time)?.displayTime}
                            </Link>)
                            :   (<p className="bg-gray-300 p-4 w-24 mb-3 rounded mr-3">No available slots</p>)
                    ))}

            </div>: <p className="bg-gray-300 p-2 w-24 mb-3 mt-2 rounded mr-3">No slots</p>}
            </div>
        </div>

    );
}
