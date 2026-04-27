export interface Investment {
  id: string
  title: string
  type: string
  requiredCapital: string
  equityOffered: string
  expectedROI: string
  paybackPeriod: string
  monthlyRevenue: string
  imageUrl: string
  badge: string
  description: string
}

export const investments: Investment[] = [
  {
    id: '1',
    title: 'Restaurant Expansion — 5 New Locations',
    type: 'Restaurant · Equity Deal',
    requiredCapital: '₹1.5 Cr',
    equityOffered: '20%',
    expectedROI: '28%',
    paybackPeriod: '2.5 Yrs',
    monthlyRevenue: '₹12–15L',
    imageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
    badge: '✦ Verified',
    description: 'Fund the expansion of a proven restaurant brand from 2 to 7 locations across Hyderabad. Established operations, strong brand, and experienced management team.',
  },
  {
    id: '2',
    title: 'Cloud Kitchen Rollout — 10 City Expansion',
    type: 'Cloud Kitchen · Partnership',
    requiredCapital: '₹50L',
    equityOffered: 'Profit Share',
    expectedROI: '30%',
    paybackPeriod: '1.8 Yrs',
    monthlyRevenue: '₹8–10L',
    imageUrl: '/images/cloud-kitchen-expansion.jpg',
    badge: '↑ High ROI',
    description: 'Partner in scaling a cloud kitchen model already profitable in 2 cities to 10 cities. Asset-light model with strong unit economics.',
  },
  {
    id: '3',
    title: 'IT SaaS Startup — Pre-Series A',
    type: 'Technology · Equity Deal',
    requiredCapital: '₹2 Cr',
    equityOffered: '15%',
    expectedROI: '35%',
    paybackPeriod: '3 Yrs',
    monthlyRevenue: '₹25–30L',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    badge: '🚀 Fast Growing',
    description: 'HITEC City-based B2B SaaS platform with 45+ enterprise clients. Looking for a strategic investor ahead of Series A round.',
  },
  {
    id: '4',
    title: 'Luxury Salon Chain — Franchise Model',
    type: 'Salon & Spa · Franchise',
    requiredCapital: '₹80L',
    equityOffered: 'Revenue Share',
    expectedROI: '22%',
    paybackPeriod: '2.2 Yrs',
    monthlyRevenue: '₹6–8L',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    badge: '✦ Verified',
    description: 'Invest in a 4-outlet luxury salon chain expanding through a franchise model. Standardized operations, premium brand, proven concept.',
  },
]
