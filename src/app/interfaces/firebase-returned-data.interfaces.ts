import { DocumentReference, DocumentChangeType, DocumentData } from '@angular/fire/firestore';

export interface DocumentChangeAction {
  // 'added' | 'modified' | 'removed';
  type: DocumentChangeType;
  payload: DocumentChange;
}

export interface DocumentChange {
  type: DocumentChangeType;
  doc: DocumentSnapshot;
  oldIndex: number;
  newIndex: number;
}

export interface DocumentSnapshot {
  exists: boolean;
  ref: DocumentReference;
  id: string;
  metadata: any;
  data(): DocumentData;
  get(fieldPath: string): any;
}
