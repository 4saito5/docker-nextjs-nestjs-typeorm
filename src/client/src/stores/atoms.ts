import { atom } from 'recoil';

// AdminUser
export const adminUserState = atom({
  key: 'AdminUser',
  default: {
    adminLoginId: undefined,
    adminUserName: undefined,
    regionCode: undefined,
  }
});
