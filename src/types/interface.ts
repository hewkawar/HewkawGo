export interface Site {
    name?: string;
    url?: string;
}

export interface LinkRow {
    id?: string;
    name: string;
    url: string;
    target: string;
    created_at: Date;
    updated_at: Date;
}