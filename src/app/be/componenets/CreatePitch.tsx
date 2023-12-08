"use client";
import {useState} from "react";
import {times} from "../../../../data/times";
import {Props} from "@/app/be/componenets/MenuNavBar";
import UseCreatePitch from "../../../../hooks/useCreatePitch";
import Price from "@/app/be/componenets/Price";
import CheckBox from "@/app/be/componenets/CheckBox";
import {Alert, CircularProgress} from "@mui/material";
import Time from "@/app/be/componenets/Time";

export interface pitchProps {
    location: string;
    sport: string;
    openTime: string;
    closeTime: string;
    surface: string;
    size: string;
    price: number;
    outdoor: boolean;
    name: string;
}

export default function CreatePitch({data,showForm, setShowForm}: { data: Props, showForm:boolean, setShowForm: any }) {
    const [locationData, setLocationData] = useState(data.location[0]);
    const [sportData, setSportData] = useState(data.sport[0]);
    const [nameData, setNameData] = useState<string>('');
    const [openTimeData, setOpenTimeData] = useState("00:00:00.000Z");
    const [closeTimeData, setCloseTimeData] = useState(times[times.length - 1].displayTime);
    const [surfaceData, setSurfaceData] = useState(data.surface[1]);
    const [sizeData, setSizeData] = useState(data.size[0]);
    const [checked, setChecked] = useState(false);
    const [priceData, setPriceData] = useState<number>(20);


    const {createPitch, createPitchData, error,loading} = UseCreatePitch()

    const handleClick = async () => {
        await createPitch(
            {
                props: {
                    name: nameData,
                    location: locationData,
                    sport: sportData,
                    openTime: openTimeData,
                    closeTime: closeTimeData,
                    surface: surfaceData,
                    size: sizeData,
                    price: priceData,
                    outdoor: checked
                }
            }
        )
    }

    return (
        <>
            {showForm && !createPitchData ?
                <div className=" text-black absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded shadow p-6 m-4 max-w-xs max-h-full text-center">
                        <div onClick={() => {setShowForm(false)}} className={" mb-1 text-right text-red-600"}>x</div>
                        {error ? <Alert severity="error">Error creating pitch</Alert> : null}
                            <p className=" flex justify-center mb-1 text-gray-500 text-sm">Create a new pitch</p>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Pitch Name"
                                className="block w-full p-2 rounded bg-gray-200 border border-transparent focus:outline-none"
                                onChange={
                                    (e) => {
                                        setNameData(e.target.value);
                                    }
                                }
                            />
                        </div>
                        <div className={"my-3 flex justify-items-center"}>
                            <div className="mb-4">
                                <label htmlFor="">City</label>
                                <select name="" id="" placeholder="Pitch Location"
                                        className="block p-2 w-32 rounded bg-gray-200 mr-1 border border-transparent focus:outline-none"
                                        value={locationData}
                                        onChange={
                                            (e) => {
                                                setLocationData(e.target.value);
                                            }
                                        }
                                >
                                    {data.location.map((location, index) => (
                                        <option key={index} value={location}>{location}</option>))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="">Sport</label>
                                <select name="" id="" placeholder="Sport"
                                        className="block w-32 p-2 rounded bg-gray-200 border border-transparent focus:outline-none"
                                        value={sportData}
                                        onChange={
                                            (e) => {
                                                setSportData(e.target.value);
                                            }
                                        }
                                >
                                    {data.sport.map((sport, index) => (
                                        <option key={index} value={sport}>{sport}</option>))}
                                </select>
                            </div>
                        </div>
                        <div className={"my-3 flex justify-items-center"}>
                            <div className="mb-4">
                                <label htmlFor="">Surface</label>
                                <select name="" id="" placeholder="Surface"
                                        className="block w-32 mr-1 l p-2 rounded bg-gray-200 border border-transparent focus:outline-none"
                                        value={surfaceData}
                                        onChange={
                                            (e) => {
                                                setSurfaceData(e.target.value);
                                            }
                                        }
                                >
                                    {data.surface.map((surface, index) => (
                                        <option key={index} value={surface}>{surface}</option>))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="">Size</label>
                                <select name="" id="" placeholder="Size"
                                        className="block w-32 p-2 rounded bg-gray-200 border border-transparent focus:outline-none"
                                        value={sizeData}
                                        onChange={
                                            (e) => {
                                                setSizeData(e.target.value);
                                            }
                                        }
                                >
                                    {data.size.map((size, index) => (
                                        <option key={index} value={size}>{size}</option>))}
                                </select>
                            </div>
                        </div>

                        <div className={"my-3 flex justify-items-center"}>
                            <Price priceData={priceData} setPriceData={setPriceData}/>
                            <CheckBox checked={checked} setChecked={setChecked}/>

                        </div>
                        <div className={"my-3 flex justify-items-center"}>
                            <Time timeData={openTimeData} setTimeData={setOpenTimeData} filterTime={"00:00:00.000Z"} title={"Open"}/>
                            {openTimeData !== "00:00:00.000Z" ? <Time timeData={closeTimeData} setTimeData={setCloseTimeData} filterTime={openTimeData} title={"Close"}/> : null}
                        </div>
                        <div className="mb-4">
                            <button
                                className="mt-2 w-full bg-red-600 text-white p-3 rounded"
                                onClick={handleClick}
                            >
                                {loading ? (
                                    <CircularProgress color="inherit" />
                                ) : (
                                    "Create"
                                )}
                            </button>
                        </div>
                    </div>
                </div> : (
                    <div onClick={() => {setShowForm(false)} } className=" text-black absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <Alert severity="success">Pitch "{createPitchData?.name}" created with success</Alert>
                    </div>
                )}

        </>

    )
        ;
}
