# Copilot Instructions for my-react-app

This is a **Create React App (CRA)** project using React 19.2.4 with a minimal component structure. Below are essential patterns and workflows for productive development.

## Project Structure & Architecture

- **Entry Point**: [src/index.js](../src/index.js) - Root React DOM rendering with StrictMode enabled
- **Main Component**: [src/App.js](../src/App.js) - Currently a single functional component; extend with additional components in subdirectories
- **Styling**: [src/App.css](../src/App.css) and [src/index.css](../src/index.css) - CSS Modules or inline styles can be added as needed
- **Tests**: Collocate tests with components using `.test.js` suffix (e.g., `ComponentName.test.js`)

**Pattern**: Keep App.js as a thin container that delegates to feature components. Create new components in `src/components/` and `src/pages/` directories as the app grows.

## Development & Build Commands

All scripts use `react-scripts` (CRA's build tool). Commands must be run from the workspace root:

```bash
npm start      # Dev server (port 3000, hot reload on changes)
npm test       # Run Jest in watch mode; press 'a' to run all tests
npm run build  # Production build to build/ directory
npm run eject  # ONE-WAY operation - ejects CRA config, avoid unless essential
```

**Key CRA behaviors**:
- `.env` files (e.g., `REACT_APP_*` variables) require server restart
- Public assets must be imported in JS or placed in `public/` for static reference
- ESLint config extends `react-app` and `react-app/jest` (see package.json)

## Testing Setup

**Framework**: React Testing Library + Jest (configured automatically by CRA)

**Test Pattern** - Prefer user-centric queries over implementation details:

```javascript
// ✓ Good - tests user behavior
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

test('submits form when user clicks button', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);
  await user.click(screen.getByRole('button', { name: /submit/i }));
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});

// ✗ Avoid - tests implementation
test('handleSubmit called', () => {
  const mockFn = jest.fn();
  // ...
});
```

**Setup**: [src/setupTests.js](../src/setupTests.js) imports `@testing-library/jest-dom` for matchers like `toBeInTheDocument()`.

## Code Patterns

**Functional Components Only**: CRA projects use functional components with Hooks. Example:

```javascript
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**State Management**: For global state, consider Context API for simple apps. No Redux configured; add only if complexity justifies.

**CSS Approach**: CSS files are imported directly (not CSS Modules by default). To enable CSS Modules, either:
- Use `.module.css` naming (automatically recognized)
- Configure webpack post-eject (not recommended)

## Dependencies & External Integration

**Current Dependencies**:
- `react@19.2.4`, `react-dom@19.2.4` - Core UI library
- `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom` - Testing utilities
- `react-scripts@5.0.1` - Build & dev server (do not update manually; use `npm install react-scripts`)
- `web-vitals` - Performance monitoring (enabled by [src/reportWebVitals.js](../src/reportWebVitals.js))

**Adding Dependencies**: Always use `npm install <package>` and commit package-lock.json.

## Performance Considerations

- **Code Splitting**: Use `React.lazy()` + `Suspense` for route-based splitting
- **Web Vitals**: Hook `reportWebVitals()` to analytics services if needed (currently just logs to console if passed a callback)
- **Run Lighthouse**: `npm run build` outputs a ready-to-audit bundle; use Chrome DevTools to profile production builds

## Common Extensions

| Need | Approach |
|------|----------|
| **Routing** | Install `react-router-dom`: `npm install react-router-dom`. Import `BrowserRouter` in index.js, define routes in App.js. |
| **API Calls** | Use native `fetch()` in custom Hooks or install `axios`. Store data in component state or Context. |
| **UI Library** | Add `@mui/material` or `shadcn/ui` following their CRA integration guides. |
| **Linting** | ESLint is configured; run `npm test` to check. Rules extend `react-app` preset. |

## Deployment

The `build/` output is static and deployment-ready. CRA includes asset hashing for cache-busting. Common targets:
- **Vercel/Netlify**: Connect repo, auto-builds on push
- **GitHub Pages**: Set `"homepage"` in package.json and use `gh-pages` package
- **Docker**: Standard Node base, `npm run build` → serve `build/` folder with static server
