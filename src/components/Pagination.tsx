import { useState } from "react";

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

export function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
}: IPaginationProps) {
  const [inputPage, setInputPage] = useState<number>(1); // State for page input

  const handlePageChangeWrapper = (pageNumber: number) => {
    setInputPage(pageNumber); // Update input page when changing page
    handlePageChange(pageNumber);
  };
  // Handle input submit
  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPage >= 1 && inputPage <= totalPages) {
      handlePageChangeWrapper(inputPage);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Allow only numbers
      setInputPage(Number(value));
    }
  };

  return (
    <div className="pagination">
      <div>
        <button
          onClick={() => handlePageChangeWrapper(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: Math.min(3, totalPages) }, (_, index) => {
          const pageNumber = Math.max(1, currentPage + index); // Show 5 pages centered around current page
          return (
            pageNumber <= totalPages && (
              <button
                key={pageNumber}
                onClick={() => handlePageChangeWrapper(pageNumber)}
                disabled={currentPage === pageNumber}
              >
                {pageNumber}
              </button>
            )
          );
        })}

        <button
          onClick={() => handlePageChangeWrapper(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="pagination-search">
        <form
          onSubmit={handleInputSubmit}
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="number"
            value={inputPage}
            onChange={handleInputChange}
            min={1}
            max={totalPages}
            style={{
              marginRight: "10px",
              width: "60px",
              height: "25px",
              fontSize: "18px",
            }}
          />
          <button type="submit">Go</button>
        </form>

        <span style={{ margin: "0 10px" }}>of {totalPages} pages</span>
      </div>
    </div>
  );
}
