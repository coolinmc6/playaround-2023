import type { Meta, StoryObj } from '@storybook/react';

import MuiCard from '../../core/MuiCard';

const meta = {
  title: 'Core/MuiCard',
  component: MuiCard,
} satisfies Meta<typeof MuiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultStoryComponent = () => {
  return (
    <MuiCard className="min-w-16">
      <MuiCard.Header>Card Header</MuiCard.Header>
      <MuiCard.Content>
        Content for MUI Card
      </MuiCard.Content>
    </MuiCard>
  )
}

export const Default: Story = {
  args: {
    children: DefaultStoryComponent(),
  }
}
