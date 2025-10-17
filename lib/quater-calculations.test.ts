import { it, describe, expect, vi, beforeEach, afterEach } from 'vitest';
import * as calculations from './quarter-calculations';


describe('getElapsedQuarter', () => {
    describe('0-14:59', () => {

        it('Elapsed hour 12:00 to equal 0', () => {
            const timestamp = new Date('2020-10-21T12:00:00.000Z');
            expect(calculations.getElapsedQuarter(timestamp)).toBe(0);
        });

        it('Elapsed hour 12:07:30 to equal 0.5', () => {
            const timestamp = new Date('2020-10-21T12:07:30.000Z');
            expect(calculations.getElapsedQuarter(timestamp)).toBe(0.5);
        });

        it('Elapsed hour 12:11:15 to equal 0.75', () => {
            const timestamp = new Date('2020-10-21T12:11:15.000Z');
            expect(calculations.getElapsedQuarter(timestamp)).toBe(0.75)
        })
    });

    describe('15-29:59', () => {
        it('Elapsed hour 12:15 to equal 0', () => {
            const timestamp = new Date('2020-10-21T12:15:00.000Z');
            expect(calculations.getElapsedQuarter(timestamp)).toBe(0);
        });

        it('Elapsed hour 12:22:30 to equal 0.5', () => {
            const timestamp = new Date('2020-10-21T12:22:30.000Z');
            expect(calculations.getElapsedQuarter(timestamp)).toBe(0.5);
        });

        it('Elapsed hour 12:26:15 to equal 0.75', () => {
            const timestamp = new Date('2020-10-21T12:26:15.000Z');
            expect(calculations.getElapsedQuarter(timestamp)).toBe(0.75)
        });
    })

    describe('30-44:59', () => {
        it('Elapsed hour 12:30 to equal 0', () => {
            const timestamp = new Date('2020-10-21T12:30:00.000Z');
            expect(calculations.getElapsedQuarter(timestamp)).toBe(0);
        });

        it('Elapsed hour 12:37:30 to equal 0.5', () => {
            const timestamp = new Date('2020-10-21T12:37:30.000Z');
            expect(calculations.getElapsedQuarter(timestamp)).toBe(0.5);
        });

        it('Elapsed hour 12:41:15 to equal 0.75', () => {
            const timestamp = new Date('2020-10-21T12:41:15.000Z');
            expect(calculations.getElapsedQuarter(timestamp)).toBe(0.75);
        });
    });

    describe('45-59:59', () => {
        it('Elapsed hour 12:45 to equal 0', () => {
            const timestamp = new Date('2020-10-21T12:45:00.000Z');
            expect(calculations.getElapsedQuarter(timestamp)).toBe(0);
        });

        it('Elapsed hour 12:52:30 to equal 0.5', () => {
            const timestamp = new Date('2020-10-21T12:52:30.000Z');
            expect(calculations.getElapsedQuarter(timestamp)).toBe(0.5);
        });

        it('Elapsed hour 12:56:15 to equal 0.75', () => {
            const timestamp = new Date('2020-10-21T12:56:15.000Z');
            expect(calculations.getElapsedQuarter(timestamp)).toBe(0.75);
        });
    });

});

describe('getRemainingQuarter', () => {
    it('Remaining quarter 12:00 to equal 1', () => {
        const timestamp = new Date('2020-10-21T12:00:00.000Z');
        expect(calculations.getRemainingQuarter(timestamp)).toBe(1);
    });

    it('Remaining quarter 12:12 to equal 0.2', () => {
        const timestamp = new Date('2020-10-21T12:12:00.000Z');
        expect(calculations.getRemainingQuarter(timestamp)).toBe(0.2);
    });

    it('Remaining quarter 12:07:30 to equal 0.25', () => {
        const timestamp = new Date('2020-10-21T12:07:30.000Z');
        expect(calculations.getRemainingQuarter(timestamp)).toBe(0.5);
    });

    it('Remaining quarter 12:15 to equal 1', () => {
        const timestamp = new Date('2020-10-21T12:15:00.000Z');
        expect(calculations.getRemainingQuarter(timestamp)).toBe(1);
    });

    it('Remaining quarter 12:27 to equal 0.2', () => {
        const timestamp = new Date('2020-10-21T12:12:00.000Z');
        expect(calculations.getRemainingQuarter(timestamp)).toBe(0.2);
    });

    it('Remaining quarter 12:22:30 to equal 0.5', () => {
        const timestamp = new Date('2020-10-21T12:07:30.000Z');
        expect(calculations.getRemainingQuarter(timestamp)).toBe(0.5);
    });
});

describe('isNewQuarter', () => {
    describe('Same day', () => {
        it('Is new quarter when previous quarter is undefined', () => {
            const oldest = null;
            const newest = new Date('2020-10-21T13:20:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });

        it('Is new quarter between 12:00 and 12:14 the same day to equal false', () => {
            const oldest = new Date('2020-10-21T12:00:00.000Z');
            const newest = new Date('2020-10-21T12:14:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(false);
        });

        it('Is new quarter between 12:00 and 12:15 the same day to equal true', () => {
            const oldest = new Date('2020-10-21T12:00:00.000Z');
            const newest = new Date('2020-10-21T12:15:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });

        it('Is new quarter between 12:14 and 12:15 the same day to equal true', () => {
            const oldest = new Date('2020-10-21T12:14:00.000Z');
            const newest = new Date('2020-10-21T12:15:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });

        it('Is new quarter between 12:15 and 12:30 the same day to equal true', () => {
            const oldest = new Date('2020-10-21T12:14:00.000Z');
            const newest = new Date('2020-10-21T12:15:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });

        it('Is new quarter between 12:00 and 12:15 the same day to equal true', () => {
            const oldest = new Date('2020-10-21T12:00:00.000Z');
            const newest = new Date('2020-10-21T12:15:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });

        it('Is new quarter between 12:00 and 12:30 the same day to equal true', () => {
            const oldest = new Date('2020-10-21T12:00:00.000Z');
            const newest = new Date('2020-10-21T12:30:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });

        it('Is new hour between 12:15 and 12:20 the same day to equal false', () => {
            const oldest = new Date('2020-10-21T12:15:00.000Z');
            const newest = new Date('2020-10-21T12:20:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(false);
        });

        it('Is new hour between 12:00 and 13:00 the same day to equal true', () => {
            const oldest = new Date('2020-10-21T12:00:00.000Z');
            const newest = new Date('2020-10-21T13:00:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });

        it('Is new hour between 12:15 and 13:20 the same day to equal true', () => {
            const oldest = new Date('2020-10-21T12:15:00.000Z');
            const newest = new Date('2020-10-21T13:20:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });
    });

    describe('Next day', () => {
        it('Is new hour between 12:00 and 12:30 the next day to equal true', () => {
            const oldest = new Date('2020-10-21T12:00:00.000Z');
            const newest = new Date('2020-10-22T12:30:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });

        it('Is new hour between 12:00 and 12:14 the next day to equal true', () => {
            const oldest = new Date('2020-10-21T12:00:00.000Z');
            const newest = new Date('2020-10-22T12:14:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });

        it('Is new hour between 12:15 and 12:20 the next day to equal true', () => {
            const oldest = new Date('2020-10-21T12:15:00.000Z');
            const newest = new Date('2020-10-22T12:20:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });

        it('Is new hour between 12:00 and 11:00 the next day to equal true', () => {
            const oldest = new Date('2020-10-21T12:00:00.000Z');
            const newest = new Date('2020-10-22T11:00:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });

        it('Is new hour between 12:10 and 11:10 the next day to equal true', () => {
            const oldest = new Date('2020-10-21T12:10:00.000Z');
            const newest = new Date('2020-10-22T11:10:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });

        it('Is new hour between 12:15 and 13:10 the next day to equal true', () => {
            const oldest = new Date('2020-10-21T12:15:00.000Z');
            const newest = new Date('2020-10-22T13:10:00.000Z');
            expect(calculations.isNewQuarter(newest, oldest)).toBe(true);
        });
    });
});


describe('predictRemainingQuarter', () => {
    it('should predict 0W consumption if nothing is passed in', () => {
        expect(calculations.predictRemainingQuarter([])).toBe(0);
    });
    it('should predict 0W consumption if undefined is passed in', () => {
        expect(calculations.predictRemainingQuarter(undefined)).toBe(0);
    });

    it('should predict 1000W consumption if that is the only consumption this far', () => {
        expect(calculations.predictRemainingQuarter([{ consumption: 1000, timestamp: new Date('2020-10-21T12:30:00.000Z') }])).toBe(1000);
    });

    it('should predict 250W for the remaining hour', () => {
        expect(
            calculations.predictRemainingQuarter([
                { consumption: 1000, timestamp: new Date('2020-10-21T12:45:00.000Z') },
                { consumption: 1000, timestamp: new Date('2020-10-21T12:00:00.000Z') }
            ])
        ).toBe(250);
    });

    it('should predict 500W for the remaining hour', () => {
        expect(
            calculations.predictRemainingQuarter([
                { consumption: 2000, timestamp: new Date('2020-10-21T12:45:00.000Z') },
                { consumption: 2000, timestamp: new Date('2020-10-21T12:00:00.000Z') }
            ])
        ).toBe(500);
    });

    // TODO: Fix
    // it('should predict 375W for the remaining hour', () => {
    //     expect(
    //         calculations.predictRemainingQuarter([
    //             { consumption: 2000, timestamp: new Date('2020-10-21T12:45:00.000Z') },
    //             { consumption: 1500, timestamp: new Date('2020-10-21T12:30:00.000Z') },
    //             { consumption: 1500, timestamp: new Date('2020-10-21T12:00:00.000Z') }
    //         ])
    //     ).toBe(375);
    // });

    // it('should predict 900W for the remaining hour', () => {
    //     expect(
    //         calculations.predictRemainingQuarter([
    //             { consumption: 2000, timestamp: new Date('2020-10-21T12:30:00.000Z') },
    //             { consumption: 2000, timestamp: new Date('2020-10-21T12:10:00.000Z') },
    //             { consumption: 1000, timestamp: new Date('2020-10-21T12:05:00.000Z') }
    //         ])
    //     ).toBe(900);
    // });

    // it('should predict 1000W for the remaining hour', () => {
    //     expect(
    //         calculations.predictRemainingQuarter([
    //             { consumption: 1000, timestamp: new Date('2020-10-21T12:00:00.000Z') },
    //             { consumption: 1000, timestamp: new Date('2020-10-21T12:10:00.000Z') },
    //             { consumption: 1000, timestamp: new Date('2020-10-21T12:15:00.000Z') },
    //             { consumption: 1000, timestamp: new Date('2020-10-21T12:20:00.000Z') },
    //             { consumption: 1000, timestamp: new Date('2020-10-21T12:25:00.000Z') }
    //         ])
    //     ).toBe(1000);
    // });
});
