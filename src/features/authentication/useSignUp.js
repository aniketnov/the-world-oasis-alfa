import { useMutation } from "@tanstack/react-query";
import { getSignUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: getSignUp,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account Successfully Created! Please verify the new account from the user's email address"
      );
    },
  });

  return { signUp, isLoading };
}
