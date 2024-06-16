import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

function useCreteCabin() {
  const queryClient = useQueryClient();
  const { mutate: creatMutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("created new cabin succesfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { creatMutate, isCreating };
}

export default useCreteCabin;
