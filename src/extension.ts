import * as vscode from 'vscode';
import * as path from 'path';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import * as os from 'os';

let ffmpegProcess: ChildProcessWithoutNullStreams | null = null;

export function activate(context: vscode.ExtensionContext) {
    // Registrar comandos para iniciar e parar a gravação
    let startCommand = vscode.commands.registerCommand("screen-recorder.start", async () => {
        const filePath = await vscode.window.showSaveDialog({
            defaultUri: vscode.Uri.file(path.join(os.homedir(), 'gravacao.mp4')),
            filters: { 'Vídeos': ['mp4'] }
        });

        if (!filePath) {
            vscode.window.showErrorMessage("❌ Gravação cancelada.");
            return;
        }

        startScreenRecording(filePath.fsPath);
    });

    let stopCommand = vscode.commands.registerCommand("screen-recorder.stop", () => {
        stopScreenRecording();
    });

    context.subscriptions.push(startCommand, stopCommand);
}

function startScreenRecording(outputPath: string) {
    vscode.window.showInformationMessage(`🎥 Iniciando gravação... Salvando em: ${outputPath}`);

    const ffmpegPath = "/usr/bin/ffmpeg"; // Certifique-se de que o FFmpeg está instalado

    let ffmpegArgs: string[] = [
        "-f", "x11grab",
        "-framerate", "30",
        "-i", ":1", // Ajuste conforme o DISPLAY correto
        "-f", "pulse",
        "-i", "default",
        "-vcodec", "libx264",
        "-preset", "ultrafast",
        "-pix_fmt", "yuv420p",
        outputPath
    ];

    console.log("✅ Comando FFmpeg:", ffmpegPath, ffmpegArgs.join(" "));

    ffmpegProcess = spawn(ffmpegPath, ffmpegArgs);

    ffmpegProcess.stdout.on("data", (data) => {
        console.log(`📹 FFmpeg Output: ${data}`);
    });

    ffmpegProcess.stderr.on("data", (data) => {
        console.error(`⚠️ FFmpeg Erro: ${data}`);
    });

    ffmpegProcess.on("error", (err) => {
        vscode.window.showErrorMessage(`❌ Erro ao iniciar gravação: ${err.message}`);
    });

    ffmpegProcess.on("close", (code) => {
        if (code === 0 || code === 255) { // Código 255 ocorre ao encerrar normalmente com SIGTERM
            vscode.window.showInformationMessage(`✅ Gravação finalizada! Arquivo salvo em: ${outputPath}`);
        } else {
            vscode.window.showErrorMessage(`⚠️ Atenção: FFmpeg retornou código ${code}, mas o vídeo pode estar salvo.`);
        }
    });
    
}

function stopScreenRecording() {
    if (ffmpegProcess) {
        console.log("🛑 Parando a gravação...");
        ffmpegProcess.kill("SIGTERM");
        ffmpegProcess = null;

        vscode.window.showInformationMessage("✅ Gravação interrompida. Clique para abrir o arquivo.", "Abrir Local").then(selection => {
            if (selection === "Abrir Local") {
                vscode.env.openExternal(vscode.Uri.file(path.join(os.homedir(), 'gravacao.mp4')));
            }
        });
    } else {
        vscode.window.showWarningMessage("⚠️ Nenhuma gravação em andamento.");
    }
}


export function deactivate() {
    if (ffmpegProcess) {
        ffmpegProcess.kill("SIGTERM");
    }
}
