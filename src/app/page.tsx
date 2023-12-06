import Header from "./components/Header";
// import RestaurantCard from "./components/RestaurantCard";
import {PrismaClient} from "@prisma/client";
import PitchCard from "@/app/components/PitchCard";
import ReservationCard2 from "./components/ReservationCard2";

const prisma = new PrismaClient();


const fetchPitches = async (): Promise<any[]> => {
  const pitches = await prisma.pitch.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      location: true,
      price: true,
      sport: true,
      surface: true,
      size: true,
      outdoor: true,

    },
  })
  return pitches;
}

const fetchSports = async (): Promise<any[]> => {
    const sports = await prisma.sport.findMany({
        select: {
        id: true,
        name: true,
        },
    })
    return sports;

}



export default async function Home() {
  const pitches = await fetchPitches();
  const sports = await fetchSports();
  return (

      <main>
        <Header/>
          <div className="relative text-reg text-black  ">
              <ReservationCard2 openTime={'08:00:00.000Z'} closingTime={'23:00:00.000Z'} sports={sports}  />
          </div>

        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
          {pitches.map((pitch ,index) => (
              <PitchCard
                  pitch={pitch} key={index}
              />

          ))}
        </div>


      </main>

  )
}