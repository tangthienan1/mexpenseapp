import { createContext } from 'react';

export type SharedState = {
    userData?: any;
    currentTrip?: any;
    expenseList?: any;
    // Need to improve updateSharedState type, current ts see that possibly undefined
    // updateSharedState?: (newState: SharedState) => void;
    updateSharedState?: any;
};

export const SharedStateContext = createContext<SharedState>({});
