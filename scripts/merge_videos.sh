#!/bin/bash
# Script para mesclar múltiplos vídeos em um único arquivo de vídeo para o background.
# Requer ffmpeg instalado (brew install ffmpeg)

# Diretório base
TARGET_DIR="../public/images/bg-video"
cd "$(dirname "$0")"

if ! command -v ffmpeg &> /dev/null
then
    echo "ffmpeg não pôde ser encontrado. Por favor instale executando: brew install ffmpeg"
    exit 1
fi

echo "Criando lista de vídeos para mesclar..."
# Cria um arquivo temporário com a lista de arquivos .mp4
# Certifique-se de nomear seus vídeos em ordem sequencial (ex: video1.mp4, video2.mp4)
rm -f file_list.txt
for f in $TARGET_DIR/part*.mp4; do
    echo "file '$(basename "$f")'" >> file_list.txt
done

if [ ! -s file_list.txt ]; then
    echo "Nenhum arquivo 'part*.mp4' encontrado em $TARGET_DIR"
    exit 1
fi

echo "Mesclando vídeos..."
# Executa o ffmpeg para concatenar usando o codec de cópia (sem recompressão)
cd $TARGET_DIR
ffmpeg -y -f concat -safe 0 -i ../../../scripts/file_list.txt -c copy renovelli_scroll_bg_final.mp4

echo "Vídeo mesclado com sucesso em: $TARGET_DIR/renovelli_scroll_bg_final.mp4"
rm -f ../../../scripts/file_list.txt
