import {times} from "../../../../data/times";

export default function Time({timeData,filterTime, setTimeData, title}: {filterTime:string, timeData: any, setTimeData: any, title: string}) {
    return (
        <div className="mb-4">
            <label htmlFor="">{title} Time</label>
            <select name="" id="" placeholder="Pitch Open Time"
                    className="block w-32 mr-1 p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    value={timeData}
                    onChange={
                        (e) => {
                            console.log(e.target.value, "e.target.value")
                            setTimeData(e.target.value);
                        }
                    }
            >
                {times.filter((time) =>
                    (time.time >= filterTime)).map((time, index) => (
                    <option key={index} value={time.time}>{time.displayTime}</option>))}
            </select>
        </div>

    );
}
