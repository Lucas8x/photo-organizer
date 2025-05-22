import { FormattedMessage } from 'react-intl';
import { Switch } from '@/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';

type Props = React.ComponentProps<typeof Switch> & {
  textID: string;
  tooltipID?: string;
};

export function SwitchLabeled({ textID, tooltipID, ...rest }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center gap-1">
            <span className="text-center text-sm font-bold dark:text-white">
              <FormattedMessage id={textID} />
            </span>

            <Switch {...rest} />
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <FormattedMessage id={tooltipID} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
