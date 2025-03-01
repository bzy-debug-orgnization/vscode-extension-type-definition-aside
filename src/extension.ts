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

function gotoLocations(
  uri: vscode.Uri,
  position: vscode.Position,
  locations: vscode.Location[] | vscode.LocationLink[],
  multiple: "peek" | "gotoAndPeek" | "goto",
  noResultsMessage: string,
): Thenable<void> {
  return vscode.commands.executeCommand(
    "editor.action.goToLocations",
    uri,
    position,
    locations,
    multiple,
    noResultsMessage,
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
        if (locations.length === 1) {
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
          const selection = new vscode.Selection(range.start, range.start);
          const editor = await vscode.window.showTextDocument(targetUri, {
            viewColumn: vscode.ViewColumn.Beside,
            selection,
          });
          const highlightDecoration =
            vscode.window.createTextEditorDecorationType({
              backgroundColor: "rgba(250, 240, 170, 0.5)",
            });
          editor.setDecorations(highlightDecoration, [range]);
          setTimeout(() => {
            highlightDecoration.dispose();
          }, 350);
        } else {
          const wordRange = editor.document.getWordRangeAtPosition(position);
          let noResultsMessage = `No type definition found`;
          if (wordRange !== undefined) {
            const word = editor.document.getText(wordRange);
            noResultsMessage = `No type definition found for '${word}'`;
          }
          await gotoLocations(
            uri,
            position,
            locations,
            "peek",
            noResultsMessage,
          );
        }
      },
    ),
  );
}

export function deactivate() {}
