import { PrismaClient} from "@prisma/client";
import PitchCard from "@/app/components/PitchCard";
import SideBarSearch from "@/app/search/componenets/SideBarSearch";
import ReservationCard2 from "@/app/components/ReservationCard2";
// import {useState} from "react";

const prisma = new PrismaClient();

export interface SearchParams {
    sport: string;
    location?: string;
    surface?: string;
    day: string;
    time: string;
}


const fetchByLocation = async (): Promise<string[]> => {
    const locations = await prisma.location.findMany({
        select: {
            name: true
        }
    })
    return locations.map((location) => location.name)

}

const fetchBySports = async (): Promise<string[]> => {
    const sports = await prisma.sport.findMany({
        select: {
            name: true
        }
    })
    return sports.map((sport) => sport.name)

}
const fetchPitchesByParams = (searchParams: SearchParams) => {
    const where: any = {};

    if (searchParams.location) {
        where.location = {
            name: {
                equals: searchParams.location,
            },
        };
    }
    if (searchParams.sport) {
        where.sport = {
            name: {
                equals: searchParams.sport,
            },
        };
    }

    return prisma.pitch.findMany({
        where,
        select: {
            name: true,
            open_time: true,
            close_time: true,
            price: true,
            surface: true,
            sport: true,
            location: true,
            size: true,
            main_image: true,
            slug: true,
            outdoor: true

        }
    });
}

export default async function Search({searchParams}: {
    searchParams: SearchParams;
}) {

    const locations = await fetchByLocation()
    const sports = await fetchBySports()
    const pitches = await fetchPitchesByParams(searchParams)
    // const [changePitches, setChangePitches] = useState(pitches)
    return (

        <div className="text-black">
            <div className="relative text-reg text-black  ">
                <ReservationCard2 openTime={'08:00:00.000Z'} closingTime={'23:00:00.000Z'}
                                  sports={sports} location={locations} searchParams={searchParams} />
            </div>
            {/*<HeaderSearch/>*/}
            <div className="flex py-4 m-auto sm:ml-2 lg:w-2/3 justify-between items-start">
                <SideBarSearch location={locations} searchParams={searchParams} sport={sports}/>
                <div className="w-full lg:flex flex flex-wrap justify-left">
                    {!pitches || pitches.length === 0 ? (
                        <p>No pitch found</p>
                    ) : (
                        pitches.map((pitch,index) => (
                            <PitchCard pitch={pitch} key={index} searchParams={searchParams}/>

                        ))
                    )}
                </div>
            </div>
        </div>


    )
}