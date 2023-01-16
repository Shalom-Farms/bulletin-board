import { SelectCol } from "../types";

export default function Labels(props: { labels: SelectCol["select"][] }){
    return <div>{props.labels.map((label, i) => (
        <span key={`label-${label.id}`} className={`Label mr-1 ${label.color ? `Label--${label.color}`: ""}`}>{label.name}</span>
    ))}
    </div>
}