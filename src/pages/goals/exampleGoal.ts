import { GoalTemplate } from "@/types/goalTypes";

// Example usage in CareerPathPage
export const marketingStrategyTemplate: GoalTemplate = {
    id: 'marketing-strategy',
    title: 'Marketing Strategy Development',
    description: 'Create a comprehensive marketing strategy',
    requiredCategories: ['market-research', 'competitor-analysis', 'marketing-plans'],
    steps: [
      {
        id: 'market-research',
        title: 'Conduct Market Research',
        description: 'Analyze market trends and customer needs',
        requiredDocuments: [
          {
            categoryId: 'market-research',
            title: 'Market Analysis Report',
            description: 'Document market size, trends, and customer segments'
          }
        ]
      },
      {
        id: 'competitor-analysis',
        title: 'Analyze Competitors',
        description: 'Research and document competitor strategies',
        requiredDocuments: [
          {
            categoryId: 'competitor-analysis',
            title: 'Competitor Analysis Document',
            description: 'Detailed analysis of main competitors'
          }
        ],
        dependsOn: ['market-research']
      }
    ],
    suggestedDocuments: []
  };