"use client";

import { updateOrderStatus } from "@/lib/actions";
import { useTransition } from "react";

const STATUSES = [
  { value: "PENDING", label: "En attente" },
  { value: "PREPARING", label: "En préparation" },
  { value: "DONE", label: "Terminée" },
  { value: "CANCELLED", label: "Annulée" },
] as const;

type Status = (typeof STATUSES)[number]["value"];

const STATUS_COLORS: Record<Status, string> = {
  PENDING: "text-yellow-400 bg-yellow-900/30 border-yellow-800/50",
  PREPARING: "text-blue-400 bg-blue-900/30 border-blue-800/50",
  DONE: "text-emerald-400 bg-emerald-900/30 border-emerald-800/50",
  CANCELLED: "text-red-400 bg-red-900/30 border-red-800/50",
};

export function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as Status;
    startTransition(async () => {
      await updateOrderStatus(orderId, newStatus);
    });
  }

  const colorClass =
    STATUS_COLORS[currentStatus as Status] ||
    "text-stone-400 bg-stone-800 border-stone-700";

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`text-sm border rounded-sm px-3 py-1.5 focus:outline-none transition-colors cursor-pointer disabled:opacity-50 ${colorClass}`}
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value} className="bg-stone-900 text-stone-200">
          {s.label}
        </option>
      ))}
    </select>
  );
}