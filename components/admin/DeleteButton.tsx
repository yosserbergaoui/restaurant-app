"use client";

import { useTransition, useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

type DeleteButtonProps = {
  id: string;
  action: (id: string) => Promise<void>;
  label?: string;
};

export function DeleteButton({ id, action, label = "Supprimer" }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  function handleDelete() {
    startTransition(async () => {
      await action(id);
      setShowConfirm(false);
    });
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-stone-500 hover:text-red-400 transition-colors text-sm flex items-center gap-1"
      >
        <Trash2 size={12} />
        {label}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm px-4">
          <div className="bg-stone-900 border border-stone-700 rounded-sm p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
              <div>
                <p className="text-stone-100 font-medium">Confirmer la suppression</p>
                <p className="text-stone-500 text-sm">Cette action est irréversible.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors disabled:opacity-50"
              >
                {isPending ? "Suppression..." : "Supprimer"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isPending}
                className="flex-1 btn-outline text-sm"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}