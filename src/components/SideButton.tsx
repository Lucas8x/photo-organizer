import { FormattedMessage } from 'react-intl';
import { Button } from '@/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';

type Props = {
  children: React.ReactNode;
  tooltipID: string;
  onClick: () => void;
  disabled?: boolean;
};

export function SideButton(p: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className='h-full p-2 focus-visible:ring-0 dark:text-white dark:hover:bg-neutral-400/10'
            onClick={p.onClick}
            variant='ghost'
          >
            {p.children}
          </Button>
        </TooltipTrigger>

        <TooltipContent side='left'>
          <FormattedMessage id={p.tooltipID} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
