
type Route = {
  path: string;
  name: string;
  divider?: boolean;
  category?: string;
}

type Routes = {
  [key: string]: Route;
}

export const routes: Routes = {
  HOME: { path: '/', name: 'Home', divider: true },
  CONCEPTS: { path: '/concepts', name: 'Concepts Home' },
  CUSTOM_HOOKS: { path: '/concepts/custom-hooks', name: 'Custom Hooks' },
  PERFORMANCE: { path: '/concepts/performance', name: 'Performance' },
  RENDERING: { path: '/concepts/rendering', name: 'Rendering', divider: true },
  LETTERS: { path: '/letters', name: 'Tracing Letters', category: 'Personal' },
}

