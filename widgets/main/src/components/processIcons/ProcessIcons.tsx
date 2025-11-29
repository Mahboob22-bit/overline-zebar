import { AnimatePresence, motion } from 'framer-motion';
import { GlazeWmOutput } from 'zebar';
import { getProcessIcon, shouldIgnoreProcess } from '../../utils/processIconMap';
import { ContainerType } from '../windowTitle/WindowTitle';

type Window = {
  id: string;
  type: string;
  title: string;
  processName: string;
  hasFocus: boolean;
  children?: Window[];
};

type Container = {
  type: string;
  children?: Container[];
};

type Workspace = Container & {
  id: string;
  name: string;
  displayName?: string;
  hasFocus: boolean;
};

type ProcessIconsProps = {
  glazewm: GlazeWmOutput | null;
  /** Optional: Show icons for a specific workspace instead of the displayed one */
  workspace?: Workspace;
  /** Whether this workspace is currently focused */
  isFocused?: boolean;
};

/**
 * Recursively get all windows from a workspace or container
 */
export function getWindows(container: Container | null | undefined): Window[] {
  if (!container) return [];

  const windows: Window[] = [];

  for (const child of container.children ?? []) {
    if (child.type === ContainerType.WINDOW) {
      windows.push(child as Window);
    } else if (child.type === ContainerType.SPLIT) {
      windows.push(...getWindows(child as Container));
    }
  }

  return windows;
}

export function ProcessIcons({ glazewm, workspace, isFocused = false }: ProcessIconsProps) {
  // Use provided workspace or fallback to displayed workspace
  const targetWorkspace = workspace ?? (glazewm?.displayedWorkspace as Workspace | undefined);

  if (!targetWorkspace) return null;

  const windows = getWindows(targetWorkspace as Container);

  // Filter out ignored processes
  const visibleWindows = windows.filter((win) => !shouldIgnoreProcess(win.processName));

  if (visibleWindows.length === 0) return null;

  const springConfig = { type: 'spring', stiffness: 400, damping: 30 };

  return (
    <div className="flex items-center gap-0.5">
      <AnimatePresence mode="popLayout">
        {visibleWindows.map((window) => {
          const Icon = getProcessIcon(window.processName, window.title);
          const isWindowFocused = window.hasFocus && isFocused;

          return (
            <motion.span
              key={window.id}
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -10 }}
              transition={springConfig}
              layout
              className={`flex items-center justify-center transition-colors duration-200 ${
                isWindowFocused ? 'text-primary-text' : isFocused ? 'text-text' : 'text-text-muted'
              }`}
              title={`${window.processName}: ${window.title}`}
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={isWindowFocused ? 2.5 : 2} />
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default ProcessIcons;
