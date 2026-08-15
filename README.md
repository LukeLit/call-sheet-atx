# Open Call

Artists should not have to be grant researchers to make a living from their work. Muse is the assistant.

Public and legal name: Open Call. Assistant: Muse. Texas nonprofit in formation. First city: Austin. The product is built to travel.

Grants and the workbench are the main draw. Muse also maps health programs (including HAAM), TWC and other work help, small-business grants, and programs most people never hear about. We do not write checks.

## Muse

Muse is a persistent side drawer on the public site. It answers from org knowledge. It does not write checks or claim live grant matches.

Set `AI_GATEWAY_API_KEY` in the environment. Vercel already has it. Do not commit the key. The AI SDK / `@ai-sdk/gateway` picks this key up automatically.

If `AI_GATEWAY_URL` is set, Muse passes it to `createGateway` as `baseURL`. The SDK does not read this variable on its own.

Models, in order:

1. `inclusionai/ling-3.0-tiny-free`
2. If the gateway returns 404, model not found, or a payment error, retry once with `inclusionai/ling-3.0-tiny`
3. Last resort: `inclusionai/ling-3.0-flash`

The route is `POST /api/muse`. The server logs which model served.

## Photographs

Stills live in public/images/ and are not hotlinked.

capitol-music.jpg -- Live outdoor music near the Texas Capitol, Austin (2014). Larry D. Moore. Wikimedia Commons. CC BY 4.0.
farmers-market-music.jpg -- Live music at Hope Farmers Market, Plaza Saltillo, Austin. Larry D. Moore. Wikimedia Commons. CC BY 4.0.
graffiti-park.jpg -- HOPE Outdoor Gallery / Graffiti Park, Austin. Justraveling.com. Wikimedia Commons. CC BY-SA 4.0.
south-austin-mosaic.jpg -- Public mosaic, South Austin. Carol M. Highsmith. Library of Congress. Public domain.

These are real photographs, not generated images.
