export interface FormField {
    id: number
    label: string;
    name: string;
    field: string;
    requiredYn: string;
    errorMessage: string;
    inline: string;
    toasterMessage: string;
    options: Options[]
}

export interface Options {
    id: number;
    name: string;
}