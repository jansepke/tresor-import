import { findImplementation } from '../../src';
import * as sbroker from '../../src/brokers/sbroker27';
import { allSamples, buySamples, dividendSamples } from './__mocks__/sbroker27';

describe('Broker: sBroker27', () => {
  describe('Check all documents', () => {
    test('Can the document parsed with sbroker', () => {
      allSamples.forEach(pages => {
        expect(sbroker.canParseDocument(pages, 'pdf')).toEqual(true);
      });
    });

    test('Can identify a implementation from the document as sbroker', () => {
      allSamples.forEach(pages => {
        const implementations = findImplementation(pages, 'pdf');

        expect(implementations.length).toEqual(1);
        expect(implementations[0]).toEqual(sbroker);
      });
    });
  });

  describe('Buy', () => {
    test('Can parse document: 2021_GB0002875804', () => {
      const result = sbroker.parsePages(buySamples[0]);

      expect(result.status).toEqual(0);
      expect(result.activities).toEqual([
        {
          broker: 'sBroker',
          type: 'Buy',
          date: '2021-11-30',
          datetime: '2021-11-30T09:27:32.000Z',
          isin: 'GB0002875804',
          wkn: '916018',
          company: 'BRITISH AMERICAN TOBACCO PLC REGISTERED SHARES LS -,25',
          shares: 33,
          price: 29.9,
          amount: 986.7,
          fee: 9.97,
          tax: 0,
        },
      ]);
    });

    test('Can parse document: 2021_LU0322253906', () => {
      const result = sbroker.parsePages(buySamples[1]);

      expect(result.status).toEqual(0);
      expect(result.activities).toEqual([
        {
          broker: 'sBroker',
          type: 'Buy',
          date: '2021-11-22',
          datetime: '2021-11-22T' + result.activities[0].datetime.substring(11),
          isin: 'LU0322253906',
          wkn: 'DBX1AU',
          company: 'XTR.MSCI EUROPE SMALL CAP INHABER-ANTEILE 1C O.N.',
          shares: 3.9327,
          price: 63.56955781015587,
          amount: 250,
          fee: 0,
          tax: 0,
        },
      ]);
    });

    test('Can parse document: 2021_IE00BFY0GT14', () => {
      const result = sbroker.parsePages(buySamples[2]);

      expect(result.status).toEqual(0);
      expect(result.activities).toEqual([
        {
          broker: 'sBroker',
          type: 'Buy',
          date: '2021-11-22',
          datetime: '2021-11-22T' + result.activities[0].datetime.substring(11),
          isin: 'IE00BFY0GT14',
          wkn: 'A2N6CW',
          company: 'SPDR MSCI WORLD UCITS ETF REG.SHARES USD UNHGD ACC. O.N.',
          shares: 5.2279,
          price: 28.692209108819984,
          amount: 150,
          fee: 3.75,
          tax: 0,
        },
      ]);
    });
  });

  describe('Dividend', () => {
    test('Can parse document: 2021_US88579Y1010', () => {
      const result = sbroker.parsePages(dividendSamples[0]);

      expect(result.status).toEqual(0);
      expect(result.activities).toEqual([
        {
          broker: 'sBroker',
          type: 'Buy',
          date: '2021-12-13',
          datetime: '2021-12-13T' + result.activities[0].datetime.substring(11),
          isin: 'US88579Y1010',
          wkn: '851745',
          company: '3M CO. REGISTERED SHARES DL -,01',
          shares: 20,
          price: 1.305575158786168,
          amount: 26.11150317572336,
          fee: 0,
          tax: 6.67,
          fxRate: 1.1336,
          foreignCurrency: 'USD',
        },
      ]);
    });
  });
});
