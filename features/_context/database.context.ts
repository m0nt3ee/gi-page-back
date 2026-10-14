import { Given, BeforeAll } from '@cucumber/cucumber';
import { execSync } from 'child_process';

function resetDatabase() {
  execSync('npx prisma migrate reset --force', { stdio: 'pipe' });
}

function seedDatabase() {
  execSync('npx prisma db seed', { stdio: 'pipe' });
}

BeforeAll(() => {
  resetDatabase();
  seedDatabase();
});

Given('I use an empty database', () => {
  resetDatabase();
});

Given('I reset the database', () => {
  resetDatabase();
  seedDatabase();
});
