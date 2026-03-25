# My Salary Calculator (clean rebuild)

A clean Next.js App Router rebuild for mysalarycalculator.co using Tailwind.

## Included routes

- `/`
- `/hourly/[rate]/to-salary`
- `/salary/[amount]/to-hourly`
- `/salary/[amount]/monthly`
- `/salary/[amount]/biweekly`
- `/salary/[amount]/after-tax`
- `/salary/[amount]/after-tax/[state]`

## Setup

```bash
npm install
npm run dev
```

## Notes

- After-tax state pages are driven by `lib/states.ts`
- Shared pay math lives in `lib/pay.ts`
- Shared internal links live in `components/ValueLinks.tsx`
