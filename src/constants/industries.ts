export interface IndustryCard {
  id: string
  name: string
  icon: string
  problem: string
  solution: string
  example: string
  cta: string
}

export const INDUSTRIES: IndustryCard[] = [
  {
    id: '1',
    name: 'E-commerce',
    icon: 'Truck',
    problem: 'High cart abandonment rates and inventory mismanagement',
    solution: 'AI-powered cart recovery, demand forecasting, and personalized product recommendations',
    example: 'Reduced cart abandonment from 72% to 23% in 60 days',
    cta: 'See How',
  },
  {
    id: '2',
    name: 'SaaS',
    icon: 'ChartBar',
    problem: 'High trial churn and limited scalability',
    solution: 'Predictive churn scoring, automated onboarding, and usage-based expansion triggers',
    example: 'Increased trial-to-paid from 15% to 47% in 30 days',
    cta: 'See How',
  },
  {
    id: '3',
    name: 'Finance',
    icon: 'Bank',
    problem: 'Regulatory compliance and fraud detection',
    solution: 'AI compliance monitoring, real-time fraud alerts, and automated reporting',
    example: '99.9% compliance audit pass rate, 40% fraud reduction',
    cta: 'See How',
  },
  {
    id: '4',
    name: 'Healthcare',
    icon: 'Heart',
    problem: 'Patient no-shows and administrative burden',
    solution: 'Automated appointment reminders, scheduling optimization, and patient engagement',
    example: 'Reduced no-show rate from 23% to 9%',
    cta: 'See How',
  },
  {
    id: '5',
    name: 'Real Estate',
    icon: 'Home',
    problem: 'Lead qualification delays and follow-up gaps',
    solution: 'AI lead scoring, automated follow-ups, and property matching',
    example: '5x faster lead response, 3x more closed deals',
    cta: 'See How',
  },
  {
    id: '6',
    name: 'Logistics',
    icon: 'Leaf',
    problem: 'Route optimization and cost management',
    solution: 'AI route optimization, fuel cost prediction, and fleet management',
    example: '28% fuel cost reduction, 15% faster deliveries',
    cta: 'See How',
  },
  {
    id: '7',
    name: 'Education',
    icon: 'GraduationCap',
    problem: 'Student enrollment drops and retention challenges',
    solution: 'Automated admission processes, engagement campaigns, and retention predictions',
    example: '40% enrollment increase, 35% higher retention',
    cta: 'See How',
  },
  {
    id: '8',
    name: 'Marketing',
    icon: 'Palette',
    problem: 'Campaign inefficiency and budget waste',
    solution: 'AI-optimized ad spend, automated A/B testing, and audience segmentation',
    example: '35% lower CPA, 2x ROAS improvement',
    cta: 'See How',
  },
  {
    id: '9',
    name: 'Legal',
    icon: 'Gavel',
    problem: 'Document review bottlenecks and case management',
    solution: 'AI document analysis, automated workflows, and case prediction',
    example: '70% faster document review, 40% reduced case prep time',
    cta: 'See How',
  },
  {
    id: '10',
    name: 'Nonprofit',
    icon: 'Lifebuoy',
    problem: 'Limited resources and donor retention',
    solution: 'Automated donor engagement, grant writing support, and volunteer coordination',
    example: '50% donor retention increase, 3x grant applications',
    cta: 'See How',
  },
]