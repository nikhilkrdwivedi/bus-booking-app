import { getClassName } from "@utils/classes";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const containerClass =
  "flex items-center justify-between bg-gray-200 dark:bg-gray-600 px-4 py-1 sm:px-6 rounded-md text-gray-600 dark:text-gray-200";
const paginationClass =
  "relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 text-gray-600 dark:text-gray-200";
const mobileDevicePaginationClass =
  "relative inline-flex items-center rounded-md border border-gray-300 bg-gray-200 dark:bg-gray-600 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-200 hover:bg-gray-50";
const prevClass =
  "relative inline-flex items-center rounded-l-md border border-gray-300 bg-gray-200 dark:bg-gray-600 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20";
const nextClass =
  "relative inline-flex items-center rounded-r-md border border-gray-300 bg-gray-200 dark:bg-gray-600 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const TRIPLE_DOT = "...";
const DIRECTION_ARRAY = ["LEFT", "RIGHT"];

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export default function Pagination({
  page,
  pages,
  perPage,
  total,
  showCount,
  onPageClick,
  className,
  pageNeighbours,
}: any) {
  //   const { t } = useTranslation();

  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= pages;
  console.log({ page, pages });
  function handlePageClick(e: any) {
    const {
      target: { value: targetPage },
    } = e;
    e.preventDefault();
    onPageClick(parseInt(targetPage, 10));
  }

  function handleMoveLeft() {
    onPageClick(page - pageNeighbours * 2 - 1);
  }

  function handleMoveRight() {
    onPageClick(page + pageNeighbours * 2 + 1);
  }

  // for Mobile device
  function clickNextPage() {
    if (page < pages) {
      onPageClick(page + 1);
    }
  }

  function clickPrevPage() {
    if (page > 1) {
      onPageClick(page - 1);
    }
  }
  // function getPaginationInfo() {
  //   let firstCount = (page - 1) * perPage + 1;
  //   let lastCount = (page - 1) * perPage + perPage;
  //   lastCount = lastCount < total ? lastCount : total;
  //   return {
  //     firstCount,
  //     lastCount,
  //     total,
  //   };
  // }
  function getFirstCount() {
    return (page - 1) * perPage + 1;
  }
  function getLastCount() {
    let lastCount = (page - 1) * perPage + perPage;
    lastCount = lastCount < total ? lastCount : total;
    return lastCount;
  }

  function fetchPageNumbers() {
    const totalPages = pages;
    const currentPage = page;
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pagesList = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pagesList = range(startPage, endPage);

      const pagesCount = pagesList.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pagesList = [leftSpillPage, ...extraPages, ...pagesList];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pagesList = [...pagesList, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pagesList = [leftSpillPage, ...pagesList, rightSpillPage];
      }

      return [1, ...pagesList, totalPages];
    }

    return range(1, totalPages);
  }

  const pagesArray = fetchPageNumbers();

  return (
    <div className={getClassName(containerClass, className)}>
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          className={getClassName(mobileDevicePaginationClass, {
            "cursor-not-allowed": page === 1,
            disabled: page === 1,
          })}
          disabled={page === 1}
          onClick={clickPrevPage}
        >
          {"PREVIOUS"}
        </button>
        <button
          className={getClassName(mobileDevicePaginationClass, {
            "cursor-not-allowed": page === pages,
            disabled: page === pages,
          })}
          disabled={page === pages}
          onClick={clickNextPage}
        >
          {"NEXT"}
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {showCount && total > 0 && (
          <div>
            <p className="text-sm">
              Showing {getFirstCount()} to {getLastCount()} of {total} results
              {/* <Trans
                i18nKey="PAGINATION_INFO"
                values={getPaginationInfo()}
                components={[
                  <span className="font-bold" />,
                  <span className="font-bold" />,
                  <span className="font-bold" />,
                ]}
              /> */}
            </p>
          </div>
        )}
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              className={getClassName(prevClass, {
                "cursor-not-allowed": isPrevDisabled,
                disabled: isPrevDisabled,
              })}
              disabled={isPrevDisabled}
              onClick={clickPrevPage}
            >
              <span className="sr-only">{"PREVIOUS"}</span>
              <BiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {pagesArray.map((currentPage) => {
              const selected = currentPage === page;
              if (currentPage === LEFT_PAGE) {
                return (
                  <button
                    key={currentPage}
                    value={LEFT_PAGE}
                    onClick={handleMoveLeft}
                    className={getClassName(paginationClass, {
                      "text-gray-500": !selected,
                      "bg-gray-200 dark:bg-gray-600": !selected,
                      "hover:bg-gray-50": !selected,
                      "border-gray-300": !selected,
                    })}
                  >
                    {TRIPLE_DOT}
                  </button>
                );
              }

              if (currentPage === RIGHT_PAGE) {
                return (
                  <button
                    key={currentPage}
                    value={RIGHT_PAGE}
                    onClick={handleMoveRight}
                    className={getClassName(paginationClass, {
                      "text-gray-500": !selected,
                      "bg-gray-200 dark:bg-gray-600": !selected,
                      "hover:bg-gray-50": !selected,
                      "border-gray-300": !selected,
                    })}
                  >
                    {TRIPLE_DOT}
                  </button>
                );
              }

              if (!DIRECTION_ARRAY.includes(currentPage)) {
                return (
                  <button
                    key={currentPage}
                    value={currentPage}
                    onClick={handlePageClick}
                    className={getClassName(paginationClass, {
                      "text-gray-600 dark:text-gray-200": !selected,
                      "bg-gray-200 dark:bg-gray-600": !selected,
                      "hover:bg-gray-50": !selected,
                      // "border-gray-600": !selected,
                      "!text-gray-600": selected,
                      "bg-gray-400 dark:bg-gray-200": selected,
                      // "border-gray-600": selected,
                      "z-10": selected,
                    })}
                  >
                    {currentPage}
                  </button>
                );
              }
            })}

            <button
              className={getClassName(nextClass, {
                "cursor-not-allowed": isNextDisabled,
                disabled: isNextDisabled,
              })}
              disabled={isNextDisabled}
              onClick={clickNextPage}
            >
              <span className="sr-only">{"NEXT"}</span>
              <BiChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
