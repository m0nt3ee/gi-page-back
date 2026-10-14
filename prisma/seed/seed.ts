import { PrismaService } from '../../src/core/prisma/prisma.service';
import { seedArticles } from './article.seed';

const prisma = new PrismaService();

async function main() {
  await seedArticles(prisma);

  console.log('All seed data created successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
