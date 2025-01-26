# 🎥 Screen Recorder - VS Code Extension

Screen Recorder é uma **extensão Open Source para o VS Code** que permite **gravar a tela e o áudio** diretamente do editor, usando **FFmpeg**.

> ✅ **Grave sua tela enquanto codifica, ensina ou faz demonstrações!** 🚀

---

## **✨ Recursos**
✔️ Grava a tela do sistema e o áudio simultaneamente.  
✔️ Salva o vídeo no formato **MP4** com alta qualidade.  
✔️ Comandos fáceis pelo **Command Palette** (`Ctrl+Shift+P`).  
✔️ Opção para **abrir automaticamente a pasta do arquivo gravado**.  
✔️ Suporte para **Linux e macOS** (com FFmpeg instalado).  

---

## **📥 Instalação**
### **Pré-requisitos**
Antes de instalar a extensão, certifique-se de que o **FFmpeg** está instalado no seu sistema:

🔹 **Ubuntu/Debian**:
```sh
sudo apt install ffmpeg
```

🔹 **Arch Linux**:
```sh
sudo pacman -S ffmpeg
```

🔹 **Fedora**:
```sh
sudo dnf install ffmpeg
```

🔹 **macOS (Homebrew)**:
```sh
brew install ffmpeg
```

### **Instalando a Extensão**
Em breve disponível no Marketplace do VS Code. Por enquanto, instale manualmente:
```sh
npm install -g vsce
vsce package
code --install-extension screen-recorder-0.0.1.vsix
```

---

## **🚀 Como Usar**

### **1️⃣ Iniciar Gravação**
1. Pressione `Ctrl+Shift+P` para abrir o **Command Palette**.
2. Digite **`Iniciar Gravação`** e pressione **Enter**.
3. Escolha o local para salvar o vídeo.
4. A gravação iniciará imediatamente!

### **2️⃣ Parar Gravação**
1. Pressione `Ctrl+Shift+P` e selecione **`Parar Gravação`**.
2. O vídeo será salvo automaticamente no local escolhido.
3. Uma notificação permitirá abrir a pasta do arquivo gravado.

### **⏩ Atalhos de Teclado**
- 🟥 **Iniciar Gravação** → `Ctrl + Alt + R`
- ⏹️ **Parar Gravação** → `Ctrl + Alt + S`

---

## **🛠️ Configurações Avançadas**
Por padrão, a gravação usa:
- 📺 **X11 para capturar a tela**
- 🎙️ **PulseAudio para capturar áudio**
- 🎞️ **MP4 (H.264) como formato de saída**

Caso tenha problemas com áudio, verifique suas fontes com:
```sh
pactl list sources
```
E altere o código da extensão para usar a fonte correta.

---

## **🛠️ Problemas Conhecidos**
1. **Erro `Cannot open display :0.0`**  
   🔹 Execute `echo $DISPLAY`. Se retornar `:1`, ajuste o comando da gravação para `-i :1`.

2. **Áudio não gravando no Linux**  
   🔹 Use `pactl list sources` para encontrar o nome correto do dispositivo de entrada.

3. **Arquivo salvo mas não abre**  
   🔹 Instale o **VLC** (`sudo apt install vlc`) ou tente abrir com `ffplay output.mp4`.

Se encontrar outro problema, abra uma **issue** no repositório! 🛠️

---

## **📝 Contribuindo**
💡 **Pull Requests são bem-vindos!** Se quiser contribuir:
1. **Fork o repositório**
2. Clone o projeto:  
   ```sh
   git clone https://github.com/seu-usuario/screen-recorder.git
   cd screen-recorder
   ```
3. Instale dependências e compile:  
   ```sh
   npm install
   npm run compile
   ```
4. Teste no VS Code:  
   ```sh
   code --extensionDevelopmentPath=.
   ```

Caso encontre bugs ou tenha sugestões, abra uma **issue**! 🛠️

---

## **📌 Licença**
📜 Este projeto é **Open Source** sob a licença **MIT**. Sinta-se livre para usar e modificar!

---

## **📢 Links Úteis**
🔗 [Repositório no GitHub](https://github.com/seu-usuario/screen-recorder)  
🔗 [FFmpeg Documentation](https://ffmpeg.org/documentation.html)  
🔗 [VS Code API Docs](https://code.visualstudio.com/api)  

**🚀 Espero que essa extensão facilite sua gravação no VS Code!**


