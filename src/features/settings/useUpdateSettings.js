import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateApi } from "../../services/apiSettings";

function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateMutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateApi,
    onSuccess: () => {
      toast.success("cabin updated succesfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateMutate, isUpdating };
}

export default useUpdateSettings;
