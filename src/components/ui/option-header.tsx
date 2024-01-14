export const OptionHeader = (props: { children: React.ReactNode }) => {
  return (
    <h4 className="flex h-[28px] flex-col items-center justify-center rounded border-[0.5px] border-zinc-950/10 bg-zinc-200 px-2 text-sm font-medium leading-none tracking-wide text-zinc-800">
      <span>{props.children}</span>
    </h4>
  );
};
