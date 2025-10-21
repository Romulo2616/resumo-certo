from pydantic import BaseModel


class MessageHistory(BaseModel):
    role: str
    content: str


class MessageRequest(BaseModel):
    messages: list[MessageHistory]


class MessageResponse(BaseModel):
    response: str
