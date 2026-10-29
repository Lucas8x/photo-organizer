import { FormattedMessage } from 'react-intl';
import { Button } from '@/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';

type ModalAboutProps = {
  children: React.ReactNode;
};

export function ModalAbout({ children }: ModalAboutProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='max-h-[95vh]'>
        <DialogHeader>
          <DialogTitle>Photo Organizer</DialogTitle>
        </DialogHeader>

        <div className='flex max-h-40 flex-col space-y-4 overflow-y-auto'>
          <Item text={'content1'} title={'Title1'} />
          <Item text={'content2'} title={'Title2'} />
          <Item text={'content3'} title={'Title3'} />
          <Item text={'content4'} title={'Title4'} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <FormattedMessage id='modal.terms.agree.btn' />
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
    <div className='flex flex-col gap-2'>
      <h3 className='font-bold text-neutral-600 dark:text-white'>{title}</h3>

      <p className='text-justify text-neutral-500 dark:text-neutral-300'>
        {text}
      </p>
    </div>
  );
}
