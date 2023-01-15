
export default function(props: { count?: number }) {


    return <div className="shine-group">
            {[...Array(props.count || 1)].map(() => (
                <div className="shine-line shine" />
            ))}
        </div>
}