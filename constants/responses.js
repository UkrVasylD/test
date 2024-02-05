module.exports = {
  REGISTRATION_SUCCESS: 'User was registered successfully',
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PAGE_NOT_FOUND: 'Page Not Found',
  INVITE_USER: 'User invited successfully',
  RESSET_PASSWORD: 'Resset password successfully',
  SUCCESS(message) {
    return `Success: ${message}`;
  },
};
