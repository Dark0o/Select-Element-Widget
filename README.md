# Select Items Widget

A widget for selecting up to 3 items from a list of elements.

## Tech stack

- React + TypeScript
- Zustand
- react-window

## Getting started

## Getting started

```
npm install
npm run dev
```

Runs on http://localhost:3000

## Notes

State management is handled with Zustand. The widget keeps a temporary copy of the selection while the panel
is open — changes are not committed until the user clicks Save,
and Cancel discards any changes.

The list is virtualized with react-window to handle large datasets
(10,000+ elements) without performance issues.

During manual testing, I noticed that removing items from the main
view while the panel was open caused inconsistent state between the
panel and the main view. The fix was to disable the remove button
on selected items in the main view while the panel is open.
