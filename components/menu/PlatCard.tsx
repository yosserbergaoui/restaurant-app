import Link from "next/link";
import Image from "next/image";

type Plat = {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  image?: string | null;
  category: { name: string };
};

export function PlatCard({ plat }: { plat: Plat }) {
  return (
    <Link href={`/menu/${plat.id}`} className="card-plat group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-800">
        {plat.image ? (
          <Image
            src={plat.image}
            alt={plat.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
        )}
        <span className="absolute top-3 left-3 badge bg-stone-950/80 text-amber-300 text-[10px] backdrop-blur-sm">
          {plat.category.name}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg text-stone-100 group-hover:text-amber-300 transition-colors leading-tight mb-2">
          {plat.title}
        </h3>
        {plat.description && (
          <p className="text-stone-500 text-xs leading-relaxed mb-3 line-clamp-2">
            {plat.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="font-display text-xl text-amber-400">
            {plat.price.toFixed(2)} €
          </span>
          <span className="text-stone-600 text-xs group-hover:text-amber-400 transition-colors">
            Voir →
          </span>
        </div>
      </div>
    </Link>
  );
}