import logging

from config import Settings
from db.schemas import UpsertView
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from services.upsert import data_upload

logging.basicConfig(level=logging.INFO)
settings = Settings()

__file_map__ = {
    settings.perprod_index: "Period Products Core Brief_Oct22[4056]",
    settings.schoolbrief_index: "Downloaded version SCHOOL FOOD CORE BRIEFING PACK",
}

router = APIRouter(prefix="/upsert")


@router.post("/vectors")
async def upsert_vectors(data: UpsertView):
    if data.document not in __file_map__.keys():
        raise HTTPException(status_code=400, detail="Invalid choice")
    data_upload(data.document, __file_map__[data.document])
    return JSONResponse(status_code=200, content={"Content": "Successful"})
