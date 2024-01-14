import Image from "next/image";

type TProps = React.FC<{ name: string; children: React.ReactNode }>;
export const OptionHeaderIcon: TProps = ({ name, children }) => {
  return (
    <div className={"relative flex shrink-0 items-center gap-2"}>
      <div className="absolute flex size-[28px] translate-x-[-115%] flex-col items-center justify-center rounded-full border-[0.5px] border-zinc-950/40 bg-zinc-200">
        <Image
          src={`./svgs/${name}.svg`}
          alt={name}
          width={100}
          height={100}
          className={"size-[16px]"}
        />
      </div>

      {children}
    </div>
  );
};
