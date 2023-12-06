import {PrismaClient} from "@prisma/client";
import TitlePitch from "@/app/pitch/[slug]/components/Title";
import ImagesPitch from "@/app/pitch/[slug]/components/Images";
import ReservationCard from "@/app/pitch/[slug]/components/ReservationCard";

const prisma = new PrismaClient();
const fetchPitchBySlug = async (slug: string):Promise<any> => {
    const pitch = await prisma.pitch.findUnique({
        where: { slug },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true,
            surface: true,
            sport: true,
            size: true,
            outdoor: true,
            open_time: true,
            close_time: true,

        }
    })
    if (!pitch) {
        throw new Error();
    }
    return pitch;
}


export default async function PitchDetails({params}: {params: {slug: string}}) {
    const pitch = await fetchPitchBySlug(params.slug);
    return (
        <>
            <div className="lg:w-[27%] relative text-reg">
                <ReservationCard openTime={pitch.open_time} closingTime={pitch.close_time} slug={params.slug} />
            </div>

            <div className="bg-white lg:w-[65%] rounded p-3 shadow">
                <TitlePitch name={pitch.name}/>
                <div className="text-black mt-4">
                    <h1 className="font-bold text-2xl">Description</h1>
                    <p className="text-lg font-light">{pitch.description}</p>
                </div>
                <div className="text-black mt-4">
                    <h1 className="font-bold text-2xl">Surface</h1>
                    <p className="text-lg font-light">{pitch.surface.name}</p>
                    <h1 className="font-bold text-2xl">sport</h1>
                    <p className="text-lg font-light">{pitch.sport.name}</p>
                    <h1 className="font-bold text-2xl">size</h1>
                    <p className="text-lg font-light">{pitch.size.name}</p>
                    <h1 className="font-bold text-2xl">size</h1>
                    <p className="text-lg font-light">{pitch.outdoor}</p>
                </div>
                <ImagesPitch images={pitch.images}/>
                {/* REVIEWS */}
                <div>
                </div>
                {/* REVIEWS */}
            </div>
        </>

    )
}