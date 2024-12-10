import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export function useUpdater() {
  async function verifyUpdate() {
    const toastID = toast.loading('Checking for updates...', {
      position: 'bottom-right',
    });

    try {
      const update = await check();

      if (!update?.available) {
        toast.dismiss(toastID);
        return;
      }

      toast.update(toastID, {
        render: 'An update is available. Downloading...',
      });

      // Install the update. This will also restart the app on Windows!
      await relaunch();

      toast.update(toastID, {
        render: 'Update installed. Reloading...',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        onClose: relaunch,
      });
    } catch (error) {
      toast.update(toastID, {
        render: "Couldn't check for updates.",
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      console.error(error);
    }
  }

  useEffect(() => {
    verifyUpdate();
  }, []);
}
