export interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    age?: number;
}

export interface UserAge {
    id: string;
    age: number;
}

export interface UserFullName {
    id: string;
    firstName: string;
    lastName: string;
}
