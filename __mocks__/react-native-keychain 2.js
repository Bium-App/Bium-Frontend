module.exports = {
  ACCESSIBLE: {
    AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY:
      'MOCK_AccessibleAfterFirstUnlockThisDeviceOnly',
  },
  SECURITY_LEVEL: {
    SECURE_SOFTWARE: 'MOCK_SECURITY_LEVEL_SECURE_SOFTWARE',
  },
  setGenericPassword: jest.fn().mockResolvedValue({
    service: 'com.blazememo.auth.refresh-token',
    storage: 'MOCK_SECURE_STORAGE',
  }),
  getGenericPassword: jest.fn().mockResolvedValue(false),
  resetGenericPassword: jest.fn().mockResolvedValue(true),
};
