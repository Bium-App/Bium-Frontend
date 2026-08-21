const errorCodes = {
  OPERATION_CANCELED: 'OPERATION_CANCELED',
  IN_PROGRESS: 'ASYNC_OP_IN_PROGRESS',
  UNABLE_TO_OPEN_FILE_TYPE: 'UNABLE_TO_OPEN_FILE_TYPE',
  NULL_PRESENTER: 'NULL_PRESENTER',
};

module.exports = {
  errorCodes,
  types: { allFiles: '*/*' },
  keepLocalCopy: jest.fn().mockImplementation(({ files }) =>
    Promise.resolve([
      {
        status: 'success',
        sourceUri: files[0].uri,
        localUri: `file://cache/${files[0].fileName}`,
      },
    ]),
  ),
  pick: jest.fn().mockRejectedValue(
    Object.assign(new Error('cancelled'), {
      code: errorCodes.OPERATION_CANCELED,
    }),
  ),
  isErrorWithCode: error => Boolean(error?.code),
};
