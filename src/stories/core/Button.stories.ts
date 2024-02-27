import type { Meta, StoryObj } from '@storybook/react';

import Button from '../../core/Button';

const meta = {
  title: 'Core/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

// Info Button Story
export const Info: Story = {
  args: {
    children: 'Info Button',
    variant: 'info',
  },
};

// Warning Button Story
export const Warning: Story = {
  args: {
    children: 'Warning Button',
    variant: 'warning',
  },
};

// Danger Button Story
export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
};

// Success Button Story
export const Success: Story = {
  args: {
    children: 'Success Button',
    variant: 'success',
  },
};

// Outline Primary Button Story
export const OutlinePrimary: Story = {
  args: {
    children: 'Outline Primary Button',
    variant: 'outlinePrimary',
  },
};

// Outline Secondary Button Story
export const OutlineSecondary: Story = {
  args: {
    children: 'Outline Secondary Button',
    variant: 'outlineSecondary',
  },
};

// Outline Info Button Story
export const OutlineInfo: Story = {
  args: {
    children: 'Outline Info Button',
    variant: 'outlineInfo',
  },
};

// Outline Warning Button Story
export const OutlineWarning: Story = {
  args: {
    children: 'Outline Warning Button',
    variant: 'outlineWarning',
  },
};

// Outline Danger Button Story
export const OutlineDanger: Story = {
  args: {
    children: 'Outline Danger Button',
    variant: 'outlineDanger',
  },
};

// Outline Success Button Story
export const OutlineSuccess: Story = {
  args: {
    children: 'Outline Success Button',
    variant: 'outlineSuccess',
  },
};
