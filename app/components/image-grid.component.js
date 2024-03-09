import Image from "next/image";

const ImageGrid = ({ photos }) => {
  console.log(photos, photos.length);
  return (
    <>
      {photos && photos.length > 0 ? (
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full px-3 mb-6  mx-auto">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] border border-stone-200 bg-white m-5">
              <div className="flex-auto block py-8 px-5">
                <div>
                  <div className="flex flex-wrap w-full">
                    {photos.map((photo) => (
                      <div
                        className="flex flex-col mr-5 text-center mb-11 lg:mr-16 justify-center items-center"
                        key={photo.id}
                      >
                        <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem] ">
                          <Image
                            width={50}
                            height={50}
                            alt="Mars photo"
                            className="transition-all duration-1000 ease-in-out hover:scale-110 inline-block shrink-0 rounded-[.95rem] w-[150px] h-[150px]"
                            src={photo.img_src}
                          />
                        </div>
                        <div className="text-center">
                          <span className="text-dark font-semibold hover:text-primary text-[1.25rem] transition-colors duration-200 ease-in-out">
                            {photo.rover.name}
                          </span>
                        </div>
                        <div className="text-left text-xs w-max">
                          <span className="block">
                            <span className="font-semibold">Landing: </span>
                            {photo.rover.landing_date}
                          </span>
                          <span className="block">
                            <span className="font-semibold">Launch: </span>
                            {photo.rover.launch_date}
                          </span>
                          <span className="block">
                            <span className="font-semibold">Status: </span>
                            {photo.rover.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full px-3 mb-6  mx-auto">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] border border-stone-200 bg-white m-5">
              <div className="flex-auto block py-8 px-5">
                <div>
                  <div className="flex flex-wrap w-full">
                    {Array.from({ length: 24 }, (_, i) => i + 1).map((val) => (
                      <div className="mx-6 mb-5" key={val}>
                        <div className="max-w-sm rounded overflow-hidden animate-pulse w-40">
                          <div className="h-40 rounded bg-gray-300"></div>
                          <div className="px-6 py-6">
                            <div className="h-3 bg-gray-300 mb-2"></div>
                            <div className="h-2 bg-gray-300 w-2/3 mb-2"></div>
                            <div className="h-2 bg-gray-300 w-2/4"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGrid;
