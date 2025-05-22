import { FormattedMessage } from 'react-intl';
import { Button, type ButtonProps } from '@/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';

type Props = {
  titleID: string;
  descriptionID: string;
  onConfirm: () => void;
  children?: React.ReactNode; // leave null when using dropdown menu
  confirmButtonProps?: ButtonProps;
};

export function ModalConfirmation(props: Props) {
  const Content = (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <FormattedMessage id={props.titleID} />
        </DialogTitle>

        <DialogDescription>
          <FormattedMessage id={props.descriptionID} />
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            <FormattedMessage id="modal.close" />
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button
            type="submit"
            onClick={props.onConfirm}
            {...props.confirmButtonProps}
          >
            <FormattedMessage id="modal.confirm" />
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );

  if (!props.children) {
    return Content;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      {Content}
    </Dialog>
  );
}
