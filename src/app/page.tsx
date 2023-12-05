import Header from "./components/Header";
// import RestaurantCard from "./components/RestaurantCard";
import {PrismaClient} from "@prisma/client";
import PitchCard from "@/app/components/PitchCard";

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

    },
  })
  return pitches;
}



export default async function Home() {
  const pitches = await fetchPitches();
  return (

      <main>
        <Header/>
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