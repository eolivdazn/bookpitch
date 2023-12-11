import {times} from "../../../data/times";

export const displayTime = (time: any) =>  {
    return times.find(x => x.time === time)?.displayTime

}