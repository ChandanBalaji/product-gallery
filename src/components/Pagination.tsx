interface IPaginationProps {
  totalPages: number;
  page: number;
  onChange: (pageNumber: number) => void;
}

export function Pagination({ totalPages, page, onChange }: IPaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div>
      {pageNumbers.map((number) => {
        return (
          <input
            type="button"
            key={number}
            onClick={() => onChange(number)}
            value={number}
          ></input>
        );
      })}
    </div>
  );
}
