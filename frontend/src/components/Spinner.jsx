export default function Spinner({ centered = false }) {
  return (
    <div className={centered ? 'text-center py-12' : undefined}>
      <div className="relative w-8 h-8 mx-auto">
        <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: 'rgba(var(--color-text-muted), 0.2)' }} />
        <div className="absolute inset-1 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: 'rgb(var(--color-primary))' }} />
      </div>
    </div>
  );
}
