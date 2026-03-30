import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log(" Seeding...");

  const categories = await Promise.all([
    prisma.category.upsert({ where: { name: "Entrées" }, update: {}, create: { name: "Entrées" } }),
    prisma.category.upsert({ where: { name: "Plats principaux" }, update: {}, create: { name: "Plats principaux" } }),
    prisma.category.upsert({ where: { name: "Desserts" }, update: {}, create: { name: "Desserts" } }),
    prisma.category.upsert({ where: { name: "Boissons" }, update: {}, create: { name: "Boissons" } }),
  ]);

  const [entrees, platsP, desserts, boissons] = categories;

  const adminPassword = await bcrypt.hash("admin123", 12);
  const userPassword = await bcrypt.hash("user123", 12);

  await prisma.user.upsert({
    where: { email: "admin@restaurant.com" },
    update: {},
    create: { name: "Admin", email: "admin@restaurant.com", password: adminPassword, role: Role.ADMIN },
  });

  await prisma.user.upsert({
    where: { email: "user@restaurant.com" },
    update: {},
    create: { name: "Jean Dupont", email: "user@restaurant.com", password: userPassword, role: Role.USER },
  });

  const platsData = [
    { title: "Soupe à l'oignon", description: "Soupe traditionnelle gratinée", price: 8.5, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600", categoryId: entrees.id },
    { title: "Salade César", description: "Laitue romaine, parmesan, croûtons", price: 10.0, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600", categoryId: entrees.id },
    { title: "Steak Frites", description: "Entrecôte grillée 300g, frites maison", price: 24.0, image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600", categoryId: platsP.id },
    { title: "Magret de canard", description: "Magret rôti, sauce aux cerises", price: 26.5, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600", categoryId: platsP.id },
    { title: "Saumon en croûte", description: "Filet de saumon, croûte d'herbes", price: 22.0, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600", categoryId: platsP.id },
    { title: "Risotto aux champignons", description: "Risotto crémeux, champignons sauvages", price: 18.0, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600", categoryId: platsP.id },
    { title: "Crème brûlée", description: "Crème vanille, caramel craquant", price: 7.0, image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600", categoryId: desserts.id },
    { title: "Moelleux au chocolat", description: "Gâteau fondant, glace vanille", price: 8.5, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600", categoryId: desserts.id },
    { title: "Eau minérale", description: "50cl", price: 2.5, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600", categoryId: boissons.id },
    { title: "Verre de vin rouge", description: "Sélection du sommelier", price: 6.0, image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600", categoryId: boissons.id },
  ];

  for (const plat of platsData) {
    await prisma.plat.create({ data: plat });
  }

  console.log(" Done!");
  console.log("Admin: admin@restaurant.com / admin123");
  console.log("User:  user@restaurant.com / user123");
}

main().catch(console.error).finally(() => prisma.$disconnect());