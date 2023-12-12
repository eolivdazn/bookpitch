import Link from "next/link";

export default function SideBarSearch(
    {
        location,
        sport,
        searchParams
    }:
        {
            location: string[],
            sport: string[],
            searchParams?: { sport?: string, location?: string, price?: string}

        }) {
    return (
        <div className="w-1/5 ml-2 hidden lg:block md:block">
            <div className="border-b pb-4 mr-4 flex flex-col">
                <h1 className="mb-2">location</h1>
                {location.map((location: string) => (
                    <Link
                        href={{
                            pathname: '/search',
                            query: {
                                ...searchParams,
                                location: location
                            }
                        }}
                        className={"capitalize  text-reg" + (searchParams?.location === location ? ' font-bold' : ' font-light')}>{location}</Link>
                ))}

            </div>
            <div className="border-b pb-4 mt-3 mr-4 flex flex-col">
                <h1 className="mb-2 ">Sports</h1>
                {sport.map((sport: string) => (
                    <Link href={{
                        pathname: '/search',
                        query: {
                            ...searchParams,
                            sport: sport
                        }
                    }}
                          className={"capitalize text-reg" + (searchParams?.sport === sport ? ' font-bold' : ' font-light')}>{sport}</Link>
                ))}
            </div>
        </div>
    )
}