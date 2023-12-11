import Form from "./componenets/Form";
import {PrismaClient} from "@prisma/client";

export const dynamic='force-dynamic';

const prisma = new PrismaClient();
async function ReservationPage(props:any) {
    const { params, searchParams } = props;

    const pitch = await  prisma.pitch.findUnique({
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
        <div className="border-t h-screen">
            <div className="py-9 lg:w-3/5 m-auto text-black">
                {/* HEADER */}
                <div>
                    <div className="mt-5 justify-center items-center lg:flex lg:w-[660px] w-full shadow p-3 border-b">
                        <img
                            src={pitch.main_image}
                            alt=""
                            className="w-44 rounded"
                        />
                        <div className="ml-4">
                            <h2 className="text-3xl font-bold text-black">
                                {pitch.name}
                            </h2>
                            <div className=" mt-3">
                                <p className="mr-6">{searchParams.day}</p>
                                <p className="mr-6">{searchParams.time}</p>
                                <p className="capitalize mr-6">{pitch.price}</p>
                                <p className="capitalize mr-6">{pitch.surface.name}</p>
                                <p className="capitalize mr-6">{pitch.outdoor}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Form day={searchParams.day} time={searchParams.time} slug={params.slug} amount={pitch.price} name={pitch.name}/>
            </div>
        </div>


    )
}

export default ReservationPage;