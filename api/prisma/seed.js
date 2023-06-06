const { BCrypt } = require('jwt-auth-helper');
const { prisma } = require('../src/database/connection');

async function main() {
  const userData = [
    {
      name: 'Samayun',
      email: 'admin@gmail.com',
      password: await BCrypt.makeHash('admin'),
      role: 'ADMIN',
    },
    {
      name: 'Support Admin',
      email: 'support@gmail.com',
      password: await BCrypt.makeHash('123456'),
      role: 'SUPPORT',
    },

    {
      name: 'Alex Xu',
      email: 'alex@gmail.com',
      password: await BCrypt.makeHash('123456'),
      role: 'USER',
    },
  ];

  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
