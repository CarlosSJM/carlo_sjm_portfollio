export function SkipToContent(): React.JSX.Element {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-sm focus:tracking-wider focus:outline-none focus:shadow-lg"
    >
      Skip to content
    </a>
  );
}
