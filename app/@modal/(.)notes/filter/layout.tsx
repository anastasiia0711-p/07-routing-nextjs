import React from 'react';
import { LayoutNotes } from '../../../../components/LayoutNotes/LayoutNotes';

interface NotesFilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesFilterLayout({ children, sidebar }: NotesFilterLayoutProps) {
  return (
    <LayoutNotes sidebar={sidebar}>
      {children}
    </LayoutNotes>
  );
}