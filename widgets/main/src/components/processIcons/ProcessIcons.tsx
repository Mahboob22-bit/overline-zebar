import { AnimatePresence, motion } from 'framer-motion';
import { GlazeWmOutput } from 'zebar';
import { getProcessIcon, shouldIgnoreProcess } from '../../utils/processIconMap';
import { ContainerType } from '../windowTitle/WindowTitle';

type ProcessIconsProps = {
  glazewm: GlazeWmOutput | null;
};

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

/**
 * Recursively get all windows from a workspace or container
 */
function getWindows(container: Container | null | undefined): Window[] {
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

export function ProcessIcons({ glazewm }: ProcessIconsProps) {
  if (!glazewm?.displayedWorkspace) return null;

  const windows = getWindows(glazewm.displayedWorkspace as Container);

  // Filter out ignored processes
  const visibleWindows = windows.filter((win) => !shouldIgnoreProcess(win.processName));

  if (visibleWindows.length === 0) return null;

  const springConfig = { type: 'spring', stiffness: 400, damping: 30 };

  return (
    <div className="flex items-center gap-0.5 ml-2">
      <AnimatePresence mode="popLayout">
        {visibleWindows.map((window) => {
          const Icon = getProcessIcon(window.processName, window.title);
          const isFocused = window.hasFocus;

          return (
            <motion.span
              key={window.id}
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -10 }}
              transition={springConfig}
              layout
              className={`flex items-center justify-center transition-colors duration-200 ${
                isFocused ? 'text-primary-text' : 'text-text-muted'
              }`}
              title={`${window.processName}: ${window.title}`}
            >
              <Icon className="w-4 h-4" strokeWidth={isFocused ? 2.5 : 2} />
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default ProcessIcons;

