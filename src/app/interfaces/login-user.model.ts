export interface LogInUser {
    userEmail: string;
    userPassword: string;
    errors: errors;
}

interface errors {
    userEmailError: string;
    userPasswordError: string;
}