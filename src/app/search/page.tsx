// import HeaderSearch from "./componenets/HeaderSearch";
// import SideBarSearch from "./componenets/SideBarSearch";
// import RestaurantCardSearch from "./componenets/RestaurantCardSearch";
import { PrismaClient} from "@prisma/client";
import PitchCard from "@/app/components/PitchCard";
import SideBarSearch from "@/app/search/componenets/SideBarSearch";

const prisma = new PrismaClient();

interface SearchParams {
    sport?: string;
    location?: string;
    surface?: string;
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
    // if (searchParams.surface) {
    //     where.surface = {
    //         equals: searchParams.surface,
    //     };
    // }


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
            main_image: true

        }
    });
}

export default async function Search({searchParams}: {
    searchParams: SearchParams;
}) {

    const locations = await fetchByLocation()
    const sports = await fetchBySports()
    const pitches = await fetchPitchesByParams(searchParams)
    return (
        <div className="text-black">
            {/*<HeaderSearch/>*/}
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SideBarSearch location={locations} searchParams={searchParams} sport={sports}/>
                <div className="w-5/6">
                    {!pitches || pitches.length === 0 ? (
                        <p>No restaurants found</p>
                    ) : (
                        pitches.map((pitch,index) => (
                            <PitchCard pitch={pitch} key={index}/>

                        ))
                    )}
                </div>
            </div>
        </div>


    )
}