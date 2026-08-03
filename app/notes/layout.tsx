import React from 'react';

interface NotesLayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode; 
}

export default function NotesLayout({ children, modal }: NotesLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}