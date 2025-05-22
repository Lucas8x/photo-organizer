import { FormattedMessage } from 'react-intl';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/ui/dialog';
import { Button } from '@/ui/button';

type ModalAboutProps = {
  children: React.ReactNode;
};

export function ModalAbout({ children }: ModalAboutProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[95vh]">
        <DialogHeader>
          <DialogTitle>Photo Organizer</DialogTitle>
        </DialogHeader>

        <div className="flex max-h-40 flex-col space-y-4 overflow-y-auto">
          <Item title={'Title'} text={''} />
          <Item title={'Title'} text={''} />
          <Item title={'Title'} text={''} />
          <Item title={'Title'} text={''} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <FormattedMessage id="modal.terms.agree.btn" />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type ItemsProps = {
  title: string;
  text: string;
};

function Item({ title, text }: ItemsProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-neutral-600 dark:text-white">{title}</h3>
      <p className="text-justify text-neutral-500 dark:text-neutral-300">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  );
}
