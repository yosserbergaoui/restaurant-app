"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";

const platSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
  image: z.string().url().optional().or(z.literal("")),
  categoryId: z.string().min(1),
  available: z.coerce.boolean().optional(),
});

export async function createPlat(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  const data = platSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    image: formData.get("image"),
    categoryId: formData.get("categoryId"),
    available: formData.get("available") === "on",
  });

  await prisma.plat.create({ data });
  revalidatePath("/menu");
  revalidatePath("/admin/plats");
  redirect("/admin/plats");
}

export async function updatePlat(id: string, formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  const data = platSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    image: formData.get("image"),
    categoryId: formData.get("categoryId"),
    available: formData.get("available") === "on",
  });

  await prisma.plat.update({ where: { id }, data });
  revalidatePath("/menu");
  revalidatePath("/admin/plats");
  redirect("/admin/plats");
}

export async function deletePlat(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.plat.delete({ where: { id } });
  revalidatePath("/menu");
  revalidatePath("/admin/plats");
}

export async function createOrder(
  items: { platId: string; quantity: number; price: number }[]
) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      total,
      items: {
        create: items.map((i) => ({
          platId: i.platId,
          quantity: i.quantity,
          price: i.price,
        })),
      },
    },
  });

  revalidatePath("/dashboard");
  return { success: true, orderId: order.id };
}

export async function updateOrderStatus(
  orderId: string,
  status: "PENDING" | "PREPARING" | "DONE" | "CANCELLED"
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/admin/commandes");
}

export async function registerUser(formData: FormData) {
  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const data = schema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error("Email déjà utilisé");

  const hashedPassword = await bcrypt.hash(data.password, 12);
  await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });

  redirect("/login?registered=true");
}