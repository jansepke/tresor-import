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

const findShares = (/** @type {Importer.page} */ content) => {
  return Big(parseGermanNum(content[5]));
};

const findCompany = (/** @type {Importer.page} */ content) => {
  return content.slice(6, content.indexOf('Handels-/Ausf') - 2).join(' ');
};

const findIsin = (/** @type {Importer.page} */ content) => {
  return content[content.indexOf('Handels-/Ausf') - 2];
};

const findWkn = (/** @type {Importer.page} */ content) => {
  return content[content.indexOf('Handels-/Ausf') - 1].replace(/[{()}]/g, '');
};

const findFee = (/** @type {Importer.page} */ content) => {
  let total = Big(0);

  const orderFeeLineNumber = content.indexOf('Provision');
  if (orderFeeLineNumber >= 0) {
    total = total.add(parseGermanNum(content[orderFeeLineNumber + 1]));
  }

  return +total;
};

const findAmount = (/** @type {Importer.page} */ content) => {
  return Big(parseGermanNum(content[content.indexOf('Kurswert') + 1]));
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
    }
  }

  return createActivityDateTime(
    dateValue,
    timeValue,
    undefined,
    'dd.MM.yyyy HH:mm:ss'
  );
};

const getDocumentType = (/** @type {Importer.page} */ content) => {
  if (isBuy(content)) {
    return 'Buy';
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
    firstPageContent.some((/** @type {string | string[]} */ line) =>
      line.includes('v2.7')
    ) &&
    getDocumentType(firstPageContent) !== undefined
  );
};

export const parsePages = (/** @type {Importer.page[]} */ pages) => {
  let activities = [];

  switch (getDocumentType(pages[0])) {
    case 'Buy':
      activities.push(parseBuyDocument(pages.flat()));
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
