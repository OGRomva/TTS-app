import os
import uuid
from fastapi import FastAPI, UploadFile, HTTPException, BackgroundTasks, Form, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from TTS.api import TTS

# Инициализация модели при старте сервера
tts = TTS(model_name="tts_models/multilingual/multi-dataset/xtts_v2")

app = FastAPI(title="XTTS Voice Generation API")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

@app.post("/generate-voice/")
async def generate_voice(
    background_tasks: BackgroundTasks,
    text: str = Form(...),
    speaker_wav: UploadFile = File(...),
    language: str = Form("ru"),
):
    try:
        # Валидация входных данных
        if not text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        if not speaker_wav.filename.lower().endswith(".wav"):
            raise HTTPException(status_code=400, detail="Only WAV files are supported")

        print(f"Получен файл: {speaker_wav.filename}")
        print(f"Размер файла: {speaker_wav.size} байт")
        
        # Сохраняем временный файл голоса
        temp_input = f"temp_{uuid.uuid4()}.wav"
        with open(temp_input, "wb") as f:
            f.write(await speaker_wav.read())

        # Генерируем уникальное имя для выходного файла
        output_file = f"output_{uuid.uuid4()}.wav"

        # Запуск синтеза речи
        tts.tts_to_file(
            text=text,
            speaker_wav=temp_input,
            language=language,
            file_path=output_file
        )

        # Удаляем временный входной файл
        os.remove(temp_input)
        background_tasks.add_task(os.remove, output_file)

        # Возвращаем результат с автоматическим удалением после отправки
        return FileResponse(
            output_file,
            media_type="audio/wav",
            filename=output_file
        )
        
    except Exception as e:
        # Очистка временных файлов при ошибке
        if os.path.exists(temp_input):
            os.remove(temp_input)
        if os.path.exists(output_file):
            os.remove(output_file)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
