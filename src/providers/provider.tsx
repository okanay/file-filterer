import { JotaiProvider } from "@/providers/jotai-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <JotaiProvider>{children}</JotaiProvider>;
}
