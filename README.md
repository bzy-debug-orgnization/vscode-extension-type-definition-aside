# Open Type Definition Aside

This extension add a command (`editor.action.revealTypeDefinitionAside`) and a editor context menu item to open the type definition aside.

command:

<video controls muted>
  <source src="https://github.com/bzy-debug-orgnization/vscode-extension-type-definition-aside/raw/refs/heads/main/assets/command.mp4" type="video/mp4"/>
</video>

menu item:

<video controls muted>
  <source src="https://github.com/bzy-debug-orgnization/vscode-extension-type-definition-aside/raw/refs/heads/main/assets/menu.mp4" type="video/mp4"/>
</video>

## Config

It's better to use this extension with key bindings.

In your `keybindings.json`

```json
{
  "key": "<keybindings-you-like>",
  "command": "editor.action.revealTypeDefinitionAside",
  "when": "editorHasTypeDefinitionProvider && editorTextFocus && !isInEmbeddedEditor"
},
```

Or if you are using vscode vim, in your `settings.json`

```json
  "vim.normalModeKeyBindingsNonRecursive": [
    ...
    {
      "before": ["<C-w>", "g", "t"],
      "commands": ["editor.action.revealTypeDefinitionAside"]
    }
  ]
```
