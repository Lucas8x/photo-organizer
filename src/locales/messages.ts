import { LOCALES } from '.';

export const messages = {
  [LOCALES.ENGLISH]: {
    theme: 'Theme',
    'theme.description': 'Change the theme of the app.',
    'theme.system': 'System',
    'theme.light': 'Light',
    'theme.dark': 'Dark',

    language: 'Language',
    'language.description': 'Change the language of the app.',

    'header.title': 'Paste or select folder path',
    'header.expand': 'Expand Header',
    'header.collapse': 'Collapse Header',

    'folder.input.placeholder': 'Enter folder path',
    'folder.input.folder.dialog': 'Open system folder selection dialog.',
    'folder.input.refresh': 'Refresh current folder',

    'quickSettings.header.hide': 'Hide header quick switches',
    'quickSettings.header.hide.description':
      'Hide quick settings switches in header.',
    'quickSettings.copy_move': 'Copy or Move images',
    'quickSettings.copy_move.description':
      'Switch between copy or move images on press keybind.',
    'quickSettings.next_img': 'Next image after copy',
    'quickSettings.next_img.description':
      'Go to next image after press keybind.',
    'quickSettings.folder_preview': 'Folder preview',
    'quickSettings.folder_preview.description':
      'Toggle folder preview display.',

    'show.in.file.explorer': 'Click here to show this image in file explorer.',
    'no.images.found': 'No images found',
    'no.folder.selected': 'No folder selected',

    'image.count.tooltip':
      'Image count. Click to directly change image number.',

    'image.name.hide': 'Hide image name',
    'image.name.hide.description':
      'Hide the image name on the top of the image',
    'image.count.hide': 'Hide image count',
    'image.count.hide.description':
      'Hide the images count on the bottom of the image',

    'controls.previous': 'Previous Image',
    'controls.next': 'Next Image',

    keybind: 'Keybind',
    'keybind.title': 'Click to open keybind actions',
    'keybind.add': 'Create keybind',
    'keybind.not.defined': 'Please register keybinds',

    'dropdown.open.folder': 'Open Folder',
    'dropdown.edit.keypath': 'Edit key or path',
    'dropdown.delete.keybind': 'Delete keybind',

    'modal.create.keybind.title': 'Configure Keybind',
    'modal.create.keybind.description':
      'Set a keyboard shortcut and folder path for quick copy/move.',
    'modal.create.input.keybind.label': 'Keybind',
    'modal.create.input.path.label': 'Folder Path',
    'modal.create.keybind.placeholder': 'Please press any key',
    'modal.create.keybind.pressed': 'You pressed:',
    'modal.create.keybind.output': 'Please enter destination folder path:',

    'modal.create.keybind.reserved':
      'This keybind is reserved. Please choose another one.',

    'modal.delete.keybind.title': 'Delete keybind',
    'modal.delete.keybind.description':
      'Are you sure you want to delete this keybind? This action cannot be undone.',

    'modal.settings.reset.title': 'Reset settings',
    'modal.settings.reset.description':
      'Are you sure you want to reset settings? This action cannot be undone.',

    'modal.confirm': 'Confirm',
    'modal.close': 'Close',

    'modal.terms.agree.btn': 'Agree',

    'store.keybinds.create.exist.error': 'This keybind already exist.',
    'store.keybinds.create.success': 'Keybind registered.',
    'store.keybinds.edit.old.error': 'Previous Keybind not found.',
    'store.keybinds.edit.success': 'Keybind successfully updated.',

    'updater.checking': 'Checking for updates...',
    'updater.downloading': 'An update is available. Downloading...',
    'updater.installed': 'Update installed. Reloading...',
    'updater.error': "Couldn't check for updates.",

    conflictLabel: 'Action',
    conflictHandling: 'Conflict handling',
    'conflictHandling.description':
      'How to handle conflicts between images names',
    'conflict.block': 'Block action',
    'conflict.rename': 'Rename file',

    settings: 'Settings',
    'settings.reset.btn': 'Reset settings',

    back: 'Back',

    'toast.copied': 'Copied',
    'toast.moved': 'Moved',
    'toast.error': 'Unable to {action} this image.',
    'toast.action.move': 'move',
    'toast.action.copy': 'copy',

    'current.version': 'Current version',
    'github.repository': 'GitHub repository',

    'joyride.back': 'Back',
    'joyride.skip': 'Skip',
    'joyride.next': 'Next',
    'joyride.finish': 'Finish',
    'joyride.welcome': 'Welcome',
    'joyride.select': 'First select a image folder.',
    'joyride.image': 'Images will show here.',
    'joyride.controls': 'Control images with Left & Right keys.',
    'joyride.register': 'Register your folders keybind here.',
    'joyride.press': 'Press the keybind to send the image to that folder.',
  },

  [LOCALES.PORTUGUESE]: {
    theme: 'Tema',
    'theme.description': 'Mude o tema da aplicação.',
    'theme.system': 'Sistema',
    'theme.light': 'Claro',
    'theme.dark': 'Escuro',

    language: 'Idioma',
    'language.description': 'Mude o idioma da aplicação.',

    'header.title': 'Cole ou selecione o caminho da pasta',
    'header.expand': 'Mostrar cabeçalho',
    'header.collapse': 'Esconder cabeçalho',

    'folder.input.placeholder': 'Digite o caminho da pasta',
    'folder.input.folder.dialog':
      'Abrir diálogo de seleção de pasta do sistema.',
    'folder.input.refresh': 'Atualizar pasta atual',

    'quickSettings.header.hide': 'Esconder botões do cabeçalho.',
    'quickSettings.header.hide.description':
      'Esconde os botões de configurações rápidas do cabeçalho.',
    'quickSettings.copy_move': 'Copiar ou Mover',
    'quickSettings.copy_move.description':
      'Mudar entre copiar ou mover imagens ao pressionar a tecla de atalho.',
    'quickSettings.next_img': 'Pular após copiar.',
    'quickSettings.next_img.description':
      'Ir para a próxima imagem depois de pressionar a tecla da pasta.',
    'quickSettings.folder_preview': 'Miniatura da pasta',
    'quickSettings.folder_preview.description':
      'Alterna visualização da miniatura das pastas.',

    'show.in.file.explorer':
      'Clique aqui para mostrar esta imagem no explorador de arquivos.',
    'no.images.found': 'Nenhuma imagem encontrada',
    'no.folder.selected': 'Nenhuma pasta selecionada',

    'image.count.tooltip': 'Contagem de imagens. Clique para editar o número.',

    'image.name.hide': 'Esconder nome da imagem',
    'image.name.hide.description': 'Esconde o nome da imagem no topo da imagem',
    'image.count.hide': 'Esconder contagem de imagens',
    'image.count.hide.description':
      'Esconde a contagem de imagens no abaixo da imagem',

    'controls.previous': 'Imagem Anterior',
    'controls.next': 'Proxima Imagem',

    keybind: 'Atalho',
    'keybind.title': 'Clique para abrir as ações do atalho',
    'keybind.add': 'Criar atalho',
    'keybind.not.defined': 'Por favor crie os atalhos',

    'dropdown.open.folder': 'Abrir pasta',
    'dropdown.edit.keypath': 'Editar tecla ou caminho',
    'dropdown.delete.keybind': 'Excluir atalho',

    'modal.create.keybind.title': 'Configurar atalho',
    'modal.create.keybind.description':
      'Defina um atalho de teclado e o caminho da pasta para copiar/mover rapidamente.',
    'modal.create.input.keybind.label': 'Atalho',
    'modal.create.input.path.label': 'Caminho',
    'modal.create.keybind.placeholder': 'Pressione qualquer tecla',
    'modal.create.keybind.pressed': 'Voce pressionou:',
    'modal.create.keybind.output': 'Por favor digite o caminho de destino:',

    'modal.create.keybind.reserved':
      'Atalho reservado. Por favor escolha outra.',

    'modal.delete.keybind.title': ' Excluir atalho',
    'modal.delete.keybind.description':
      'Tem certeza de que deseja excluir este atalho? Esta ação nao pode ser desfeita.',

    'modal.settings.reset.title': 'Redefinir configurações',
    'modal.settings.reset.description':
      'Tem certeza de que deseja redefinir as configurações? Esta ação nao pode ser desfeita.',

    'modal.confirm': 'Confirmar',
    'modal.close': 'Fechar',

    'modal.terms.agree.btn': 'Concordo',

    'store.keybinds.create.exist.error': 'Este atalho ja existe.',
    'store.keybinds.create.success': 'Atalho criado.',
    'store.keybinds.edit.old.error': 'Atalho antigo não encontrado.',
    'store.keybinds.edit.success': 'Atalho atualizado com sucesso.',

    'updater.checking': 'Verificando atualização...',
    'updater.downloading': 'Atualização disponível. Baixando...',
    'updater.installed': 'Atualização instalada. Recarregando...',
    'updater.error': 'Não foi possível verificar atualização.',

    conflictLabel: 'Ação',
    conflictHandling: 'Resolução de conflitos',
    'conflictHandling.description':
      'Como lidar com conflitos entre nomes de imagens',
    'conflict.block': 'Bloquear ação',
    'conflict.rename': 'Renomear arquivo',

    settings: 'Configurações',
    'settings.reset.btn': 'Redefinir configurações',

    'toast.copied': 'Copiado',
    'toast.moved': 'Movido',
    'toast.error': 'Nao foi possível {action} esta imagem.',
    'toast.action.move': 'mover',
    'toast.action.copy': 'copiar',

    back: 'Voltar',

    'current.version': 'Versão atual',
    'github.repository': 'Repositório do GitHub',

    'joyride.back': 'Voltar',
    'joyride.skip': 'Pular',
    'joyride.next': 'Proximo',
    'joyride.last': 'Concluir',
    'joyride.welcome': 'Bem-Vindo',
    'joyride.select': 'Selecione uma pasta para começar.',
    'joyride.image': 'As imagens serão exibidas aqui.',
    'joyride.controls':
      'Controle as imagens com as teclas de seta esquerda e direita.',
    'joyride.register': 'Crie aqui seus atalhos para outras pastas.',
    'joyride.press': 'Pressione o atalho para copiar ou mover rapidamente.',
  },
} as const;
