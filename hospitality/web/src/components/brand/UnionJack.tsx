type UnionJackProps = {
  width?: number;
  className?: string;
  "aria-label"?: string;
};

export function UnionJack({
  width = 30,
  className,
  "aria-label": ariaLabel = "Union Jack flag",
}: UnionJackProps) {
  const height = width / 2;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 30"
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <rect width="60" height="30" fill="#012169" />
      <polygon points="0,0 6,0 60,27 60,30 54,30 0,3" fill="#fff" />
      <polygon points="54,0 60,0 60,3 6,30 0,30 0,27" fill="#fff" />
      <polygon points="0,3 2,0 30,13.5 30,16.5" fill="#C8102E" />
      <polygon points="58,0 60,0 60,3 30,16.5 30,13.5" fill="#C8102E" />
      <polygon points="60,27 60,30 58,30 30,16.5 30,13.5" fill="#C8102E" />
      <polygon points="0,27 2,30 0,30 30,13.5 30,16.5" fill="#C8102E" />
      <rect x="0" y="11" width="60" height="8" fill="#fff" />
      <rect x="26" y="0" width="8" height="30" fill="#fff" />
      <rect x="0" y="12" width="60" height="6" fill="#C8102E" />
      <rect x="27" y="0" width="6" height="30" fill="#C8102E" />
    </svg>
  );
}
