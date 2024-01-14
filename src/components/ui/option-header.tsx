export const OptionHeader = (props: { children: React.ReactNode }) => {
  return (
    <h4 className="rounded border border-violet-950/10 bg-violet-100 px-2 py-1 text-sm font-medium leading-none tracking-wide text-violet-700">
      {props.children}
    </h4>
  );
};
