import React from 'react';

export default function NotesFilterLayout(props: {
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
  [key: string]: unknown;
}) {
  return (
    <div style={{ display: 'flex' }}>
      {props.sidebar && <aside>{props.sidebar}</aside>}
      <main>{props.children}</main>
    </div>
  );
}