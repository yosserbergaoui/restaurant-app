"use client";

import { registerUser } from "@/lib/actions";
import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

  startTransition(async () => {
  try {
    await registerUser(formData);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Une erreur est survenue");
    }
  }
});}

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="px-4 py-3 bg-red-900/30 border border-red-800 rounded-sm text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-stone-400 text-xs uppercase tracking-wide mb-2">Nom complet</label>
        <input
          name="name"
          type="text"
          required
          minLength={2}
          placeholder="Jean Dupont"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-stone-400 text-xs uppercase tracking-wide mb-2">Email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="votre@email.com"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-stone-400 text-xs uppercase tracking-wide mb-2">Mot de passe</label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            placeholder="6 caractères minimum"
            className="input-field pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Création en cours..." : "Créer mon compte"}
      </button>
    </form>
  );
}