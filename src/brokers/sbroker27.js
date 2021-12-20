import { Big } from 'big.js';
import {
  parseGermanNum,
  validateActivity,
  createActivityDateTime,
} from '@/helper';

const parseBuyDocument = (/** @type {Importer.page} */ content) => {
  content = content.slice(content.indexOf('ISIN'));

  const shares = findShares(content);
  const amount = findAmount(content);

  /** @type {Partial<Importer.Activity>} */
  let activity = {
    broker: 'sBroker',
    type: 'Buy',
    isin: findIsin(content),
    wkn: findWkn(content),
    company: findCompany(content),
    shares: +shares,
    amount: +amount,
    price: +amount.div(shares),
    fee: findFee(content),
    tax: 0,
  };

  [activity.date, activity.datetime] = findDateTime(content);

  return validateActivity(activity);
};

const parseDividendDocument = (/** @type {Importer.page} */ content) => {
  content = content.slice(content.indexOf('ISIN'));

  const shares = findShares(content);
  let amount = findAmountPayoutGross(content);
  const amountNet = findAmountPayoutNet(content);

  /** @type {Partial<Importer.Activity>} */
  let activity = {
    broker: 'sBroker',
    type: 'Dividend',
    isin: findIsin(content),
    wkn: findWkn(content),
    company: findCompany(content),
    shares: +shares,
    fee: findFee(content),
  };

  [activity.date, activity.datetime] = findDateTime(content);
  // @ts-ignore
  [activity.foreignCurrency, activity.fxRate] = findForeignInformation(content);

  if (!activity.foreignCurrency) {
    delete activity.foreignCurrency;
  }

  if (!activity.fxRate) {
    delete activity.fxRate;
  } else {
    amount = amount.div(activity.fxRate);
  }

  activity.amount = +amount;
  activity.price = +amount.div(shares);
  activity.tax = +amount.minus(amountNet);

  return validateActivity(activity);
};

const findShares = (/** @type {Importer.page} */ content) => {
  return Big(parseGermanNum(content[5]));
};

const findPositionOfIsin = (/** @type {Importer.page} */ content) => {
  let position = content.indexOf('Handels-/Ausf');
  if (position > 0) {
    return position;
  }

  position = content.indexOf('Zahlbarkeitstag');
  if (position > 0) {
    return position;
  }
};

const findCompany = (/** @type {Importer.page} */ content) => {
  return content.slice(6, findPositionOfIsin(content) - 2).join(' ');
};

const findIsin = (/** @type {Importer.page} */ content) => {
  return content[findPositionOfIsin(content) - 2];
};

const findWkn = (/** @type {Importer.page} */ content) => {
  return content[findPositionOfIsin(content) - 1].replace(/[{()}]/g, '');
};

const findFee = (/** @type {Importer.page} */ content) => {
  let total = Big(0);

  const orderFeeLineNumber = content.indexOf('Provision');
  if (orderFeeLineNumber >= 0) {
    const offset = content.indexOf('% vom Kurswert') < 0 ? 0 : 2;
    total = total.add(parseGermanNum(content[orderFeeLineNumber + offset + 1]));
  }

  return +total;
};

const findAmount = (/** @type {Importer.page} */ content) => {
  return Big(parseGermanNum(content[content.indexOf('Kurswert') + 1]));
};

const findAmountPayoutGross = (/** @type {Importer.page} */ content) => {
  return Big(
    parseGermanNum(content[content.indexOf('Dividendengutschrift') + 1])
  );
};

const findAmountPayoutNet = (/** @type {Importer.page} */ content) => {
  return Big(parseGermanNum(content[content.indexOf('Ausmachender') + 2]));
};

const findDateTime = (/** @type {Importer.page} */ content) => {
  let dateValue, timeValue;
  let lineNumber = content.indexOf('Schlusstag/-Zeit');

  if (lineNumber > 0) {
    dateValue = content[lineNumber + 1];
    timeValue = content[lineNumber + 2];
  } else {
    lineNumber = content.indexOf('Schlusstag');

    if (lineNumber > 0) {
      dateValue = content[lineNumber + 1];
    } else {
      lineNumber = content.indexOf('Zahlbarkeitstag');

      if (lineNumber > 0) {
        dateValue = content[lineNumber + 1];
      }
    }
  }

  return createActivityDateTime(
    dateValue,
    timeValue,
    undefined,
    'dd.MM.yyyy HH:mm:ss'
  );
};

/**
 * @param {Importer.page} content
 * @returns {(string | number)[]}
 */
const findForeignInformation = content => {
  const lineNumber = content.indexOf('Devisenkurs');
  if (lineNumber <= 0) {
    return [undefined, undefined];
  }

  return [
    content[lineNumber + 2].split(/\s/)[1],
    parseGermanNum(content[lineNumber + 3]),
  ];
};

const getDocumentType = (/** @type {Importer.page} */ content) => {
  if (isBuy(content)) {
    return 'Buy';
  }

  if (isDividend(content)) {
    return 'Dividend';
  }
};

const isBuy = (/** @type {Importer.page} */ content) => {
  const lineNumber = content.indexOf('Wertpapier');

  return (
    lineNumber > 0 &&
    lineNumber + 2 < content.length &&
    content[lineNumber + 1] === 'Abrechnung' &&
    (content[lineNumber + 2] === 'Kauf' ||
      content[lineNumber + 2] === 'Ausgabe')
  );
};

const isDividend = (/** @type {Importer.page} */ content) => {
  return content.indexOf('Dividendengutschrift') > 0;
};

export const canParseDocument = (
  /** @type {Importer.page[]} */ pages,
  /** @type {string} */ extension
) => {
  const firstPageContent = pages[0];

  return (
    extension === 'pdf' &&
    firstPageContent.some((/** @type {string | string[]} */ line) =>
      line.includes('S Broker')
    ) &&
    firstPageContent.some(
      (/** @type {string | string[]} */ line) =>
        line.includes('v2.7') || line.includes('v10.7')
    ) &&
    getDocumentType(firstPageContent) !== undefined
  );
};

export const parsePages = (/** @type {Importer.page[]} */ pages) => {
  const flatContent = pages.flat();
  let activities = [];

  switch (getDocumentType(pages[0])) {
    case 'Buy':
      activities.push(parseBuyDocument(flatContent));
      break;

    case 'Dividend':
      activities.push(parseDividendDocument(flatContent));
      break;

    default:
      return {
        activities: undefined,
        status: 5,
      };
  }

  return {
    activities,
    status: 0,
  };
};

export const parsingIsTextBased = () => true;