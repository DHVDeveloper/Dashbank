import React from 'react';

export function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`${props.className || ''}`}
      {...props}
    >
      <path
        fill="currentColor"
        d="M3 21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2-2.92l9.06-9.06l.92.92L5.92 19H5zM18.37 3.29a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41z"
      ></path>
    </svg>
  );
}

