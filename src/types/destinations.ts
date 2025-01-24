// destinations/types.ts
export interface Destination {
    id: string;
    name: string;
  }
  
  export interface DocumentType {
    title: string;
    content: string;
    categoryId: string;
    destinationIds: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface DocumentWithId extends DocumentType {
    id: string;
  }
  