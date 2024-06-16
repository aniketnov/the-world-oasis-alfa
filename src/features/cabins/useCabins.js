import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabin";

function useCabins() {
  const {
    isLoading,
    error,
    data: cabins,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabin,
  });

  return { isLoading, cabins, error };
}

export default useCabins;
