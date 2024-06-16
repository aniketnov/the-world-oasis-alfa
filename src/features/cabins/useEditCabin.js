import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editMutate, isLoading: isEditing } = useMutation({
    mutationFn: ({ newcabinData, id }) => createCabin(newcabinData, id),
    onSuccess: () => {
      toast.success("cabin edit succesfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { editMutate, isEditing };
}

export default useEditCabin;
