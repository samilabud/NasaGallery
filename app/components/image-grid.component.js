import Image from "next/image";
import noResult from "../images/no-results.svg";

const ImageGrid = ({ photos, isLoading }) => {
  const shouldShowPhotos = !isLoading && photos && photos.length > 0;
  const shouldShowNotFoundError = !isLoading && photos && photos.length <= 0;
  return (
    <>
      {shouldShowPhotos ? (
        <div
          data-testid="gallery-container"
          className="flex flex-wrap mb-5 mt-6"
        >
          <div className="mb-6">
            <div className="flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] border border-stone-200 bg-white shadow-md">
              <div className="flex py-8">
                <div className="flex flex-wrap">
                  {photos.map((photo) => (
                    <div
                      className="flex flex-col w-44 lg:w-52 text-center mb-11 justify-start items-center"
                      key={photo.id}
                    >
                      <div className="flex mb-4 rounded-[.95rem] shadow-lg">
                        <Image
                          width={50}
                          height={50}
                          alt="Mars photo"
                          className="transition-all duration-1000 ease-in-out hover:scale-110 inline-block shrink-0 rounded-[.95rem] w-[140px] lg:w-[150px] h-[140px] lg:h-[150px]"
                          src={photo.img_src}
                        />
                      </div>
                      <div className="text-center">
                        <span className="text-dark font-semibold hover:text-primary text-[1.25rem] transition-colors duration-200 ease-in-out">
                          {photo.rover.name}
                        </span>
                      </div>
                      <div className="text-left text-xs">
                        <p className="flex justify-between">
                          <span className="font-bold">Camera: </span>
                          <span className="ml-2">{photo.camera.name}</span>
                          <span className="hidden">
                            {photo.camera.full_name}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="font-bold">
                            Sol <span className="text-xs">(martian day) </span>:
                          </span>
                          <span className="ml-2">{photo.sol}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="font-bold">Earth Date: </span>
                          <span className="ml-3">{photo.earth_date}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          data-testid="notfound-gallery-container"
          className={`flex flex-wrap mb-2 ${
            shouldShowNotFoundError ? "lg:pt-0 pt-1" : "mt-6"
          }`}
        >
          <div className="w-full mb-6">
            <div className="flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] border border-stone-200 bg-white">
              <div className="flex py-8 w-full">
                {shouldShowNotFoundError ? (
                  <div className="flex flex-wrap w-full justify-center items-center">
                    <div className="flex">
                      <Image
                        alt="Not found"
                        height={50}
                        src={noResult}
                        className="inline mr-5 -mt-2"
                      />
                      <span className="text-red-500">
                        No photos were found for the current filters or page
                        selected. Please change the filter options to find
                        results or go back in pagination.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap w-full justify-start items-center">
                    {
                      //Skeleton / progress indicator when fetching data
                      Array.from({ length: 25 }, (_, i) => i + 1).map((val) => (
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
                      ))
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGrid;
