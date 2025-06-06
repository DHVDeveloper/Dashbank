import React from 'react';

export function ReuseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`${props.className || ''}`}

      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.52 0h-2.44l-2.8 4l2.8 4h2.44l-2.1-3H12a7 7 0 1 1-5.563 2.75L5.202 6.102A9 9 0 1 0 12 3h-1.58z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}



