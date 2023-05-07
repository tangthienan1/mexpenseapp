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