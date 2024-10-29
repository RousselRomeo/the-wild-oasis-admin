import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    // mutationFn: (newCabin) => createCabins(newCabin), same as below
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({ queryKey: ["settings"] }); //invalidatequery refetch cabins data ,this action causes the component to rerender
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
