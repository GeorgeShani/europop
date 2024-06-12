export interface RegUser {
    userEmail: string;
    userPassword: string;
    userConfirmedPassword: string;
    errors: errors;
}

interface errors {
    userEmailError: string;
    userPasswordError: string;
    userConfirmedPasswordError: string;
}