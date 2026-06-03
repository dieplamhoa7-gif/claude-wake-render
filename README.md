# Claude Wake Render

Tiny Render cron job to wake Claude via 9router/OpenAI-compatible Chat Completions.

Security design:
- Does not read local files.
- Does not upload documents.
- Only sends one HTTPS request to the configured API.
- Secrets stay in `.env` locally or Render environment variables.

## 9router env vars

Required:
- `WAKE_MODE=9router`
- `NINEROUTER_API_KEY`

Recommended:
- `NINEROUTER_BASE_URL=https://api.9router.com/v1`
- `NINEROUTER_MODEL=anthropic/claude-sonnet-4-20250514`
- `WAKE_MESSAGE=hi`
- `MAX_TOKENS=8`

## Render schedule (UTC)
- `0 22 * * *` = 05:00 Asia/Saigon
- `0 3 * * *`  = 10:00 Asia/Saigon
- `0 8 * * *`  = 15:00 Asia/Saigon
- `0 13 * * *` = 20:00 Asia/Saigon

Start command:

```bash
node wake.js
```
