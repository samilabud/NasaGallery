import { useState } from "react";
import Image from "next/image";
import noResult from "../images/no-results.svg";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import spinnerLoading from "../images/spinner-loading.gif";

const ImageGrid = ({ photos, isLoading }) => {
  const shouldShowPhotos = !isLoading && photos && photos.length > 0;
  const shouldShowNotFoundError = !isLoading && photos && photos.length <= 0;
  const [open, setOpen] = useState(false);
  const [currentImageOpened, setCurrentImageOpened] = useState("");
  const handleImageOpened = (currentSrc) => {
    setCurrentImageOpened(currentSrc);
    setOpen(true);
  };
  return (
    <>
      {shouldShowPhotos ? (
        <div
          data-testid="gallery-container"
          className="flex flex-wrap mb-5 mt-6"
        >
          <div className="mb-6 w-full">
            <div className="flex flex-col bg-clip-border rounded-[.95rem] border border-stone-200 bg-white shadow-md">
              <div className="flex py-8">
                <div className="flex flex-wrap justify-start items-center">
                  <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    index={currentImageOpened}
                    slides={photos.map((photo) => ({ src: photo.img_src }))}
                  />
                  {photos.map((photo, idx) => (
                    <div
                      className="flex flex-col w-40 lg:w-52 justify-center items-center mb-6"
                      key={photo.id}
                    >
                      <div
                        className="rounded-[.95rem] shadow-lg w-[130px] lg:w-[150px] h-[130px] lg:h-[150px] transition-all duration-1000 ease-in-out"
                        style={{
                          backgroundImage: `url(${spinnerLoading.src})`,
                          backgroundSize: "cover",
                        }}
                      >
                        <Image
                          width={50}
                          height={50}
                          alt="Mars photo"
                          className="transition-all duration-1000 ease-in-out hover:scale-110 inline-block shrink-0 rounded-[.95rem] w-[130px] lg:w-[150px] h-[130px] lg:h-[150px]"
                          src={photo.img_src}
                          onClick={() => handleImageOpened(idx)}
                          quality={40}
                          unoptimized
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
          className={`flex flex-wrap mb-2 mt-6`}
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
                  <div className="flex flex-wrap w-full justify-start items-center ml-6">
                    {
                      //Skeleton / progress indicator when fetching data
                      Array.from({ length: 15 }, (_, i) => i + 1).map((val) => (
                        <div className="w-40 lg:w-52" key={val}>
                          <div className="max-w-sm rounded overflow-hidden animate-pulse w-36 lg:w-40">
                            <div className="h-36 lg:h-40 rounded bg-gray-300"></div>
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
