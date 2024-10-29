import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    // mutationFn: (id) => deleteBooking(id), short form below since we are passing id as argument and returning id
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        //invalide data from cache means it will be refetched
        query: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
