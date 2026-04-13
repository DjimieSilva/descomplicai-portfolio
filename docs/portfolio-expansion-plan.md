# Portfolio Expansion Plan

## Current repo reality

- Main public portfolio repo: `DjimieSilva/descomplicai-portfolio`
- Public related repos:
  - `DjimieSilva/figueira-sites`
  - `DjimieSilva/rabbit-hole`
- Private related repos with likely portfolio value:
  - `DjimieSilva/descomplicai`
  - `DjimieSilva/bfitfam`
  - `DjimieSilva/possiblai`
  - `DjimieSilva/proposta-magnum`
  - `DjimieSilva/Martim`
  - `DjimieSilva/mylo`

## Strongest expansion candidates

### 1. `figueira-sites`

Why it matters:

- public
- same stack family as the current portfolio
- clear bridge to local-service and regional web work
- not clearly represented as a first-class portfolio project yet

Suggested positioning:

- `track: client`
- `sector: [\"local_services\"]`
- `format: [\"multi_page_site\", \"portfolio\"]`

### 2. `possiblai`

Why it matters:

- already appears as stale preview drift in the portfolio data
- likely existed in the narrative but was never finished cleanly
- good candidate for reintroduction as a product/concept page

Suggested positioning:

- `track: concept` or `internal`
- `sector: [\"developer_tools\"]` or `creative_tech`
- `format: [\"tool\", \"product\"]`

### 3. `descomplicai`

Why it matters:

- brand-level platform repo
- useful to distinguish the company/product layer from the portfolio layer
- can work as proof of systems thinking rather than just client delivery

Suggested positioning:

- `track: internal`
- `sector: [\"creative_tech\"]`
- `format: [\"marketing_site\", \"platform\"]`

## Local folders that likely contain portfolio fuel

Signals from `C:\\Users\\jdsds\\Desktop\\Projetos`:

- `figueira-sites`
- `rabbit-hole`
- `bfitfam`
- `descomplicai-brutalist`
- `descomplicai-editorial`
- `Friseursalon Awat & Chalak`
- `fitness-brand`
- `futuro-v2`
- `nano-studio`
- `Synerg-Showcase`
- `terceira-intelligence`
- `wine-monitoring`
- `wine-sentiment`

These look like the best sources for:

- new portfolio entries
- better screenshots and previews
- grouping projects into series instead of standalone clutter

## Naming and grouping opportunities

### Brand/system series

- `descomplicai-*`
- `zeff-pizza*`
- `jardim-algarvio*`
- `dentalkid*`
- `cacarola*`

### Sector clusters

- hospitality and restaurants
- wine and enotourism
- healthcare
- fitness and wellness
- local services
- creative/interactive lab work

## Recommended next GitHub actions

1. Open a proper branch and draft PR for `descomplicai-portfolio`.
2. Add missing public repo metadata:
   - descriptions
   - homepage URLs
   - topics
3. Reintroduce or add `figueira-sites` and `possiblai` to the portfolio source of truth.
4. Add repo/source/case-study links for public projects where relevant.
5. Decide governance:
   - `main` vs `master`
   - branch protection
   - PR-first workflow

## Recommended next portfolio actions

1. Move from flat `category` to `track + sector + format`.
2. Create series/variant support.
3. Keep slugs stable.
4. Mark draft-only route families explicitly instead of letting them drift.
5. Add validation checks for:
   - project without route
   - route without project
   - preview without project
   - invalid category/sector mapping
