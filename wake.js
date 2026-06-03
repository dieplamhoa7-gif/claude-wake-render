const mode = process.env.WAKE_MODE || '9router';
const message = process.env.WAKE_MESSAGE || 'hi';

async function runOpenAICompatible() {
  const apiKey = process.env.NINEROUTER_API_KEY || process.env.OPENAI_API_KEY;
  const baseUrl = process.env.NINEROUTER_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.9router.com/v1';
  const model = process.env.NINEROUTER_MODEL || process.env.OPENAI_MODEL || 'anthropic/claude-sonnet-4-20250514';
  const maxTokens = Number(process.env.MAX_TOKENS || 8);

  if (!apiKey) {
    console.error('Missing NINEROUTER_API_KEY');
    process.exit(2);
  }

  const res = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: message }],
      max_tokens: maxTokens
    })
  });

  const text = await res.text();
  console.log(`[wake] 9router status=${res.status}`);
  if (!res.ok) {
    console.error(text.slice(0, 2000));
    process.exit(1);
  }
  console.log(text.slice(0, 1000));
}

(async () => {
  console.log(`[wake] ${new Date().toISOString()} mode=${mode}`);
  if (mode === '9router' || mode === 'openai-compatible') {
    await runOpenAICompatible();
    return;
  }
  console.error(`Unsupported WAKE_MODE: ${mode}`);
  process.exit(2);
})();
