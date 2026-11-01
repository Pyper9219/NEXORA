export interface PricingPlan {
  id: string
  name: string
  price: string
  interval: 'month' | 'year'
  features: string[]
  popular: boolean
  ctatext: string
  ctahref: string
}

export const PRICING: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    interval: 'month',
    features: [
      '100 automation tasks/month',
      'Email support',
      'Basic analytics',
      '1 user seat',
    ],
    popular: false,
    ctatext: 'Start Free Trial',
    ctahref: '/contact',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$79',
    interval: 'month',
    features: [
      '500 automation tasks/month',
      'Email & Chat support',
      'Advanced analytics',
      '3 user seats',
      'AI predictive insights',
    ],
    popular: true,
    ctatext: 'Get Started',
    ctahref: '/pricing',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$159',
    interval: 'month',
    features: [
      '1,000 automation tasks/month',
      'Priority support',
      'All features',
      '5 user seats',
      'Custom integrations',
      'API access',
    ],
    popular: false,
    ctatext: 'Contact Sales',
    ctahref: '/contact',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    interval: 'month',
    features: [
      'Unlimited tasks',
      'Dedicated account manager',
      'White-label solution',
      'Custom compliance',
      'SLA guaranteed',
      'On-premise option',
    ],
    popular: false,
    ctatext: 'Talk to Expert',
    ctahref: '/contact',
  },
]