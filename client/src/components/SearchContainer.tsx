import { FC, FormEvent } from "react";
import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer: FC = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e: FormEvent) => {
    if (isLoading) return;
    handleChange({
      name: (e.target as HTMLInputElement).name,
      value: (e.target as HTMLInputElement).value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText="job status"
            list={["all", ...statusOptions]}
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText="job type"
            list={["all", ...jobTypeOptions]}
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText="sort"
            list={sortOptions}
            name="sort"
            value={sort}
            handleChange={handleSearch}
          />
          <button
            disabled={isLoading}
            className="btn btn-block btn-danger"
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
