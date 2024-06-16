import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabin";
import toast from "react-hot-toast";

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("deleted cabin succesfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isLoading, deleteCabin };
}

export default useDeleteCabin;
