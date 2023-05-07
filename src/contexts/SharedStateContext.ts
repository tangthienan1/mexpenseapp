import { createContext } from 'react';
import { Expense, Trip, User } from '../API';

export type SharedState = {
    userData: User;
    tripList?: Trip[];
    currentTrip?: Trip;
    expenseList?: Expense;
    // Need to improve updateSharedState type, current ts see that possibly undefined
    // updateSharedState?: (newState: SharedState) => void;
    updateSharedState?: any;
};

export const SharedStateContext = createContext<SharedState>({
    userData: {
        __typename: 'User',
        id: '',
        name: '',
        email: '',
        Trips: undefined,
        image: undefined,
        createdAt: '',
        updatedAt: '',
        _version: 0,
        _deleted: undefined,
        _lastChangedAt: 0
    }
});
