import { createContext } from 'react';
import { Trip } from '../API';
import { ExpenseType, UserDataType } from '../type/type';

export type SharedState = {
    userData?: UserDataType;
    tripList?: Trip[];
    currentTrip?: Trip;
    expenseList?: ExpenseType;
    // Need to improve updateSharedState type, current ts see that possibly undefined
    // updateSharedState?: (newState: SharedState) => void;
    updateSharedState?: any;
};

export const SharedStateContext = createContext<SharedState>({});
