import Big from 'big.js';
import { validateAllSamples } from '../setup/brokers';
import * as ersteBank from '../../src/brokers/ersteBank';
import { buySamples, dividendSamples } from './__mocks__/ersteBank';

const allSamples = buySamples.concat(dividendSamples);
describe('Broker: Erste Bank', () => {
  let consoleErrorSpy;

  validateAllSamples(ersteBank, allSamples);

  describe('Validate buys', () => {
    test('Map the buy order for AT0000APOST4 correctly', () => {
      const activities = ersteBank.parsePages(buySamples[0]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2020-06-05',
        datetime: '2020-06-05T09:54:50.000Z',
        isin: 'AT0000APOST4',
        company: 'OESTERREICHISCHE POST AG',
        shares: 33,
        price: 30.9,
        amount: 1019.7,
        fee: 22.35,
        tax: 0,
      });
    });

    test('Map the buy order for AT00000VIE62 correctly', () => {
      const activities = ersteBank.parsePages(buySamples[1]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2020-06-03',
        datetime: '2020-06-03T13:49:46.000Z',
        isin: 'AT00000VIE62',
        company: 'FLUGHAFEN WIEN AG',
        shares: 36,
        price: 28.1,
        amount: 1011.6,
        fee: 22.35,
        tax: 0,
      });
    });

    test('Map the buy order for DE0005773303 correctly', () => {
      const activities = ersteBank.parsePages(buySamples[2]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2020-06-03',
        datetime: '2020-06-03T13:51:15.000Z',
        isin: 'DE0005773303',
        company: 'FRAPORT AG FFM.AIRPORT.SERVICE AG',
        shares: 22,
        price: 45.76,
        amount: 1006.72,
        fee: 22.88,
        tax: 0,
      });
    });

    test('Map the buy order for GB00B03MLX29 correctly', () => {
      const activities = ersteBank.parsePages(buySamples[3]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2020-02-05',
        datetime: '2020-02-05T08:00:25.000Z',
        isin: 'GB00B03MLX29',
        company: 'ROYAL DUTCH SHELL',
        shares: 72,
        price: 23.55,
        amount: 1695.6,
        fee: 28.5,
        tax: 0,
      });
    });

    test('Map the buy order for GB00B03MLX29 correctly', () => {
      const activities = ersteBank.parsePages(buySamples[4]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2020-03-04',
        datetime: '2020-03-04T11:43:05.000Z',
        isin: 'GB0004544929',
        company: 'IMPERIAL BRANDS PLC',
        shares: 17,
        price: 18.69,
        amount: 317.73,
        fee: 1.25,
        tax: 0,
      });
    });

    test('Map the buy order for US02209S1033 correctly', () => {
      const activities = ersteBank.parsePages(buySamples[5]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2019-11-12',
        datetime: '2019-11-12T12:31:00.000Z',
        isin: 'US02209S1033',
        company: 'ALTRIA GROUP INC.',
        shares: 40,
        price: 42.29,
        amount: 1691.6,
        fee: 23.6,
        tax: 0,
      });
    });

    test('Map the buy order for US88579Y1010 correctly', () => {
      const activities = ersteBank.parsePages(buySamples[6]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2019-12-18',
        datetime: '2019-12-18T11:24:31.000Z',
        isin: 'US88579Y1010',
        company: '3M CO.',
        shares: 11,
        price: 153.26,
        amount: 1685.86,
        fee: 22.9,
        tax: 0,
      });
    });

    test('Map the USD buy order for US00206R1023_1 correctly', () => {
      const activities = ersteBank.parsePages(buySamples[7]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2019-09-13',
        datetime: '2019-09-13T13:32:14.000Z',
        isin: 'US00206R1023',
        company: 'AT & T INC.',
        shares: 20,
        price: 34.3705,
        fxRate: 1.1056,
        foreignCurrency: 'USD',
        amount: 687.41,
        fee: 24.63,
        tax: 0,
      });
    });

    test('Map the USD buy order for US00206R1023_2 correctly', () => {
      const activities = ersteBank.parsePages(buySamples[8]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2019-09-18',
        datetime: '2019-09-18T15:29:52.000Z',
        isin: 'US00206R1023',
        company: 'AT & T INC.',
        shares: 30,
        price: 33.16733333333333,
        fxRate: 1.105,
        foreignCurrency: 'USD',
        amount: 995.02,
        fee: 24.66,
        tax: 0,
      });
    });

    test('Map the USD currency buy order for US2546871060 correctly', () => {
      const activities = ersteBank.parsePages(buySamples[9]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2019-12-02',
        datetime: '2019-12-02T14:35:19.000Z',
        isin: 'US2546871060',
        company: 'WALT DISNEY CO., THE',
        shares: 13,
        price: 137.76846153846154,
        fxRate: 1.1033,
        foreignCurrency: 'USD',
        amount: 1790.99,
        fee: 23.99,
        tax: 0,
      });
    });

    test('Map the USD currency buy order for US2546871060 correctly', () => {
      const activities = ersteBank.parsePages(buySamples[10]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2020-09-17',
        datetime: '2020-09-17T13:30:00.000Z',
        isin: 'US5949181045',
        company: 'MICROSOFT CORP.',
        shares: 6,
        price: 170.03666666666666,
        fxRate: 1.1791,
        foreignCurrency: 'USD',
        amount: 1020.22,
        fee: 23.34,
        tax: 0,
      });
    });

    test('Parse an older export from 2017 correctly (0)', () => {
      const activities = ersteBank.parsePages(buySamples[11]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2017-03-02',
        datetime: '2017-03-02T14:43:50.000Z',
        isin: 'AT0000A05HR3',
        company: 'ERSTE BOND EMERGING MARKETS CORPOR.',
        shares: 999,
        price: 170.6674974974975,
        amount: +Big(171198.63).minus(701.8),
        fee: 701.8,
        tax: 0,
      });
    });

    test('Parse an older export from 2017 correctly (1)', () => {
      const activities = ersteBank.parsePages(buySamples[12]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2017-03-01',
        datetime: '2017-03-01T14:46:26.000Z',
        isin: 'AT0000A08SH5',
        company: 'ERSTE IMMOBILIENFONDS',
        shares: 999,
        price: 126.6085085085085,
        amount: +Big(127991.88).minus(1509.98),
        fee: 1509.98,
        tax: 0,
      });
    });

    test('Parse an older export from 2017 correctly (2)', () => {
      const activities = ersteBank.parsePages(buySamples[13]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2017-03-02',
        datetime: '2017-03-02T14:42:13.000Z',
        isin: 'AT0000660600',
        company: 'ESPA SELECT BOND (T)',
        shares: 999,
        price: 161.9953053053053,
        amount: +Big(162337.5).minus(504.19),
        fee: 504.19,
        tax: 0,
      });
    });

    test('Parse an older export from 2017 correctly (3)', () => {
      const activities = ersteBank.parsePages(buySamples[14]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2017-03-02',
        datetime: '2017-03-02T14:43:02.000Z',
        isin: 'AT0000707674',
        company: 'ESPA BEST OF WORLD',
        shares: 999,
        price: 108.2912012012012,
        amount: +Big(108761.13).minus(578.22),
        fee: 578.22,
        tax: 0,
      });
    });

    test('Parse an export from 2020 correctly (0)', () => {
      const activities = ersteBank.parsePages(buySamples[15]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2020-05-12',
        datetime: '2020-05-12T13:06:12.000Z',
        isin: 'AT0000A11F86',
        company: 'YOU INVEST ACTIVE EUR R T',
        shares: 999,
        price: 107.4,
        amount: 107292.6,
        fee: 2029.86,
        tax: 0,
      });
    });

    test('Parse an export from 2020 correctly (1)', () => {
      const activities = ersteBank.parsePages(buySamples[16]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2020-05-11',
        datetime: '2020-05-11T13:06:12.000Z',
        isin: 'AT0000753504',
        company: 'ERSTE STOCK TECHNO EUR R T',
        shares: 999,
        price: 102.06,
        amount: 101957.94,
        fee: 360.07,
        tax: 0,
      });
    });

    test('Parse an export from 2020 correctly (2)', () => {
      const activities = ersteBank.parsePages(buySamples[17]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2020-05-11',
        datetime: '2020-05-11T13:06:12.000Z',
        isin: 'AT0000705678',
        company: 'ERSTE WWF STOCK ENV EUR R T',
        shares: 999,
        price: 167.87,
        amount: 167702.13,
        fee: 435.12,
        tax: 0,
      });
    });

    test('Parse an export from 2020 correctly (3)', () => {
      const activities = ersteBank.parsePages(buySamples[18]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2020-05-12',
        datetime: '2020-05-12T13:06:12.000Z',
        isin: 'AT0000680970',
        company: 'ERSTE STOCK EM GLOBAL EUR R T',
        shares: 999,
        price: 191.35,
        amount: 191158.65,
        fee: 234.21,
        tax: 0,
      });
    });

    test('Parse an export from 2020 correctly (4)', () => {
      const activities = ersteBank.parsePages(buySamples[19]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Buy',
        date: '2020-05-12',
        datetime: '2020-05-12T13:06:12.000Z',
        isin: 'AT0000A296E8',
        company: 'ERSTE FUTURE INVEST EUR R T',
        shares: 999,
        price: 110.79,
        amount: 110679.21,
        fee: 550.4,
        tax: 0,
      });
    });
  });

  describe('Validate Dividends', () => {
    test('Map the buy order for dividend from 2017 correctly', () => {
      const activities = ersteBank.parsePages(dividendSamples[0]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Dividend',
        date: '2017-07-03',
        datetime: '2017-07-03T' + activities[0].datetime.substring(11),
        isin: 'AT0000707674',
        company: 'ESPA BEST OF WORLD',
        shares: 138,
        price: 2,
        amount: 276,
        fee: 0,
        tax: 70.89,
      });
    });

    test('Map the buy order for dividend from 2018 correctly', () => {
      const activities = ersteBank.parsePages(dividendSamples[1]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Dividend',
        date: '2018-07-02',
        datetime: '2018-07-02T' + activities[0].datetime.substring(11),
        isin: 'AT0000707674',
        company: 'ESPA BEST OF WORLD',
        shares: 138,
        price: 2.5,
        amount: 345,
        fee: 0,
        tax: 141.7,
      });
    });

    test('Map the buy order for dividend from 2019 correctly', () => {
      const activities = ersteBank.parsePages(dividendSamples[2]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Dividend',
        date: '2019-07-01',
        datetime: '2019-07-01T' + activities[0].datetime.substring(11),
        isin: 'AT0000707674',
        company: 'ESPA BEST OF WORLD EUR R A',
        shares: 138,
        price: 2.5,
        amount: 345,
        fee: 0,
        tax: 142.42,
      });
    });

    test('Can parse 2020 3m_co dividend', () => {
      const activities = ersteBank.parsePages(dividendSamples[3]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Dividend',
        date: '2020-12-16',
        datetime: '2020-12-16T' + activities[0].datetime.substring(11),
        isin: 'US88579Y1010',
        company: '3M CO.',
        shares: 11,
        price: 1.2054545454545456,
        amount: 13.26,
        fee: 0,
        tax: 3.65,
        fxRate: 1.2193,
        foreignCurrency: 'USD',
      });
    });

    test('Can parse 2020 Coca Cola dividend', () => {
      const activities = ersteBank.parsePages(dividendSamples[4]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Dividend',
        date: '2020-12-16',
        datetime: '2020-12-16T' + activities[0].datetime.substring(11),
        isin: 'US1912161007',
        company: 'COCA-COLA CO.',
        shares: 24,
        price: 0.33625,
        amount: 8.07,
        fee: 0,
        tax: 2.22,
        fxRate: 1.2193,
        foreignCurrency: 'USD',
      });
    });

    test('Can parse 2020 Royal Dutch Shell dividend', () => {
      const activities = ersteBank.parsePages(dividendSamples[5]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ersteBank',
        type: 'Dividend',
        date: '2020-12-17',
        datetime: '2020-12-17T' + activities[0].datetime.substring(11),
        isin: 'GB00B03MLX29',
        company: 'ROYAL DUTCH SHELL',
        shares: 72,
        price: 0.1386111111111111,
        amount: 9.98,
        fee: 0,
        tax: 2.75,
      });
    });
  });

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });
});
