const Minus = ({
  className,
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M3.99609 13H19.9996C20.5519 13 20.9996 12.5523 20.9996 12C20.9996 11.4477 20.5519 11 19.9996 11H3.99609C3.44381 11 2.99609 11.4477 2.99609 12C2.99609 12.5523 3.44381 13 3.99609 13Z"
      fill="currentColor"
    />
  </svg>
);

export default Minus;
