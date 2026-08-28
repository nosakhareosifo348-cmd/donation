const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Seed some sample donations
  await prisma.donation.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        amount: 500,
        currency: 'USD',
        message: 'Happy to support this cause!',
        status: 'COMPLETED',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        amount: 1000,
        currency: 'USD',
        status: 'COMPLETED',
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Seeding complete.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
