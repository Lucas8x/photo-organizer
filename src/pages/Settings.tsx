import { IoArrowBack } from 'react-icons/io5';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { FooterBar } from '@/components/FooterBar';
import { KeybindInput } from '@/components/KeybindInput';
import { SettingItem } from '@/components/SettingItem';
import { CONFLICT_HANDLE_OPTIONS, THEMES } from '@/constants';
import { LANGUAGES } from '@/locales';
import { ModalConfirmation } from '@/modals/ModalConfirmation';
import { type AppAction, useAppControls, useSettings } from '@/store';
import { Button } from '@/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { Switch } from '@/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';

export function Settings() {
  const intl = useIntl();

  const theme = useSettings((s) => s.theme);
  const changeTheme = useSettings((s) => s.changeTheme);

  const language = useSettings((s) => s.language);
  const changeLanguage = useSettings((s) => s.changeLanguage);

  /* const conflictHandling = useSettings((s) => s.conflictHandling);
  const changeConflictHandling = useSettings((s) => s.changeConflictHandling); */

  const hideImageName = useSettings((s) => s.hideImageName);
  const toggleHideImageName = useSettings((s) => s.toggleHideImageName);

  const hideImageCount = useSettings((s) => s.hideImageCount);
  const toggleHideImageCount = useSettings((s) => s.toggleHideImageCount);

  const hideHeaderQuickSettings = useSettings((s) => s.hideHeaderQuickSettings);
  const toggleHideHeaderQuickSettings = useSettings(
    (s) => s.toggleHideHeaderQuickSettings
  );

  const isMovingFiles = useSettings((s) => s.isMovingFiles);
  const toggleIsMovingFiles = useSettings((s) => s.toggleIsMovingFiles);

  const nextImgAfterCopy = useSettings((s) => s.nextImgAfterCopy);
  const toggleNextImgAfterCopy = useSettings((s) => s.toggleNextImgAfterCopy);

  const showingFolderPreviews = useSettings((s) => s.showingFolderPreviews);
  const toggleShowingFolderPreviews = useSettings(
    (s) => s.toggleShowingFolderPreviews
  );

  const resetSettings = useSettings((s) => s.resetSettings);

  const appKeybinds = useAppControls((s) => s.actionsToKeybinds);
  const setAppKeybind = useAppControls((s) => s.setKeybind);
  const restoreAppKeybind = useAppControls((s) => s.restoreKeybind);

  function handleChangeAppKeybind(action: AppAction, keys: string) {
    if (setAppKeybind(action, keys)) {
      toast.success(
        intl.formatMessage({
          id: 'store.keybinds.edit.success',
        }),
        { autoClose: 1500 }
      );
    }
  }

  function handleResetAppKeybind(action: AppAction) {
    if (restoreAppKeybind(action)) {
      toast.success(
        intl.formatMessage({
          id: 'store.keybinds.edit.success',
        }),
        { autoClose: 1500 }
      );
    }
  }

  return (
    <div className='flex h-full w-full max-w-full flex-col dark:text-white'>
      <div className='flex h-full w-full flex-col gap-4 overflow-y-auto bg-white p-4 dark:bg-zinc-900'>
        <nav className='flex items-center gap-2 text-xl'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to='/'>
                  <IoArrowBack />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <FormattedMessage id='back' />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <h1 className='font-bold'>
            <FormattedMessage id='settings' />
          </h1>
        </nav>

        <div className='flex flex-col gap-4'>
          <SettingItem.Root>
            <div>
              <SettingItem.Title>
                <FormattedMessage id='theme' />
              </SettingItem.Title>

              <SettingItem.Description>
                <FormattedMessage id='theme.description' />
              </SettingItem.Description>
            </div>

            <Select onValueChange={changeTheme} value={theme}>
              <SelectTrigger className='w-44'>
                <SelectValue placeholder='Select a theme' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    <FormattedMessage id='theme' />
                  </SelectLabel>
                  {THEMES.map((themeItem) => (
                    <SelectItem
                      className='cursor-pointer'
                      key={themeItem}
                      value={themeItem}
                    >
                      <FormattedMessage id={`theme.${themeItem}`} />
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SettingItem.Root>

          <SettingItem.Root>
            <div>
              <SettingItem.Title>
                <FormattedMessage id='language' />
              </SettingItem.Title>
              <SettingItem.Description>
                <FormattedMessage id='language.description' />
              </SettingItem.Description>
            </div>

            <Select onValueChange={changeLanguage} value={language}>
              <SelectTrigger className='w-44'>
                <SelectValue placeholder='Select a language' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    <FormattedMessage id='language' />
                  </SelectLabel>
                  {LANGUAGES.map((langItem) => (
                    <SelectItem
                      className='cursor-pointer'
                      key={langItem.id}
                      value={langItem.id}
                    >
                      {langItem.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SettingItem.Root>

          {/* <SettingItem>
            <div>
              <SettingItem.Title>
                <FormattedMessage id="conflictHandling" />
              </SettingItem.Title>
              <SettingItem.Description>
                <FormattedMessage id="conflictHandling.description" />
              </SettingItem.Description>
            </div>

            <Select
              defaultValue={conflictHandling}
              onValueChange={changeConflictHandling}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Select a conflict handling" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    <FormattedMessage id="conflictLabel" />
                  </SelectLabel>
                  {Object.values(CONFLICT_HANDLE_OPTIONS).map((id) => (
                    <SelectItem
                      key={id}
                      value={id}
                      className="cursor-pointer"
                    >
                      <FormattedMessage id={id} />
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SettingItem> */}

          <SettingItem.Root>
            <div>
              <SettingItem.Title>
                <FormattedMessage id='image.name.hide' />
              </SettingItem.Title>
              <SettingItem.Description>
                <FormattedMessage id='image.name.hide.description' />
              </SettingItem.Description>
            </div>

            <Switch
              checked={hideImageName}
              onCheckedChange={toggleHideImageName}
            />
          </SettingItem.Root>

          <SettingItem.Root>
            <div>
              <SettingItem.Title>
                <FormattedMessage id='image.count.hide' />
              </SettingItem.Title>
              <SettingItem.Description>
                <FormattedMessage id='image.count.hide.description' />
              </SettingItem.Description>
            </div>

            <Switch
              checked={hideImageCount}
              onCheckedChange={toggleHideImageCount}
            />
          </SettingItem.Root>

          <SettingItem.Root>
            <div>
              <SettingItem.Title>
                <FormattedMessage id='quickSettings.header.hide' />
              </SettingItem.Title>
              <SettingItem.Description>
                <FormattedMessage id='quickSettings.header.hide.description' />
              </SettingItem.Description>
            </div>

            <Switch
              checked={hideHeaderQuickSettings}
              onCheckedChange={toggleHideHeaderQuickSettings}
            />
          </SettingItem.Root>

          <SettingItem.Root>
            <div>
              <SettingItem.Title>
                <FormattedMessage id='quickSettings.copy_move' />
              </SettingItem.Title>
              <SettingItem.Description>
                <FormattedMessage id='quickSettings.copy_move.description' />
              </SettingItem.Description>
            </div>

            <Switch
              checked={isMovingFiles}
              onCheckedChange={toggleIsMovingFiles}
            />
          </SettingItem.Root>

          <SettingItem.Root>
            <div>
              <SettingItem.Title>
                <FormattedMessage id='quickSettings.next_img' />
              </SettingItem.Title>
              <SettingItem.Description>
                <FormattedMessage id='quickSettings.next_img.description' />
              </SettingItem.Description>
            </div>

            <Switch
              checked={nextImgAfterCopy}
              onCheckedChange={toggleNextImgAfterCopy}
            />
          </SettingItem.Root>

          <SettingItem.Root>
            <div>
              <SettingItem.Title>
                <FormattedMessage id='quickSettings.folder_preview' />
              </SettingItem.Title>
              <SettingItem.Description>
                <FormattedMessage id='quickSettings.folder_preview.description' />
              </SettingItem.Description>
            </div>

            <Switch
              checked={showingFolderPreviews}
              onCheckedChange={toggleShowingFolderPreviews}
            />
          </SettingItem.Root>

          <h2 className='border-b pb-1 font-semibold'>App keybinds</h2>

          <SettingItem.Root>
            <div>
              <SettingItem.Title>
                <FormattedMessage id='left.keybind' />
              </SettingItem.Title>

              <SettingItem.Description>
                <FormattedMessage id='left.keybind.description' />
              </SettingItem.Description>
            </div>

            <KeybindInput
              onChange={(keys) =>
                handleChangeAppKeybind('previous.image', keys)
              }
              onReset={() => handleResetAppKeybind('previous.image')}
              value={appKeybinds['previous.image']}
            />
          </SettingItem.Root>

          <SettingItem.Root>
            <div>
              <SettingItem.Title>
                <FormattedMessage id='right.keybind' />
              </SettingItem.Title>

              <SettingItem.Description>
                <FormattedMessage id='right.keybind.description' />
              </SettingItem.Description>
            </div>

            <KeybindInput
              onChange={(keys) => handleChangeAppKeybind('next.image', keys)}
              onReset={() => handleResetAppKeybind('next.image')}
              value={appKeybinds['next.image']}
            />
          </SettingItem.Root>

          <SettingItem.Root>
            <div>
              <SettingItem.Title>
                <FormattedMessage id='undo.keybind' />
              </SettingItem.Title>

              <SettingItem.Description>
                <FormattedMessage id='undo.keybind.description' />
              </SettingItem.Description>
            </div>

            <KeybindInput
              onChange={(keys) => handleChangeAppKeybind('undo', keys)}
              onReset={() => handleResetAppKeybind('undo')}
              value={appKeybinds.undo}
            />
          </SettingItem.Root>
        </div>

        <ModalConfirmation
          confirmButtonProps={{
            variant: 'destructive',
          }}
          descriptionID='modal.settings.reset.description'
          onConfirm={resetSettings}
          titleID='modal.settings.reset.title'
        >
          <Button className='w-fit' variant='destructive'>
            <FormattedMessage id='settings.reset.btn' />
          </Button>
        </ModalConfirmation>
      </div>

      <FooterBar />
    </div>
  );
}
