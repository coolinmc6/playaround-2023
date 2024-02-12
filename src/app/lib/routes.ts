
type Route = {
  path: string;
  name: string;
  divider?: boolean;
  category: Category;
}

type Routes = {
  [key: string]: Route;
}

const CONCEPTS = 'Concepts'
const PERSONAL = 'Personal'
const NAVIGATION = 'Navigation'

type Category = typeof CONCEPTS | typeof PERSONAL | typeof NAVIGATION

export const routes: Routes = {
  HOME: { path: '/', name: 'Home', divider: true, category: NAVIGATION },

  CONCEPTS: { path: '/concepts', name: 'Concepts Home', category: CONCEPTS },
  CUSTOM_HOOKS: { path: '/concepts/custom-hooks', name: 'Custom Hooks', category: CONCEPTS },
  PERFORMANCE: { path: '/concepts/performance', name: 'Performance', category: CONCEPTS },
  RENDERING: { path: '/concepts/rendering', name: 'Rendering', divider: true, category: CONCEPTS },

  LETTERS: { path: '/letters', name: 'Tracing Letters', category: PERSONAL },
  CALENDAR: { path: '/random/calendar', name: 'Calendar', category: PERSONAL },
  WORDLE: { path: '/random/wordle', name: 'Wordle', category: PERSONAL },
}

