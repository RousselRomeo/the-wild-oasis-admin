import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    // mutationFn: (newCabin) => createCabins(newCabin), same as below
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] }); //invalidatequery refetch cabins data ,this action causes the component to rerender
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
