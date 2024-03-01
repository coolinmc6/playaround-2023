import { render, screen } from '@testing-library/react';
import Page from '@/app/blog/page';

describe('blog/page.tsx', () => {
  it('should render', () => {
    expect(Page).toBeDefined();
  })

  it('should show blog title', () => {
    render(<Page />)
    const title = screen.getByText('Blog Home');
    expect(title).toHaveTextContent('Blog Home');
  })
})
