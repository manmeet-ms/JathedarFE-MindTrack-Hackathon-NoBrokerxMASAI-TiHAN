import api from './api.js'; // your Axios config

export const subscribeToPushSrv = (subscription) =>
  api.post('/notifications/subscribe', subscription);

export const sendTestNotification = (payload) =>
  api.post('/notifications/trigger', payload);
