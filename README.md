# Open Type Definition Aside

This extension add a command (`editor.action.revealTypeDefinitionAside`) and a editor context menu item to open the type definition aside.

command:

<video autoplay loop muted playsinline src="./assets/menu.mp4"></video>

menu item:

<video autoplay loop muted playsinline src="./assets/command.mp4"></video>

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
