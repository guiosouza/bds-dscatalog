import { formatPrice } from "util/formatters";

describe('formatPrice for positive numbers', () => {
    test('formatPrice should format number pt-BR when given 10.1', () => {
        // ARRANGE
        const value = 10.2;
        // ACT
        const result = formatPrice(value)
        // ASSERT
        expect(result).toEqual("10,20");
    });

    test('formatPrice should format number pt-BR when given 10.1', () => {
        const value = 0.1;
        const result = formatPrice(value)
        expect(result).toEqual("0,10");
    });

});

