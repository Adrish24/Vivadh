import SortBy from "./SortBy";
import View from "./View";

const FilterPost = () => {
  return (
    <div className="flex border-b border-neutral-600">
      {/* Sory by */}
      <SortBy />

      {/* View */}
      <View />

      <div className="w-full" />
    </div>
  );
};

export default FilterPost;
