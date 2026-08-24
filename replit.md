# Bot de Vendas Discord

Bot Discord backend-only para vender itens digitais via Pix e entregar automaticamente por DM.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required secrets: `DISCORD_BOT_TOKEN`, `DISCORD_CLIENT_ID`, `PIX_RANDOM_KEY`
- Optional env: `DISCORD_GUILD_ID` (registra comandos imediatamente em um servidor específico; sem ele, registra comandos globais)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: SQLite local (`artifacts/api-server/data/discord-store.sqlite`)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/api-server/src/discord.ts` — comandos Slash, Pix, confirmação e entrega
- `artifacts/api-server/src/lib/store.ts` — schema e operações transacionais do estoque/pedidos

## Architecture decisions

- A confirmação de pagamento é manual por desenho: a chave Pix aleatória não fornece conciliação automática sem um PSP/webhook.
- O primeiro item disponível é reservado em transação SQLite antes da DM; se a DM falhar, ele volta ao estoque.
- `DISCORD_GUILD_ID` é opcional para permitir testes rápidos em um servidor sem esperar propagação global.

## Product

Administra catálogo e estoque com Slash commands, recebe pedidos com instruções Pix e entrega o conteúdo do item em DM após aprovação.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
