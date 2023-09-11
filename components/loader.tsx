import Image from "next/image"

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-15 h-15 relative animate-spin">
        <Image
          alt="Logo"
          src="/load.png"
          fill
        />
      </div>
      <p className="text-sm text-muted-foreground">
        AINovas düşünüyor...
      </p>
    </div>
  );
};
