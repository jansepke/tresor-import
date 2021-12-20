const getDocumentType = (/** @type {Importer.page} */ content) => {
  if (isBuy(content)) {
    return 'Buy';
  }
};

const isBuy = (/** @type {Importer.page} */ content) => {
  return false;
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
  return {
    activities: undefined,
    status: 5,
  };
};

export const parsingIsTextBased = () => true;
