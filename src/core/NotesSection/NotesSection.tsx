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

export default NotesSection;
