# Shaft Misalignment Calculator

A browser-based engineering calculator for estimating **shaft alignment corrections** at the inboard and outboard bearings from face/rim measurements and machine geometry.

The tool translates dial-indicator readings into vertical and horizontal correction values, making a mechanical alignment workflow easier to evaluate interactively.

## Engineering highlights

- Accepts face and rim measurement inputs
- Accounts for machine geometry and bearing distances
- Supports bracket-sag correction
- Computes vertical and horizontal movement for both bearings
- Presents correction direction and magnitude directly in the browser
- Combines mechanical engineering calculations with an interactive web UI

## Calculation flow

```text
Machine geometry + dial readings
             │
             ▼
Face / rim misalignment
             │
             ▼
Angular + offset calculation
             │
             ▼
IB and OB correction values
```

## Stack

- Next.js
- React + TypeScript
- Tailwind CSS
- Component-based engineering input UI

## Local development

```bash
npm install
npm run dev
```

## Project context

This is a small engineering-software project demonstrating how mechanical calculation workflows can be turned into practical browser tools.
