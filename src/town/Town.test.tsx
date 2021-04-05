import {getWindDirection} from './Town';


describe('Testing Town class methods :', () => {
    describe('getting North wind direction', () => {
        it('properly get the N wind direction', () => {
            expect(getWindDirection(350)).toBe("N");
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
});