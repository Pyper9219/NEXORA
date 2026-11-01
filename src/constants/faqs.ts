export interface Faq {
  id: string
  question: string
  answer: string
}

export const FAQs: Faq[] = [
  {
    id: '1',
    question: 'What is Nexora AI?',
    answer: 'Nexora AI is an intelligent automation platform that helps businesses streamline operations, reduce costs, and accelerate growth through AI-powered workflows and predictive analytics.',
  },
  {
    id: '2',
    question: 'How does the free trial work?',
    answer: 'Start a 14-day free trial with no credit card required. You get full access to all Pro features including 1,000 automation tasks, advanced analytics, and priority support.',
  },
  {
    id: '3',
    question: 'Can I switch between monthly and annual billing?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Annual billing saves 20% compared to monthly pricing.',
  },
  {
    id: '4',
    question: 'Which payment methods do you accept?',
    answer: 'We support local payment methods (M-PESA, Airtel Money, PesaLink) and international methods (Visa, Mastercard, Amex, PayPal, Stripe, Apple Pay, Google Pay, and cryptocurrency).',
  },
  {
    id: '5',
    question: 'Is my data secure with Nexora AI?',
    answer: 'Yes, we use enterprise-grade encryption, SOC-2 compliance, and role-based access controls. All data is encrypted at rest and in transit.',
  },
  {
    id: '6',
    question: 'Do you offer API access?',
    answer: 'API access is available on Pro and Enterprise plans. Contact our team to discuss your integration needs.',
  },
]