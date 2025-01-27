/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/types.ts
export interface Category {
  id: string;
  name: string;
  parent_id?: string;
}

export interface DocumentType {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  destinations?:any[]
}

export type DocumentWithoutId = Omit<DocumentType, 'id'>;
export type DocumentWithId = DocumentType;

export interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface FirestoreDocument extends Omit<DocumentType, 'createdAt' | 'updatedAt' | 'id'> {
  id: string;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
}