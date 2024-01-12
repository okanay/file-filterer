export const WarningMessage = (props: { percentage?: string }) => {
  return (
    <span className="w-fit rounded border border-amber-950/10 bg-amber-50 px-2 py-1 text-sm tracking-wide text-amber-500 shadow shadow-amber-950/10">
      in development{" "}
      <span className={"underline underline-offset-4"}>{props.percentage}</span>
    </span>
  );
};
