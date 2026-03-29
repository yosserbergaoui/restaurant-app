"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";

type Category = { id: string; name: string };
type DefaultValues = {
  title?: string;
  description?: string | null;
  price?: number;
  image?: string | null;
  categoryId?: string;
  available?: boolean;
};

type PlatFormProps = {
  categories: Category[];
  action: (formData: FormData) => Promise<void>;
  defaultValues?: DefaultValues;
};

export function PlatForm({ categories, action, defaultValues }: PlatFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(defaultValues?.image || "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
  try {
    await action(formData);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Une erreur est survenue");
    }
  }
});
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="px-4 py-3 bg-red-900/30 border border-red-800 rounded-sm text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-stone-400 text-xs uppercase tracking-wide mb-2">Nom du plat *</label>
        <input
          name="title"
          type="text"
          required
          minLength={2}
          defaultValue={defaultValues?.title}
          placeholder="Ex: Steak Frites"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-stone-400 text-xs uppercase tracking-wide mb-2">Description</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={defaultValues?.description ?? ""}
          placeholder="Ingrédients, préparation..."
          className="input-field resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-stone-400 text-xs uppercase tracking-wide mb-2">Prix (DT) *</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={defaultValues?.price}
            placeholder="0.00"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-stone-400 text-xs uppercase tracking-wide mb-2">Catégorie *</label>
          <select
            name="categoryId"
            required
            defaultValue={defaultValues?.categoryId}
            className="input-field"
          >
            <option value="">Choisir...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-stone-400 text-xs uppercase tracking-wide mb-2">URL de limage</label>
        <input
          name="image"
          type="url"
          defaultValue={defaultValues?.image ?? ""}
          placeholder="https://..."
          className="input-field"
          onChange={(e) => setImagePreview(e.target.value)}
        />
        {imagePreview && (
          <div className="mt-3 relative aspect-video w-full max-w-xs rounded-sm overflow-hidden bg-stone-800">
            <Image
              src={imagePreview}
              alt="Aperçu"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
              onError={() => setImagePreview("")
               
              }
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          name="available"
          type="checkbox"
          id="available"
          defaultChecked={defaultValues?.available ?? true}
          className="w-4 h-4 accent-amber-500"
        />
        <label htmlFor="available" className="text-stone-300 text-sm cursor-pointer">
          Plat disponible au menu
        </label>
      </div>

      <div className="flex gap-3 pt-4 border-t border-stone-800">
        <button
          type="submit"
          disabled={isPending}
          className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Enregistrement..." : defaultValues ? "Mettre à jour" : "Créer le plat"}
        </button>
        <Link href="/admin/plats" className="btn-outline">Annuler</Link>
      </div>
    </form>
  );
}