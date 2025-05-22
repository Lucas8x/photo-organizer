import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

export function useUpdater() {
  const intl = useIntl();

  async function checkUpdate() {
    const toastID = toast.loading(
      intl.formatMessage({ id: 'updater.checking' }),
      {
        position: 'bottom-right',
      },
    );

    try {
      const update = await check();

      if (!update?.available) {
        toast.dismiss(toastID);
        return;
      }

      toast.update(toastID, {
        render: intl.formatMessage({ id: 'updater.downloading' }),
      });

      // Install the update. This will also restart the app on Windows!
      await relaunch();

      toast.update(toastID, {
        render: intl.formatMessage({ id: 'updater.installed' }),
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        onClose: relaunch,
      });
    } catch (error) {
      toast.update(toastID, {
        render: intl.formatMessage({ id: 'updater.error' }),
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });

      console.error(error);
    }
  }

  useEffect(() => {
    checkUpdate();
  }, []);
}
