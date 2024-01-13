import Image from "next/image";

type TProps = React.FC<{ name: string; children: React.ReactNode }>;
export const LabelWithIcon: TProps = ({ name, children }) => {
  return (
    <div className={"relative flex shrink-0 items-center gap-2"}>
      <Image
        src={`./svgs/${name}.svg`}
        alt={name}
        width={100}
        height={100}
        className={"absolute size-[16px] translate-x-[-145%] translate-y-[0%]"}
      />
      {children}
    </div>
  );
};
