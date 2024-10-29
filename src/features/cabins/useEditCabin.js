import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // mutationFn: (newCabin) => createCabins(newCabin), same as below
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] }); //invalidatequery refetch cabins data ,this action causes the component to rerender
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
