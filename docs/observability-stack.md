# Observability Stack

## Current status

Already integrated in the codebase:

- `@vercel/analytics` in `app/layout.tsx`
- `@vercel/speed-insights` in `app/layout.tsx`
- `@sentry/nextjs` via `instrumentation.ts`, `instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`, and `app/global-error.tsx`
- `posthog-js` bootstrap in `instrumentation-client.ts`
- `robots.txt`, `sitemap.xml`, OG images, Twitter image, and shared site config
- Route-specific canonical and social URL metadata across project detail layouts via `lib/project-route-metadata.ts`

## Recommended stack under EUR 50/month

Start here:

- `Vercel Web Analytics + Speed Insights`: `EUR 0`
- `Sentry Developer`: `EUR 0`
- `PostHog Free`: `EUR 0` if you want event analytics and replay
- `Checkly Hobby`: `EUR 0` if you want uptime and browser checks

Do not pay for everything at once.

- Best default: `Vercel + Sentry + optional PostHog`
- Best uptime add-on: `Checkly`
- Best all-in-one alternative instead of stacking tools: `Better Stack`

## Environment variables

Already reflected in `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://descomplicai.pt

NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=

NEXT_PUBLIC_POSTHOG_TOKEN=
NEXT_PUBLIC_POSTHOG_HOST=
```

## What is still blocked by credentials

To finish the live integrations we still need:

- `Sentry DSN`
- `Sentry org slug`
- `Sentry project slug`
- `Sentry auth token` for source maps and release uploads
- `PostHog project token`
- `PostHog host` (`https://eu.i.posthog.com` or `https://us.i.posthog.com`)
- Optional `PostHog MCP API key`
- Optional `PostHog project id` for MCP scoping

## PostHog MCP

The safest setup on this machine is manual config, because the current PostHog wizard wants a newer Node patch level than the one currently installed.

Workspace MCP file:

- `C:\Users\jdsds\Desktop\Codex\.mcp.json`

Example for EU:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx.cmd",
      "args": ["-y", "chrome-devtools-mcp@latest", "--headless"]
    },
    "posthog": {
      "url": "https://mcp-eu.posthog.com/mcp?features=flags,dashboards,insights,error_tracking,docs,events,search",
      "headers": {
        "Authorization": "Bearer phx_TUA_CHAVE",
        "x-posthog-project-id": "12345"
      }
    }
  }
}
```

Example for US:

```json
{
  "mcpServers": {
    "posthog": {
      "url": "https://mcp.posthog.com/mcp",
      "headers": {
        "Authorization": "Bearer phx_TUA_CHAVE"
      }
    }
  }
}
```

## Next rollout

1. Add real Sentry and PostHog credentials to Vercel.
2. Re-deploy preview and verify events/errors arrive.
3. Decide whether to add `Checkly` for uptime.
4. Only consider `Better Stack` if you want one tool to replace multiple others.
