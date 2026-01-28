import { Borrower } from "../models/upgrade/Borrower";
import { faker } from "@faker-js/faker";

export class BorrowerUtil {

    public static async getRandomBorrower(): Promise<Borrower> {
        return new Borrower(
            faker.person.firstName(),
            faker.person.lastName(),
            '123 Main Street',
            'San Francisco',
            'CA',
            '94105',
            this.getRandomDateOfBirth(),
            faker.string.numeric(10),
            faker.number.int({ min: 48000, max: 300000}).toString(), // Individual annual income
            faker.number.int({ min: 0, max: 50000}).toString(), // Additional annual income
        );
    }

    private static getRandomDateOfBirth(): string {
        const dateOfBirth = faker.date.birthdate({ min: 21, max: 65, mode: 'age' });
        const month = String(dateOfBirth.getMonth() + 1).padStart(2, '0');
        const date = String(dateOfBirth.getDate()).padStart(2, '0');
        return `${month}/${date}/${dateOfBirth.getFullYear()}`;
    }
}