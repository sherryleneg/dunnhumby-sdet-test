import { given, when, then, and } from 'cypress-cucumber-preprocessor/steps';

declare global {
    const Given: typeof given;
    const When: typeof when;
    const Then: typeof then;
    const And: typeof and;
}