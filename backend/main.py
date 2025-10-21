import os

from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

from models.messagem_models import MessageRequest, MessageResponse

load_dotenv(dotenv_path=".env")
app = FastAPI(title="Resumo Certo API")

# Configurações locais
access_token = os.getenv("ACCESS_TOKEN")
cors_origins = os.getenv("CORS_ORIGINS").split(",") if os.getenv("CORS_ORIGINS") else []

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Authorization", "Content-Type"],
)

# Inicializa o cliente OpenAI
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)


@app.get("/")
async def root():
    return {"message": "API Resumo Certo está funcionando!"}


@app.post("/chat", response_model=MessageResponse)
async def chat_with_openai(
    message_request: MessageRequest,
    request: Request,
    authorization: str,
):
    origin = request.headers.get("origin")
    if origin and origin not in cors_origins:
        raise HTTPException(
            status_code=403,
            detail="Origem não autorizada",
        )

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Token de autenticação não fornecido",
        )

    token = authorization.replace("Token ", "").strip()

    if token != access_token:
        raise HTTPException(
            status_code=401,
            detail="Token de autenticação inválido",
        )

    try:
        completion = client.chat.completions.create(
            model="gpt-5-nano",
            messages=[
                {"role": msg.role, "content": msg.content}
                for msg in message_request.messages
            ],
        )

        response_text = completion.choices[0].message.content
        return MessageResponse(response=response_text)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao processar requisição: {str(e)}",
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
