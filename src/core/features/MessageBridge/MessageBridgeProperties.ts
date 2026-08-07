export const MessageBridgeProperties = {

  // --- Origin & Security ---
  // the only origin postMessage will accept messages from
  allowedOrigin: 'app://obsidian.md',

  // --- Timeouts ---
  // how long to wait for a response before treating message as failed
  messageTimeoutMs: 5000,

  // --- View Identifiers ---
  // matches the view field on the BridgeMessage envelope
  views: [
    'left-leaf',
    'right-sidebar',
    'dialog',
    'settings'
  ],

  // --- Repository / Logging ---
  // max number of messages to keep in the log
  maxLogSize: 500,

  // log levels available to the repository
  logLevels: [
    'DEBUG',
    'INFO',
    'WARN',
    'ERROR' 
  ],

  // --- Channel ---
  // target window messages are posted to
  targetWindow: 'parent', // 'parent' | 'self' resolved at runtime in config
};