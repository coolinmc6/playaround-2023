import { render, screen, act } from '@testing-library/react';
import Home from '@/app/page';
import ToastList from '@/core/ToastList';

// jest.mock('@/app/store/toast', () => ({
//   useToastStore: () => ({
//     toasts: [],
//     addToast: jest.fn()
//   }),
//   addToast: jest.fn()
// }))

const TestContainer = () => {
  return (
    <>
      <ToastList />
      <Home />
    </>
  )
}

describe('Home', () => {
  it('should render', () => {
    expect(Home).toBeDefined();
  });

  it('should render the correct title', async () => {
    render(<Home />)
    const title = await screen.findByText('React Playaround 2023');
    expect(title).toHaveTextContent('React Playaround 2023');
  })

  it('should show a toast when user clicks the button', async () => {
    render(<TestContainer />)
    const button = screen.getByRole('button');
    act(() => {
      button.click();
    })
    
    const toastItem = await screen.findByText('This is a toast');
    expect(toastItem).toHaveTextContent('toast');
  })
});

