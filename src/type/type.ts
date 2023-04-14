export type HomeEntriesItemProps = {
    type: string;
    amount: number;
    date: string;
};

export type UserDataType = {
    id: string;
    name: string;
    email: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export type NoteType = {
    date: string;
    title: string;
    content: string;
};

export type ExpenseType = {
    id: string;
    amount: number;
    type: string;
    location: string;
    date: Date;
    comment: string;
    tripID: string;
}

export type TripType = {
    id: string;
    tripName: string;
    destination: string;
    budget?: number;
    date: Date;
    tag: TagType;
    description?: string;
    isRequiredRiskAssessment: boolean;
    userID?: string;
};

export enum TagType {
    BUSINESS = 'business',
    FAMILY = 'family',
    PERSONAL = 'personal',
}

export type HubPayload = {
    event: string,
    data?: any,
    message?: string
};