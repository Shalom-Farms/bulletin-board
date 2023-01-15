
export default function LoadingContent(props: { count?: number }) {


    return <div className="shine-group">
            {[...Array(props.count || 1)].map((number) => (
                <div key={`shimmer-${number}`} className="shine-line shine" />
            ))}
        </div>
}