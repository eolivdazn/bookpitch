import {times} from "../../../../data/times";

export default function Time({timeData, setTimeData, title}: { timeData: string, setTimeData: any, title: string}) {
    return (
        <div className="mb-4">
            <label htmlFor="">{title} Time</label>
            <select name="" id="" placeholder="Pitch Open Time"
                    className="block w-32 mr-1 p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    value={timeData}
                    onChange={
                        (e) => {
                            setTimeData(e.target.value);
                        }
                    }
            >
                {times.map((time, index) => (
                    <option key={index} value={time.time}>{time.displayTime}</option>))}
            </select>
        </div>

    );
}
