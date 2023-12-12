import Form from "./componenets/Form";
import {PrismaClient} from "@prisma/client";
import {displayTime} from "@/app/help/help";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

async function ReservationPage(props: any) {
    const {params, searchParams} = props;

    const pitch = await prisma.pitch.findUnique({
        where: {
            slug: params.slug
        },
        select: {
            main_image: true,
            name: true,
            location: true,
            price: true,
            surface: true,
            outdoor: true
        }
    })
    if (!pitch) {
        return <div>loading...</div>
    }

    return (
        <div className="border-t">
            <div className="py-2 lg:w-3/5 m-auto text-black">
                <div className="mt-1 justify-center flex lg:w-[660px] w-full shadow p-3 border-b">
                    <img
                        src={pitch.main_image}
                        alt=""
                        className="w-44 h-44 rounded"
                    />
                    <div className="ml-4">
                        <h4 className="text-2xl font-bold text-black">
                            {pitch.name}
                        </h4>
                        <div className=" mt-3">
                            <p className="mr-6">{searchParams.day}</p>
                            <p className="mr-6">{displayTime(searchParams.time)}</p>
                            <p className="capitalize mr-6">Price: {pitch.price}</p>
                            <p className="capitalize mr-6">{pitch.surface.name}</p>
                            <p className="capitalize mr-6">outdoor: {pitch.outdoor}</p>
                        </div>
                    </div>
                </div>
                <Form day={searchParams.day} time={searchParams.time} slug={params.slug} amount={pitch.price}
                      name={pitch.name}/>
            </div>
        </div>


    )
}

export default ReservationPage;