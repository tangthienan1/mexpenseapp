import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly tripID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly tripID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Note = LazyLoading extends LazyLoadingDisabled ? EagerNote : LazyNote

export declare const Note: (new (init: ModelInit<Note>) => Note) & {
  copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}

type EagerExpense = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Expense, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: number;
  readonly type: string;
  readonly location?: string | null;
  readonly date?: string | null;
  readonly comment?: string | null;
  readonly tripID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyExpense = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Expense, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: number;
  readonly type: string;
  readonly location?: string | null;
  readonly date?: string | null;
  readonly comment?: string | null;
  readonly tripID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Expense = LazyLoading extends LazyLoadingDisabled ? EagerExpense : LazyExpense

export declare const Expense: (new (init: ModelInit<Expense>) => Expense) & {
  copyOf(source: Expense, mutator: (draft: MutableModel<Expense>) => MutableModel<Expense> | void): Expense;
}

type EagerTrip = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Trip, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tripName?: string | null;
  readonly destination?: string | null;
  readonly budget?: number | null;
  readonly date?: string | null;
  readonly tag?: string | null;
  readonly description?: string | null;
  readonly isRequiredRiskAssessment?: string | null;
  readonly userID: string;
  readonly Expenses?: (Expense | null)[] | null;
  readonly Notes?: (Note | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTrip = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Trip, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tripName?: string | null;
  readonly destination?: string | null;
  readonly budget?: number | null;
  readonly date?: string | null;
  readonly tag?: string | null;
  readonly description?: string | null;
  readonly isRequiredRiskAssessment?: string | null;
  readonly userID: string;
  readonly Expenses: AsyncCollection<Expense>;
  readonly Notes: AsyncCollection<Note>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Trip = LazyLoading extends LazyLoadingDisabled ? EagerTrip : LazyTrip

export declare const Trip: (new (init: ModelInit<Trip>) => Trip) & {
  copyOf(source: Trip, mutator: (draft: MutableModel<Trip>) => MutableModel<Trip> | void): Trip;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly Trips?: (Trip | null)[] | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly Trips: AsyncCollection<Trip>;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}