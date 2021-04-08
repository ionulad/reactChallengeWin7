import {capitalizeFirstLetter, convertKelvinToCelsius, getWindDirection} from './Town';


describe('Testing Town class methods :', () => {
    describe('getting North wind direction', () => {
        it('properly get the N wind direction', () => {
            expect(getWindDirection(350)).toBe("N");
        });
    });
    describe('getting North wind direction if inputting 0', () => {
        it('properly get the N wind direction', () => {
            expect(getWindDirection(0)).toBe("N");
        });
    });
    describe('getting North wind direction by default', () => {
        it('properly get the N wind direction', () => {
            expect(getWindDirection(undefined)).toBe("N");
        });
    });

    describe('getting South wind direction', () => {
        it('properly get the s wind direction', () => {
            expect(getWindDirection(180)).toBe("S");
        });
    });
    describe('getting East wind direction', () => {
        it('properly get the E wind direction', () => {
            expect(getWindDirection(90)).toBe("E");
        });
    });
    describe('getting West wind direction', () => {
        it('properly get the W wind direction', () => {
            expect(getWindDirection(280)).toBe("W");
        });
    });

    describe('getting uppercase first letter', () => {
        it('properly returns the string with the first letter as uppercase', () => {
            expect(capitalizeFirstLetter("really Strong Wind")).toBe("Really Strong Wind");
        });
    });

    describe('getting Celsius degrees from Kelvin', () => {
        it('properly returns rounded Celsius degrees', () => {
            expect(convertKelvinToCelsius(280)).toBe("6.9");
        });
    });
});