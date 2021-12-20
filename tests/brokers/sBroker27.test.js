import { findImplementation } from '../../src';
import * as sbroker from '../../src/brokers/sbroker27';
import { allSamples, buySamples } from './__mocks__/sbroker27';

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
  });
});
