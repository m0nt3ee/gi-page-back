import { Logger } from '@nestjs/common';
import { PrismaService } from '../../src/core/prisma/prisma.service';
import { seedArticles } from './article.seed';

const logger = new Logger('Seed');
const prisma = new PrismaService();

async function main() {
  await seedArticles(prisma);

  logger.log('All seed data created successfully');
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
