import { open } from '@tauri-apps/plugin-shell';
import { FormattedMessage } from 'react-intl';
import {
  IoLogoGithub,
  IoSettingsOutline,
  IoInformationCircleOutline,
  IoAperture,
} from 'react-icons/io5';
import { Link } from 'react-router';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';
import { ModalAbout } from '@/modals/ModalAbout';
import packageJson from '../../package.json';

export function FooterBar() {
  return (
    <footer className="flex min-h-6 w-full justify-between border-t border-neutral-300 bg-white px-2 dark:border-zinc-500 dark:bg-zinc-900 dark:text-white">
      <div className="flex items-center gap-2 antialiased">
        {/* <ModalAbout>
            <button title="About">
              <IoInformationCircleOutline size={18} />
            </button>
          </ModalAbout> */}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/settings">
                <IoSettingsOutline className="motion-safe:hover:animate-spin" />
              </Link>
            </TooltipTrigger>

            <TooltipContent>
              <FormattedMessage id="settings" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* {process.env.NODE_ENV === 'development' && (
          <Link to="/test" title="test">
            <IoAperture className="motion-safe:hover:animate-spin" />
          </Link>
        )} */}
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs font-bold leading-none">
                v{packageJson.version}
              </span>
            </TooltipTrigger>

            <TooltipContent>
              <FormattedMessage id="current.version" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() =>
                  open('https://github.com/Lucas8x/photo-organizer')
                }
              >
                <IoLogoGithub />
              </button>
            </TooltipTrigger>

            <TooltipContent>
              <FormattedMessage id="github.repository" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </footer>
  );
}
