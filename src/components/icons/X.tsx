import { winColor } from "../../constants";

export type iconProps = {
    strokeColor: string,
}

export default function X(props: iconProps) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke={props.strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-x ${props.strokeColor === winColor ? 'winner-cell' : ''}`}><line x1="18" y1="6" x2="6" y2="18" className='backslash'></line><line x1="6" y1="6" x2="18" y2="18" className='slash'></line></svg>
}