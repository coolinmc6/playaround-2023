import React from 'react';

type NotesSectionProps = {
  children?: React.ReactNode;
}

const NotesSection = ({ children }: NotesSectionProps) => {
  return (
    <div className="pt-4 pb-4">
      {children}
    </div>
  )
}

const NotesSectionParagraph = ({ children }: NotesSectionProps) => {
  return (
    <p className="pb-4">{children}</p>
  )
}

export default NotesSection;

NotesSection.Paragraph = NotesSectionParagraph;
