import Image from "next/image";

type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export function PhotoBand({ photo }: { photo: Photo }) {
  return (
    <figure className="relative">
      <div className="relative aspect-[16/8] w-full overflow-hidden sm:aspect-[21/9]">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="h-full w-full object-cover"
          sizes="100vw"
        />
      </div>
      <figcaption className="mx-auto max-w-6xl px-5 py-3 text-[11px] uppercase tracking-sheet text-ink/45 sm:px-8">
        {photo.caption}
      </figcaption>
    </figure>
  );
}
