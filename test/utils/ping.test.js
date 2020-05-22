const ping = require('../../libs/utils/ping');

describe('Ping Utility Test', () => {
    test('Should ping valid URL', () => {
        ping('http://jamaica-gleaner.com', (error, code) => {
            expect(error).toBeNull();
            expect(code).toBeGreaterThan(100);
        });
    });
    
    test('Should not ping incomplete URL', () => {
        ping('http://jamaica-gleaner', (error, code) => {
            expect(error).not.toBeNull();
            expect(code).toBeNull();
        });
    });
});
