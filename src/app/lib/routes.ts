
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


const hiddenRoutes = ['DEV_TOOLS', 'MERMAID']
const DEV_TOOLS: Route = { path: '/dev-tools', name: 'Dev Tools', category: NAVIGATION, bold: true }
const MERMAID: Route = { path: '/random/mermaid', name: 'Mermaid', category: NAVIGATION }



export const allRoutes: Route[] = [
  { path: '/', name: 'Home', category: NAVIGATION, bold: true, divider: true },
  { path: '/concepts', name: 'Concepts Home', category: CONCEPTS, bold: true },
  { path: '/concepts/context', name: 'Context Home', category: CONCEPTS, bold: false },
  { path: '/concepts/context/basic-context', name: 'Basic Context', category: CONCEPTS, bold: false },
  { path: '/concepts/context/colin-context', name: 'Colin Context', category: CONCEPTS, bold: false },
  { path: '/concepts/context/context-and-reducer', name: 'Context and Reducer', category: CONCEPTS, bold: false },
  { path: '/concepts/context/single-page-context', name: 'Single Page Context', category: CONCEPTS, bold: false },
  { path: '/concepts/context/context-01', name: 'Context #1', category: CONCEPTS, bold: false },
  { path: '/concepts/custom-hooks', name: 'Custom Hooks', category: CONCEPTS },
  { path: '/concepts/performance', name: 'Performance', category: CONCEPTS },
  { path: '/concepts/rendering', name: 'Rendering', category: CONCEPTS },
  { path: '/concepts/use-reducer', name: 'Use Reducer', category: CONCEPTS, divider: true },
  { path: '/random', name: 'Random Home', category: PERSONAL, bold: true },
  { path: '/random/letters', name: 'Tracing Letters', category: PERSONAL },
  { path: '/random/calendar', name: 'Calendar', category: PERSONAL },
  { path: '/random/wordle', name: 'Wordle', category: PERSONAL, divider: true },
  DEV_TOOLS,
]

export const routes: Routes = {
  HOME: { path: '/', name: 'Home', category: NAVIGATION, bold: true, divider: true },

  CONCEPTS: { path: '/concepts', name: 'Concepts Home', category: CONCEPTS, bold: true },
  CONTEXT: { path: '/concepts/context', name: 'Context Home', category: CONCEPTS, bold: false },
  CUSTOM_HOOKS: { path: '/concepts/custom-hooks', name: 'Custom Hooks', category: CONCEPTS },
  PERFORMANCE: { path: '/concepts/performance', name: 'Performance', category: CONCEPTS },
  RENDERING: { path: '/concepts/rendering', name: 'Rendering', category: CONCEPTS },
  USE_REDUCER: { path: '/concepts/use-reducer', name: 'Use Reducer', category: CONCEPTS, divider: true },

  RANDOM_HOME: { path: '/random', name: 'Random Home', category: PERSONAL, bold: true },
  BLOG_TEST: { path: '/blog/pre-rendering', name: 'Blog Test', category: PERSONAL },
  LETTERS: { path: '/random/letters', name: 'Tracing Letters', category: PERSONAL },
  CALENDAR: { path: '/random/calendar', name: 'Calendar', category: PERSONAL },
  GEOLOCATION: { path: '/random/geo-location', name: 'GeoLocation', category: PERSONAL },
  MERMAID,
  WORDLE: { path: '/random/wordle', name: 'Wordle', category: PERSONAL, divider: true },
  DEV_TOOLS,
} as const

if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'development') {
  hiddenRoutes.forEach((route) => {
    delete routes[route]
  })
} 

export const routesArray = Object.keys(routes).map((key) => routes[key])

export const getRouteGroup = (pathSegment: string): Route[] => {
  return allRoutes.filter((route) => route.path.includes(pathSegment))
}
