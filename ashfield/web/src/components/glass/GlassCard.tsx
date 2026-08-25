// §4 whitelist only: nav, hero stat chips, Numbers panels, featured pricing tier,
// chart tooltips. Max 3 glass moments per page besides nav; never nest glass in glass.
export function GlassCard({
  interactive = false,
  className = "",
  children,
  ...rest
}: {
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`glass ${interactive ? "glass-interactive" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
