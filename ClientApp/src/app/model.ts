export interface Target {
    id: number;
    name: string;
    description: string;
    status: string;
    primaryContacts: Array<Contact>;
    financialData: Array<Financial>;
}

export interface Contact {
    id: number;
    personalName: string;
    familyName: string;
    middleName: string;
    alias: string;
    phone: string;
    email: string;
}

export interface Financial
{
    id: number;
    leadId: number;
    eventDate: Date;
    currencyValue: number;
}