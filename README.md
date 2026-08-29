# Shaft Misalignment Calculator

Browser-based engineering calculator for shaft-alignment corrections from face/rim measurements and machine geometry.

## Features

- Face and rim measurement inputs
- Machine geometry and bearing distances
- Bracket-sag correction
- Vertical and horizontal corrections for inboard and outboard bearings
- Clear correction direction and magnitude

## Flow

```text
Geometry + dial readings
          │
          ▼
Face / rim misalignment
          │
          ▼
Angular + offset calculation
          │
          ▼
Bearing corrections
```

## Stack

`Next.js` `React` `TypeScript` `Tailwind CSS`

## Development

```bash
npm install
npm run dev
```
