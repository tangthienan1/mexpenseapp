export type HomeEntriesItemProps = {
    type: string;
    amount: number;
    date: string;
};

export type NoteItemType = {
    date: string;
    title: string;
    content: string;
};

export type TripType = {
    name: string;
    destination: string;
    budget?: number;
    date: string;
    tag: TagType;
    description?: string;
    requiredRiskAssessment: RequiredRiskAssessmentType;
    userUID?: string;
};

export enum TagType {
    BUSINESS = 'business',
    FAMILY = 'family',
    PERSONAL = 'personal',
}

export enum RequiredRiskAssessmentType {
    TRUE = 1,
    FALSE = 0,
}