import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = [
  {
    title: 'Eat. Stay. Love.',
    description: 'An all-in-one Experience at Fratelli Vineyards awaits when you book a flight to Pune',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    destination: 'Pune',
    category: 'Wine & Dine',
    price: 299.99,
    duration: '3 days',
    featured: true,
  },
  {
    title: 'Sun Set Savour',
    description: 'Enjoy an exclusive Experience at Sula Vineyards when you book a flight to Nashik',
    imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
    destination: 'Nashik',
    category: 'Wine & Dine',
    price: 249.99,
    duration: '2 days',
    featured: true,
  },
  {
    title: 'Festivals From India',
    description: 'Explore arts and culture festivals across India.',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    destination: 'India',
    category: 'Cultural',
    price: 199.99,
    duration: '5 days',
    featured: true,
  },
  {
    title: 'Travel wanderlust',
    description: 'Travel to your next destination based on how you feel and what you like.',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
    destination: 'Multiple',
    category: 'Adventure',
    price: 599.99,
    duration: '7 days',
    featured: true,
  },
  {
    title: 'Kerala Backwaters',
    description: 'Experience the serene backwaters of Kerala with traditional houseboat stays.',
    imageUrl: 'https://images.unsplash.com/photo-1575130350197-29c84c52e12b?w=400&h=300&fit=crop',
    destination: 'Kerala',
    category: 'Nature',
    price: 449.99,
    duration: '4 days',
    featured: false,
  },
  {
    title: 'Rajasthan Heritage',
    description: 'Discover the royal heritage of Rajasthan with palace tours and cultural experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1580800964973-ef9d7d5ac96a?w=400&h=300&fit=crop',
    destination: 'Rajasthan',
    category: 'Heritage',
    price: 699.99,
    duration: '6 days',
    featured: false,
  },
  {
    title: 'Goa Beach Paradise',
    description: 'Relax on pristine beaches with water sports and vibrant nightlife.',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    destination: 'Goa',
    category: 'Beach',
    price: 349.99,
    duration: '4 days',
    featured: false,
  },
  {
    title: 'Himalayan Adventure',
    description: 'Trek through the majestic Himalayas with professional guides.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    destination: 'Himachal Pradesh',
    category: 'Adventure',
    price: 899.99,
    duration: '8 days',
    featured: false,
  },
  {
    title: 'Mumbai Street Food Tour',
    description: 'Explore the bustling streets of Mumbai with local food guides.',
    imageUrl: 'https://images.unsplash.com/photo-1567129937968-cdad8f07e2f8?w=400&h=300&fit=crop',
    destination: 'Mumbai',
    category: 'Food',
    price: 149.99,
    duration: '1 day',
    featured: false,
  },
  {
    title: 'Delhi Historical Walk',
    description: 'Walk through centuries of history in India\'s capital city.',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop',
    destination: 'Delhi',
    category: 'Heritage',
    price: 99.99,
    duration: '1 day',
    featured: false,
  },
];

async function main(): Promise<void> {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.experience.deleteMany();
  console.log('🧹 Cleared existing experiences');

  // Create new experiences
  for (const experience of seedData) {
    await prisma.experience.create({
      data: experience,
    });
  }

  console.log(`✅ Seeded ${seedData.length} experiences`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });