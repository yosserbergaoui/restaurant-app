export function PlatCardSkeleton() {
  return (
    <div className="card-plat">
      <div className="skeleton aspect-[4/3]" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="flex justify-between mt-4">
          <div className="skeleton h-6 w-16 rounded" />
          <div className="skeleton h-4 w-10 rounded" />
        </div>
      </div>
    </div>
  );
}