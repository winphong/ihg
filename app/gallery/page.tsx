import { getInstagramPhotos } from "@/lib/instagram";
import { PageHero } from "@/components/page-hero";

export default async function GalleryPage() {
  const photos = await getInstagramPhotos();
  const [main, ...rest] = photos;

  return (
    <div>
      <PageHero image="/headers/gallery.jpg" className="px-[8%] py-[8%] text-center">
        <h1 className="text-ihg-gold text-[400%] leading-tight sm:text-[500%] md:text-[600%]">
          GALLERY
        </h1>
        <p className="text-[150%] text-white">
          FOLLOW US{" "}
          <a
            href="https://www.instagram.com/ihgofficial"
            className="text-ihg-gold"
            target="_blank"
            rel="noopener noreferrer"
          >
            @IHGOFFICIAL
          </a>{" "}
          FOR MORE UPDATES
        </p>

        {main && (
          <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <a href={main.permalink} target="_blank" rel="noopener noreferrer">
              <img
                src={main.media_url}
                alt="media"
                className="w-[75%] max-w-xs object-cover md:w-[220px]"
              />
            </a>
            {main.caption && <p className="max-w-md text-white">{main.caption}</p>}
          </div>
        )}
      </PageHero>

      <div className="mx-[8%] flex flex-wrap justify-center gap-4 py-8">
        {rest.slice(0, 9).map((photo) => (
          <a
            key={photo.media_url}
            href={photo.permalink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={photo.media_url}
              alt="media"
              className="size-[12vmax] object-cover sm:size-[18vmax] md:size-[210px] lg:size-[19vmax]"
            />
          </a>
        ))}
        {photos.length === 0 && (
          <p className="text-ihg-taupe py-16">No photos available.</p>
        )}
      </div>
    </div>
  );
}
