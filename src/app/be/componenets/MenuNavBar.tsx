"use client";
import Link from "next/link";
import {useState} from "react";
import CreatePitch from "@/app/be/componenets/CreatePitch";
import UseCreatePitch from "../../../../hooks/useCreatePitch";

export interface Props {
    location: string[];
    sport: string[];
    surface: string[];
    size: string[];
}

export default function MenuNavBar( {data}:{data: Props}){
    const [create, setCreate] = useState(false)
    const {createPitchData} = UseCreatePitch()

    console.log(createPitchData,"createPitchData MenuNAvBar")

    const handleClickCreate = async () => {
        setCreate(true)
    }

    return (
        <nav className="bg-white flex border ">
            <div className={"p-3"}>
                <button
                    onClick={handleClickCreate}
                    // disabled={loading}
                    className="bg-red-600 rounded cursor-pointer  p-2 text-white mr-3 mb-3 shadow"
                >Create

                </button>
            <Link href="/" className="bg-red-600 rounded cursor-pointer  p-2 text-white mr-3 mb-3 shadow"> Edit </Link>
            <Link href="/" className="bg-red-600 rounded cursor-pointer  p-2 text-white mr-3 mb-3 shadow"> Delete </Link>
            </div>

            <div>
                {create ? <CreatePitch data={
                    {
                        location: data.location,
                        sport: data.sport,
                        surface: data.surface,
                        size: data.size
                    } } showForm={create} setShowForm={setCreate}/>: null}
            </div>
        </nav>
    );
}
