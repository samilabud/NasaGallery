import Image from "next/image";
import rightArrowNavigation from "../images/right-arrow-nav.svg";
import leftArrowNavigation from "../images/left-arrow-nav.svg";

const MAX_PAGES_NUMBER = 3;

const Pagination = ({ currentPage, setCurrentPage, itIsTheLastPage }) => {
  const pages = itIsTheLastPage
    ? [currentPage]
    : Array.from({ length: MAX_PAGES_NUMBER }, (v, i) => i + currentPage);
  return (
    <div>
      <nav>
        <ul className="flex">
          <li>
            <button
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 disabled:hidden hover:bg-gray-100"
              aria-label="Previous"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <Image src={leftArrowNavigation} alt="Left arrow" height={20} />
            </button>
          </li>
          {pages.map((page, idx) => (
            <li key={`page-${idx}`}>
              <button
                className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full p-0 text-sm transition duration-150 ease-in-out ${
                  page === currentPage
                    ? "text-white shadow-md shadow-gray-500/20 bg-gradient-to-tr from-gray-600 to-gray-400"
                    : "text-blue-gray-500 hover:bg-gray-600 hover:text-white"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 disabled:hidden hover:bg-gray-100"
              disabled={itIsTheLastPage}
              onClick={() => setCurrentPage(currentPage + 1)}
              aria-label="Next"
            >
              <Image src={rightArrowNavigation} alt="Right arrow" height={20} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
