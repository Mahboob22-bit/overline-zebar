import {
  AppWindow,
  Chrome,
  Code,
  FileSpreadsheet,
  FileText,
  Folder,
  Gamepad2,
  Headphones,
  Image,
  Mail,
  MessageCircle,
  Music,
  NotebookPen,
  Palette,
  Presentation,
  Settings,
  Shield,
  Terminal,
  Video,
  type LucideIcon,
} from 'lucide-react';

type IconMapEntry = {
  appNames: string[];
  icon: LucideIcon;
};

/**
 * Maps process names to their corresponding icons.
 * Process names are matched case-insensitively.
 */
export const processIconMap: IconMapEntry[] = [
  // Terminals
  {
    appNames: [
      'alacritty',
      'wezterm',
      'wezterm-gui',
      'windowsterminal',
      'wt',
      'cmd',
      'powershell',
      'pwsh',
      'hyper',
      'kitty',
      'conemu',
      'conemu64',
    ],
    icon: Terminal,
  },

  // Code Editors & IDEs
  {
    appNames: [
      'code',
      'code-insiders',
      'cursor',
      'windsurf',
      'vscodium',
      'sublime_text',
      'notepad++',
      'atom',
    ],
    icon: Code,
  },
  {
    appNames: [
      'devenv', // Visual Studio
      'clion64',
      'idea64',
      'pycharm64',
      'webstorm64',
      'goland64',
      'rider64',
      'rustrover64',
      'phpstorm64',
      'datagrip64',
    ],
    icon: Code,
  },

  // Browsers
  {
    appNames: [
      'chrome',
      'chromium',
      'thorium',
      'brave',
      'vivaldi',
      'opera',
      'msedge',
      'firefox',
      'zen',
      'arc',
      'waterfox',
      'librewolf',
    ],
    icon: Chrome,
  },

  // Communication
  {
    appNames: ['discord', 'slack', 'element', 'signal', 'rocketchat'],
    icon: MessageCircle,
  },
  {
    appNames: ['telegram', 'unigram', 'wechat', 'qq', 'whatsapp'],
    icon: MessageCircle,
  },
  {
    appNames: ['ms-teams', 'teams', 'zoom', 'webex'],
    icon: Video,
  },
  {
    appNames: ['airmail', 'olk', 'outlook', 'thunderbird', 'mailspring'],
    icon: Mail,
  },

  // Media & Music
  {
    appNames: ['spotify', 'media player', 'applemusic', 'cider', 'foobar2000', 'musicbee', 'aimp'],
    icon: Music,
  },
  {
    appNames: ['vlc', 'mpv', 'mpc-hc', 'potplayer', 'kmplayer'],
    icon: Video,
  },
  { appNames: ['sound', 'easyeffects', 'voicemeeter'], icon: Headphones },

  // File Management
  {
    appNames: ['explorer', 'dopus', 'fpilot', 'totalcmd', 'totalcmd64', 'files', 'onecommander'],
    icon: Folder,
  },

  // Office & Documents
  { appNames: ['excel', 'libreoffice calc', 'wps spreadsheets'], icon: FileSpreadsheet },
  { appNames: ['winword', 'libreoffice writer', 'wps writer'], icon: FileText },
  { appNames: ['powerpnt', 'libreoffice impress', 'wps presentation'], icon: Presentation },
  {
    appNames: ['onenote', 'obsidian', 'notion', 'zotero', 'logseq', 'typora', 'joplin'],
    icon: NotebookPen,
  },

  // Graphics & Design
  {
    appNames: [
      'mspaint',
      'photoshop',
      'gimp',
      'figma',
      'illustrator',
      'inkscape',
      'krita',
      'affinity designer',
      'affinity photo',
    ],
    icon: Palette,
  },
  { appNames: ['photos', 'irfanview', 'imageglass', 'xnview'], icon: Image },

  // System & Settings
  {
    appNames: ['control panel', 'settings', 'fancontrol', 'systemsettings', 'mmc'],
    icon: Settings,
  },

  // Security & VPN
  {
    appNames: [
      'azure vpn client',
      'protonvpn',
      'nordvpn',
      'expressvpn',
      'clash-verge',
      'bitwarden',
      '1password',
      'keepassxc',
    ],
    icon: Shield,
  },

  // Gaming
  {
    appNames: ['steam', 'epicgameslauncher', 'gog galaxy', 'battle.net', 'origin', 'uplay'],
    icon: Gamepad2,
  },
];

/**
 * Get the icon for a given process name.
 * Returns AppWindow as fallback if no match is found.
 */
export function getProcessIcon(processName: string, title?: string): LucideIcon {
  const possibleNames = [processName.toLowerCase(), title?.toLowerCase() ?? ''];

  const entry = processIconMap.find((entry) =>
    entry.appNames.some((name) => possibleNames.some((possible) => possible.includes(name)))
  );

  return entry?.icon ?? AppWindow;
}

/**
 * List of process names to ignore (system processes, etc.)
 */
export const ignoredProcesses = [
  'applicationframehost',
  'shellexperiencehost',
  'searchhost',
  'startmenuexperiencehost',
  'textinputhost',
  'lockapp',
  'zebar',
];

/**
 * Check if a process should be ignored
 */
export function shouldIgnoreProcess(processName: string): boolean {
  return ignoredProcesses.some((ignored) => processName.toLowerCase().includes(ignored));
}

