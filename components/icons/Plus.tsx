const Plus = ({
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
      d="M12.75 3.5C12.75 3.08579 12.4142 2.75 12 2.75C11.5858 2.75 11.25 3.08579 11.25 3.5V11.25H3.5C3.08579 11.25 2.75 11.5858 2.75 12C2.75 12.4142 3.08579 12.75 3.5 12.75H11.25V20.5C11.25 20.9142 11.5858 21.25 12 21.25C12.4142 21.25 12.75 20.9142 12.75 20.5V12.75H20.5C20.9142 12.75 21.25 12.4142 21.25 12C21.25 11.5858 20.9142 11.25 20.5 11.25H12.75V3.5Z"
      fill="currentColor"
    />
  </svg>
);

export default Plus;
