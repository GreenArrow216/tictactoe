import { winColor } from "../../constants";
import { iconProps } from "./X";

export default function O(props: iconProps) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke={props.strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-target ${props.strokeColor === winColor ? 'winner-cell' : ''}`}><circle cx="12" cy="12" r="8"></circle></svg>
}