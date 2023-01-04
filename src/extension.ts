// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The commandId parameter must match the command field in package.json
  // let disposable = vscode.commands.registerCommand('whatismyworkspace.whatIsMyWorkspace', () => {

  // TODO: make the activation command above work as well as activating on load.
  // TODO: also make a deactivation event so a user can toggle it if wanted.
  // TODO: maybe activation command allows an input to define the number of milliseconds our popup should show for
  // TODO: assign a new color for each window session

  vscode.window.onDidChangeWindowState((e) => {
    if (!e.focused) {
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      "currentWorkspace",
      "Current Workspace",
      vscode.ViewColumn.One,
      {}
    );

    // And set its HTML content
    panel.webview.html = getWebviewContent();

    const timeout = setTimeout(() => panel.dispose(), 1000);

    panel.onDidDispose(
      () => {
        // Handle user closing panel before the 5sec have passed
        clearTimeout(timeout);
      },
      null,
      context.subscriptions
    );
  });

  const getWebviewContent = () => {
    return `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Current Workspace</title>
				</head>
				<body>
					<h1>${vscode.workspace.name}</h1>
				</body>
			</html>
		`;
  };

  // context.subscriptions.push(disposable);
  // });
}

// This method is called when your extension is deactivated
export function deactivate() {}
