# Open Call

Artists should not have to be grant researchers to make a living from their work. Muse is the assistant.

Public and legal name: Open Call. Assistant: Muse. Texas nonprofit in formation. First city: Austin. The product is built to travel.

Grants and the workbench are the main draw. Muse also maps health programs (including HAAM), TWC and other work help, small-business grants, and programs most people never hear about. We do not write checks.

## Muse

Muse is a persistent side drawer on the public site. It answers from org knowledge. It does not write checks or claim live grant matches.

`AI_GATEWAY_API_KEY` is required. Set it in the environment. Vercel already has it. Do not commit the key. The AI SDK / `@ai-sdk/gateway` picks this key up automatically.

`AI_GATEWAY_URL` is optional. Muse only uses it as `createGateway` `baseURL` if it is an AI SDK gateway base (`.../v1/ai` or `.../v4/ai`). The OpenAI-compat `.../v1` URL is ignored so the SDK default is used. Passing `/v1` would 404 every model as `/v1/language-model`.

Models, in order:

1. `poolside/laguna-s-2.1-free`
2. If the gateway returns 404, model not found, a rate limit, or a payment error, retry with `alibaba/qwen3.7-flash`
3. Last resort: `inclusionai/ling-3.0-flash`

The route is `POST /api/muse`. The server logs which model served.

## Admin / ops

`/admin` is ops-only. It is not linked from the public site. Do not turn on Vercel Deployment Protection for the whole project; public pages stay open.

Set `ADMIN_SECRET` in the environment. Middleware gates `/admin` and `/api/admin/*` with an HttpOnly, Secure, SameSite=lax cookie. If `ADMIN_SECRET` is unset, `/admin` shows a not-configured state and the public site does not 500.

The panel can set a Muse primary / fallback / last chain.

- Optional `MUSE_MODELS` — comma-separated ids, for example `poolside/laguna-s-2.1-free,alibaba/qwen3.7-flash,inclusionai/ling-3.0-flash`
- Optional Edge Config: connect a store so Vercel sets `EDGE_CONFIG` (or `GLOBAL_CONFIG`). Writes use the official REST API (`PATCH /v1/edge-config/{id}/items`) with a Vercel Access Token in `VERCEL_ACCESS_TOKEN`. There is no dedicated Edge Config write env; the store id is parsed from the connection string. The key is `muse_models`.

If Edge Config write is not available, save still succeeds: the UI shows the exact `MUSE_MODELS` value to paste into Vercel, and keeps a preview cookie in that browser only. The preview cookie never changes Muse for other people.

## Photographs

Stills live in public/images/ and are not hotlinked.

capitol-music.jpg -- Live outdoor music near the Texas Capitol, Austin (2014). Larry D. Moore. Wikimedia Commons. CC BY 4.0.
farmers-market-music.jpg -- Live music at Hope Farmers Market, Plaza Saltillo, Austin. Larry D. Moore. Wikimedia Commons. CC BY 4.0.
graffiti-park.jpg -- HOPE Outdoor Gallery / Graffiti Park, Austin. Justraveling.com. Wikimedia Commons. CC BY-SA 4.0.
south-austin-mosaic.jpg -- Public mosaic, South Austin. Carol M. Highsmith. Library of Congress. Public domain.

These are real photographs, not generated images.
