import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "no-discount",
            label: "No-Discount",
          },
          {
            value: "with-discount",
            label: "With-discount",
          },
        ]}
      />
      <SortBy
        options={[
          {
            value: "name-asc",
            label: "Sort-By-Name(A-Z)",
          },
          {
            value: "name-desc",
            label: "Sort-By-Name(Z-A)",
          },
          {
            value: "regularPrice-desc",
            label: "Sort-By-Price(Low-High)",
          },
          {
            value: "regularPrice-asc",
            label: "Sort-By-Price(High-Low)",
          },
          {
            value: "guestCapacity-asc",
            label: "Sort-By-Capacity(max-min)",
          },
          {
            value: "guestCapacity-desc",
            label: "Sort-By-Capacity(min-max)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
