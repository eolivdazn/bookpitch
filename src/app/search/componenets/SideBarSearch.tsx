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
        <div className="w-1/5">
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
                        className={"capitalize font-light text-reg" + (searchParams?.location === location ? ' font-extrabold' : '')}>{location}</Link>
                    //     <div className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')}>
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
                          className={"capitalize font-light text-reg" + (searchParams?.sport === sport ? ' font-extrabold' : '')}>{sport}</Link>
                ))}
            </div>
            {/*<div className=" mt-3 pb-4 mr-4">*/}
            {/*    <h1 className="mb-2">Price</h1>*/}
            {/*    <div className="flex">*/}
            {/*        {PRICE_MAP.map(({price,label,className}) => (*/}
            {/*            <Link href={{*/}
            {/*                pathname: '/search',*/}
            {/*                query: {*/}
            {/*                    ...searchParams,*/}
            {/*                    price*/}
            {/*                }*/}
            {/*            }}*/}
            {/*                  className={className}>{label}</Link>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}