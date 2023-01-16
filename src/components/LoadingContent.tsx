export default function LoadingContent(props: { count?: number }) {
  return (
    <div className="shine-group">
      {[...Array(props.count || 1)].map((number, i) => (
        <div key={`shimmer-${i}`} className="shine-line shine" />
      ))}
    </div>
  );
}
