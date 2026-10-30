import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

export function useUpdater() {
  const intl = useIntl();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <ok>
  useEffect(() => {
    async function checkUpdate() {
      const toastID = toast(intl.formatMessage({ id: 'updater.checking' }), {
        position: 'bottom-right',
        isLoading: true,
        autoClose: false,
      });

      try {
        const update = await check();

        if (update === null) {
          toast.dismiss(toastID);
          return;
        }

        let downloaded = 0;
        let totalContentLength: number | undefined = 0;

        await update.downloadAndInstall((event) => {
          switch (event.event) {
            case 'Started': {
              totalContentLength = event.data.contentLength;
              console.log(
                `started downloading ${event.data.contentLength} bytes`
              );
              break;
            }
            case 'Progress': {
              downloaded += event.data.chunkLength;

              const percentage = totalContentLength
                ? Math.min(
                    100,
                    Math.round((downloaded / totalContentLength) * 100)
                  )
                : undefined;

              toast.update(toastID, {
                isLoading: false,
                render: intl.formatMessage(
                  { id: 'updater.downloading' },
                  {
                    progress:
                      percentage === undefined
                        ? `${downloaded} bytes`
                        : `${percentage}%`,
                  }
                ),
                progress: percentage === undefined ? null : percentage / 100,
                hideProgressBar: false,
              });
              break;
            }
            default:
              break;
          }
        });

        toast.update(toastID, {
          render: intl.formatMessage({ id: 'updater.installed' }),
          type: 'success',
          isLoading: false,
          autoClose: 2500,
          onClose: () => relaunch(),
        });

        await new Promise((r) => setTimeout(r, 2500));
        toast.dismiss(toastID);
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

    if (process.env.NODE_ENV === 'production') {
      checkUpdate();
    }
  }, []);
}
