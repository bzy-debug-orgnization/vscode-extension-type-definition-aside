import * as vscode from "vscode";

async function executeTypeDefinitionProvider(
  uri: vscode.Uri,
  position: vscode.Position,
): Promise<vscode.Location[] | vscode.LocationLink[]> {
  return await vscode.commands.executeCommand(
    "vscode.executeTypeDefinitionProvider",
    uri,
    position,
  );
}

function peekLocations(
  uri: vscode.Uri,
  position: vscode.Position,
  locations: vscode.Location[] | vscode.LocationLink[],
): Thenable<void> {
  return vscode.commands.executeCommand(
    "editor.action.peekLocations",
    uri,
    position,
    locations,
    "peek",
  );
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      "editor.action.revealTypeDefinitionAside",
      async (editor) => {
        const uri = editor.document.uri;
        const position = editor.selection.active;
        const locations = await executeTypeDefinitionProvider(uri, position);
        if (locations.length > 1) {
          await peekLocations(uri, position, locations);
        } else {
          const location = locations[0];
          const targetUri =
            location instanceof vscode.Location
              ? location.uri
              : location.targetUri;
          const range =
            location instanceof vscode.Location
              ? location.range
              : location.targetSelectionRange;
          if (range === undefined) {
            return;
          }
          const document = await vscode.window.showTextDocument(targetUri, {
            viewColumn: vscode.ViewColumn.Beside,
          });
          document.revealRange(range, vscode.TextEditorRevealType.InCenter);
        }
      },
    ),
  );
}

export function deactivate() {}
