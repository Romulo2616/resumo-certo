# Resumo Certo - Backend API

API FastAPI para comunicação com OpenAI.

## 📋 Pré-requisitos

- Python 3.8+
- Conta OpenAI com API Key

## 🚀 Instalação

1. Clone o repositório e navegue até a pasta backend:
```bash
cd backend
```

2. Crie um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Configure a API Key da OpenAI:
```bash
cp .env.example .env
# Edite o arquivo .env e adicione sua OPENAI_API_KEY
```

## 🏃 Como executar

```bash
uvicorn main:app --reload
```

A API estará disponível em: `http://localhost:8000`

## 📚 Documentação da API

Acesse a documentação interativa em:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🔌 Endpoints

### GET /
Verifica se a API está funcionando.

**Resposta:**
```json
{
  "message": "API Resumo Certo está funcionando!"
}
```

### POST /chat
Envia uma mensagem para a OpenAI e retorna a resposta.

**Request Body:**
```json
{
  "message": "Resuma o seguinte texto: ...",
  "model": "gpt-5-nano",  // Opcional, padrão: gpt-5-nano
  "max_tokens": 1000       // Opcional, padrão: 1000
}
```

**Resposta:**
```json
{
  "response": "Resposta gerada pela OpenAI",
  "model": "gpt-5-nano",
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 50,
    "total_tokens": 65
  }
}
```

## 📝 Exemplo de uso com curl

```bash
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Explique o que é FastAPI em poucas palavras",
    "model": "gpt-5-nano",
    "max_tokens": 100
  }'
```

## 📝 Exemplo de uso com Python

```python
import requests

response = requests.post(
    "http://localhost:8000/chat",
    json={
        "message": "Explique o que é FastAPI",
        "model": "gpt-5-nano",
        "max_tokens": 100
    }
)

data = response.json()
print(data["response"])
```

## 🔧 Modelos disponíveis

- `gpt-5-nano` (padrão, mais econômico)

## ⚠️ Tratamento de erros

A API retorna erros HTTP apropriados:

- `500`: Erro na comunicação com OpenAI ou API Key não configurada
- `422`: Dados de entrada inválidos

## 📄 Licença

Este projeto está sob a licença MIT.
