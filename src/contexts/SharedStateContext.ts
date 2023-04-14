import { createContext } from 'react';
import { ExpenseType, TripType, UserDataType } from '../type/type';

export type SharedState = {
    userData?: UserDataType;
    tripList?: TripType[];
    currentTrip?: TripType;
    expenseList?: ExpenseType;
    // Need to improve updateSharedState type, current ts see that possibly undefined
    // updateSharedState?: (newState: SharedState) => void;
    updateSharedState?: any;
};

export const SharedStateContext = createContext<SharedState>({});
