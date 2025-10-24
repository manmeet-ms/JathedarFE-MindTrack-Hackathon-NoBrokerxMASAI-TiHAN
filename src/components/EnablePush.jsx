import { useEffect } from 'react';

const VAPID_PUBLIC_KEY = 'YOUR_PUBLIC_VAPID_KEY';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

export const EnablePush = () => {
  const subscribe = async () => {
    const reg = await navigator.serviceWorker.ready;

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    await fetch(`${process.env.VITE_BACKEND_URL}/subscribe`, {
      method: 'POST',
      body: JSON.stringify(sub),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    alert('Push notifications enabled!');
  };

  return (
    <button onClick={subscribe}>
      Enable Push Notifications
    </button>
  );
};
