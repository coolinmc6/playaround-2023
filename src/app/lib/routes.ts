
type Route = {
  bold?: boolean;
  category: Category;
  divider?: boolean;
  name: string;
  path: string;
}

type Routes = {
  [key: string]: Route;
}

const CONCEPTS = 'Concepts'
const PERSONAL = 'Personal'
const NAVIGATION = 'Navigation'

type Category = typeof CONCEPTS | typeof PERSONAL | typeof NAVIGATION

const DEV_TOOLS: Route = { path: '/dev-tools', name: 'Dev Tools', category: NAVIGATION, bold: true }

export let routes: Routes = {
  HOME: { path: '/', name: 'Home', category: NAVIGATION, bold: true, divider: true },

  CONCEPTS: { path: '/concepts', name: 'Concepts Home', category: CONCEPTS, bold: true },
  CUSTOM_HOOKS: { path: '/concepts/custom-hooks', name: 'Custom Hooks', category: CONCEPTS },
  PERFORMANCE: { path: '/concepts/performance', name: 'Performance', category: CONCEPTS },
  RENDERING: { path: '/concepts/rendering', name: 'Rendering', category: CONCEPTS },
  USE_REDUCER: { path: '/concepts/use-reducer', name: 'Use Reducer', category: CONCEPTS, divider: true },

  RANDOM_HOME: { path: '/random', name: 'Random Home', category: PERSONAL, bold: true },
  LETTERS: { path: '/random/letters', name: 'Tracing Letters', category: PERSONAL },
  CALENDAR: { path: '/random/calendar', name: 'Calendar', category: PERSONAL },
  WORDLE: { path: '/random/wordle', name: 'Wordle', category: PERSONAL, divider: true },
}

if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development') {
  routes = { ...routes, DEV_TOOLS }
}

export const routesArray = Object.keys(routes).map((key) => routes[key])
