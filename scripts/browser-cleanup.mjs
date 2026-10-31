/**
 * scripts/browser-cleanup.mjs
 *
 * Shared by smoke-test.mjs and a11y-audit.mjs. Each run starts a headless
 * Edge/Chrome with a throwaway profile in the temp folder (about 0.5 GB of
 * cache). Killing only the spawned process left the real browser (Edge
 * relaunches itself under a new pid) running and the profile on disk, so
 * every run used to leak both.
 *
 *   cleanupOnExit(proc, prof)   call right after spawning the browser
 *
 * On any exit (normal end, process.exit, a crash, Ctrl+C) it ends the whole
 * process tree and deletes the profile folder.
 */

import { spawnSync } from 'node:child_process';
import { rmSync } from 'node:fs';

export const cleanupOnExit = (proc, prof) => {
  let done = false;
  const cleanup = () => {
    if (done) return;
    done = true;
    if (process.platform === 'win32') {
      // msedge.exe relaunches itself, so the real browser has a different pid
      // from `proc`: end every process that was started with this profile
      const match = prof.replace(/'/g, "''");
      spawnSync('powershell', ['-NoProfile', '-Command',
        `Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*${match}*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }`,
      ], { stdio: 'ignore' });
    } else {
      proc.kill('SIGKILL');
    }
    // files can stay locked for a moment after the browser exits
    try {
      rmSync(prof, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
    } catch {
      console.warn(`Could not delete the browser profile: ${prof}`);
    }
  };
  process.on('exit', cleanup);
  // Ctrl+C and kill skip the 'exit' event unless they end the process through it
  for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => process.exit(130));
};
