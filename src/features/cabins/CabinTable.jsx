import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  // 1 filter
  const filterValue = searchParams.get("discount") || "all";

  let filterCabins;

  if (cabins) {
    if (filterValue === "all") filterCabins = cabins;
    if (filterValue === "no-discount")
      filterCabins = cabins.filter((cabin) => cabin.discount === 0);
    if (filterValue === "with-discount")
      filterCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2 . sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? -1 : 1;

  const sortedCabins = filterCabins
    ? [...filterCabins].sort((a, b) => {
        const valueA = a[field] !== undefined ? a[field] : "";
        const valueB = b[field] !== undefined ? b[field] : "";

        if (typeof valueA === "number" && typeof valueB === "number") {
          return (valueA - valueB) * modifier;
        } else {
          const stringA = valueA.toString().toLowerCase();
          const stringB = valueB.toString().toLowerCase();
          if (stringA < stringB) return -1 * modifier;
          if (stringA > stringB) return 1 * modifier;
          return 0;
        }
      })
    : [];

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource={cabins} />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
