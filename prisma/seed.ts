import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  const existing = await prisma.listing.findMany({
    where: { exactBusinessName: { in: ['Rasa Fine Dining', 'The Copper Kettle'] } },
    select: { id: true, exactBusinessName: true },
  })

  const existingNames = new Set(existing.map((l: any) => l.exactBusinessName))

  if (!existingNames.has('Rasa Fine Dining')) {
    await prisma.listing.create({
      data: {
        status: 'ACTIVE',
        businessType: 'Fine Dining Restaurant',
        category: 'Restaurant',
        neighbourhood: 'Jubilee Hills',
        revenueRangeMin: 700000,
        revenueRangeMax: 900000,
        askingPriceRangeMin: 15000000,
        askingPriceRangeMax: 18000000,
        yearsInOperation: 7,
        sqftRange: '3,800–4,200 sq ft',
        tags: ['Fully Operational', 'Prime Location', 'Liquor License', '80 Covers'],
        highlights: [
          'Established clientele with 7 years of consistent footfall',
          'Full bar setup with valid liquor license',
          'Lease balance of 6 years remaining',
          'Monthly revenue ₹7L–9L with 18% profit margin',
        ],
        heroImage: '/images/restaurant-jubilee.png',
        publicImages: ['/images/restaurant-jubilee.png'],
        exactBusinessName: 'Rasa Fine Dining',
        fullAddress: 'Plot 42, Road No. 36, Jubilee Hills, Hyderabad - 500033',
        ownerName: 'Suresh Reddy',
        ownerPhone: '+91 98765 43210',
        ownerEmail: 'suresh@rasadining.com',
        exactMonthlyRevenue: 820000,
        exactAskingPrice: 16500000,
        leaseYears: 6,
        profitMargin: 18,
        additionalNotes: 'Owner relocating abroad. Serious buyers only.',
        fullGallery: ['/images/restaurant-jubilee.png'],
      },
    })
    console.log('✓ Seeded: Rasa Fine Dining')
  } else {
    console.log('– Skipped: Rasa Fine Dining (already exists)')
  }

  if (!existingNames.has('The Copper Kettle')) {
    await prisma.listing.create({
      data: {
        status: 'ACTIVE',
        businessType: 'Artisan Cafe & Bakery',
        category: 'Cafe',
        neighbourhood: 'Banjara Hills',
        revenueRangeMin: 400000,
        revenueRangeMax: 550000,
        askingPriceRangeMin: 6000000,
        askingPriceRangeMax: 8000000,
        yearsInOperation: 4,
        sqftRange: '1,400–1,600 sq ft',
        tags: ['Profitable', 'Loyal Customer Base', 'Fully Equipped', 'Instagram Famous'],
        highlights: [
          'Strong social media presence with 28K followers',
          'In-house bakery with signature recipes',
          'Lease balance of 4 years remaining',
          'Average daily footfall of 120–150 customers',
        ],
        heroImage: '/images/cafe-banjara.png',
        publicImages: ['/images/cafe-banjara.png'],
        exactBusinessName: 'The Copper Kettle',
        fullAddress: '8-2-293/82/A, Road No. 14, Banjara Hills, Hyderabad - 500034',
        ownerName: 'Priya Sharma',
        ownerPhone: '+91 91234 56789',
        ownerEmail: 'priya@copperkettlecafe.com',
        exactMonthlyRevenue: 480000,
        exactAskingPrice: 7200000,
        leaseYears: 4,
        profitMargin: 22,
        additionalNotes: 'Owner expanding to a new concept. Full handover support offered.',
        fullGallery: ['/images/cafe-banjara.png'],
      },
    })
    console.log('✓ Seeded: The Copper Kettle')
  } else {
    console.log('– Skipped: The Copper Kettle (already exists)')
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
