import { LoaderCircle } from "lucide-react";

type Props = {
  size: string;
};
export default function Loading({ size }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-background/80">
      <div className="w-full grid h-dvh place-content-center">
        <LoaderCircle className={`${size} animate-spin text-foreground/80`} />
      </div>
    </div>
  );
}
