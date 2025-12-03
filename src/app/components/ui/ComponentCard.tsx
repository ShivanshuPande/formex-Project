

import Image from "next/image";
import Link from "next/link";

interface ComponentCardProps {
  src: string;
  name:string;
  meta: string;
  href: string;
}

export default function ComponentCard({ name, meta, href , src }: ComponentCardProps) {
  return (
    <Link href={href} className="block">
      <div className="flex flex-col h-65 w-60 text-white z-10">
        <div className="bg-black flex-1 w-full rounded-3xl border-2 border-white hover:border-cyan-500 transition-colors flex items-center justify-center text-center overflow-hidden">
          <Image
            src={src}
            alt={name}
            width={300}
            height={300}
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="text-2xl pt-5 h-10 w-full flex items-center justify-center">
          {meta}
        </div>
      </div>
    </Link>
  );
}