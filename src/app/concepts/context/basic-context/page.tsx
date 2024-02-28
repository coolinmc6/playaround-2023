import React from 'react';
import Heading from './BCHeading';
import Section from './BCSection';
import './basic-context-styles.css';
import Link from '@/core/Link';

import NotesSection from '@/core/NotesSection'

export default function BasicContext() {
  return (
    <div className="m-2">
      <h1>Basic Context</h1>
      <NotesSection>
        <p className="pb-4">
          No before and after this time. The elements below show the final working code
          for this exercise <Link to="https://react.dev/learn/passing-data-deeply-with-context">Passing Data Deeply with Context</Link>{' '}
          which was interesting. I definitely have a much better understanding of context though I tend to not
          like using it. I do want to hit the basics below.
        </p>
      </NotesSection>
      <div className="react-exercise">
        <Section>
          <Heading >Title</Heading>
            <Section>
              <Heading >Heading</Heading>
              <Heading >Heading</Heading>
              <Heading >Heading</Heading>
            <Section>
              <Heading >Sub-heading</Heading>
              <Heading >Sub-heading</Heading>
              <Heading >Sub-heading</Heading>
              <Section>
                <Heading >Sub-sub-heading</Heading>
                <Heading>Sub-sub-heading</Heading>
                <Heading>Sub-sub-heading</Heading>
              </Section>
            </Section>
          </Section>
        </Section>
      </div>
    </div>
  );
}
