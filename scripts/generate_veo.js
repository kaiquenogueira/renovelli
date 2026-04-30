import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Carrega as variáveis do .env na raiz do projeto
dotenv.config({ path: path.join(process.cwd(), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Garante que o diretório de destino exista
const publicImagesDir = path.join(__dirname, '../public/images/bg-video');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

// Inicializa o cliente usando a chave de API do AI Studio
const client = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
});

async function main() {
  console.log("=========================================");
  console.log("Gerador de Vídeo de Fundo (Veo)");
  console.log("=========================================");
  console.log("Iniciando requisição...");
  
  // O prompt da "Ideia 3" - O Antes e Depois Orgânico
  const prompt = "A highly detailed, cinematic macro pan over the dark paint of a classic collectible car. The sequence starts on a section of paint with micro-scratches and dullness, then a smooth, invisible wave transforms the surface in real-time into an impossibly deep, flawless, high-gloss finish. The lighting shifts from flat to a dramatic, radiant glow reflecting off the newly restored liquid-like surface. No camera cuts, seamless continuous movement.";
  
  try {
    let operation = await client.models.generateVideos({
      model: 'veo-3.1-generate-001', 
      prompt: prompt,
      config: {
        aspectRatio: '16:9'
      }
    });

    console.log("Operação iniciada! ID:", operation.name);
    console.log("Aguardando processamento do vídeo (isso pode levar alguns minutos)...");
    
    // Faz polling a cada 15 segundos
    while (!operation.done) {
      process.stdout.write(".");
      await new Promise(resolve => setTimeout(resolve, 15000));
      operation = await client.operations.get({operation: operation});
    }

    console.log("\nOperação concluída!");
    
    if (operation.response && operation.response.generatedVideos && operation.response.generatedVideos.length > 0) {
      const videoResult = operation.response.generatedVideos[0].video;
      
      // Salva os bytes do vídeo se retornados
      if (videoResult.videoBytes) {
        const outputPath = path.join(publicImagesDir, 'renovelli_scroll_bg.mp4');
        fs.writeFileSync(outputPath, Buffer.from(videoResult.videoBytes, 'base64'));
        console.log(`✅ Vídeo salvo com sucesso em: ${outputPath}`);
      } else if (videoResult.uri) {
        console.log(`✅ URI do vídeo gerado: ${videoResult.uri}`);
        console.log("Nenhum byte retornado. O vídeo precisa ser baixado dessa URI.");
      } else {
        console.log("Vídeo gerado, mas sem bytes ou URI disponíveis:", videoResult);
      }
    } else {
      console.log("Nenhum vídeo retornado na resposta final:", JSON.stringify(operation, null, 2));
    }

  } catch (err) {
    console.error("\n❌ Erro ao gerar vídeo:");
    console.error(err.message);
    if (err.status === 404) {
      console.log("\nNota: O modelo veo-3.1-generate-001 pode estar restrito apenas ao Vertex AI no Google Cloud. Para acessar via API Key simples, tente trocar o modelo no script para versões suportadas no AI Studio.");
    }
  }
}

main();
