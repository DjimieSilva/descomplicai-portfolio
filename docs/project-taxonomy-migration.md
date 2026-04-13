# Project Taxonomy Migration

This first pass keeps the public portfolio UI stable while reducing data drift in [`lib/projects.ts`](../lib/projects.ts).

## What changed safely

- `Project.category` is now a typed legacy category instead of a free-form string.
- Filter matching is now driven by a single typed map instead of scattered conditionals.
- Stale preview drift was cleaned up by removing the orphan `possiblai` preview mapping.
- A future-facing taxonomy scaffold now exists via:
  - `PortfolioTrack`
  - `ProjectSector`
  - `ProjectFormat`
  - `ProjectLifecycle`
  - `ProjectVariantKind`
  - `projectTaxonomyById`
- Known route-only drafts are now explicit in `draftProjectRouteIds`.

## Compatibility contract

- No existing route slugs were changed.
- No current imports were removed.
- Public filters still use the same ids:
  - `all`
  - `restaurant`
  - `health`
  - `interactive`
  - `food`
  - `creative`
  - `fitness`
  - `services`
- Legacy categories like `food` and `restaurant` remain in place until the UI is ready for sector/track filters.

## Seeded taxonomy fixes

The current scaffold intentionally starts with the safest high-signal fixes:

- Wine/tourism projects like `ribeirosanto` and `ninika-tours` are tagged in metadata as `wine_tourism`.
- `friseursalon-awat-chalak` is marked as `beauty_personal_care` in metadata without changing the live filter behavior yet.
- Families and variants now have metadata seeds:
  - `zeff-pizza`
  - `jardim-algarvio`
  - `dentalkid`
  - `descomplicai-redesigns`
  - `descomplicai-crowdfunding`

## Recommended next steps

1. Add `track`, `sector`, `format`, and `lifecycle` coverage for every project entry.
2. Split current public filters into top-level tabs by `track` and secondary filters by `sector`.
3. Hide or promote route-only drafts based on a real `lifecycle` value instead of folder presence.
4. Move preview images and featured curation into a smaller dedicated module once the taxonomy is stable.
5. Add a validation script to flag:
   - project without route
   - route without project record
   - preview without project
   - invalid variant/series references
   - missing taxonomy fields
