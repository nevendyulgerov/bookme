import { type FC, useCallback, useState } from "react";
import { Button, Dialog, Portal } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { toaster } from "@/common/components/ui/toaster/toaster";
import { useAppDispatch } from "@/store/store";
import type { BookingModel } from "@/store/slices/bookings/types";
import { deleteBooking } from "@/store/slices/bookings";
import { useUserBookings } from "@/features/bookings/hooks/use-user-bookings";

interface DeleteBookingDialogProps {
  booking: BookingModel;
  isActive: boolean;
  onChangeActive: (isActive: boolean) => void;
}

export const DeleteBookingDialog: FC<DeleteBookingDialogProps> = (props) => {
  const { booking, isActive, onChangeActive } = props;
  const userBookings = useUserBookings();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onConfirm = useCallback(async () => {
    setLoading(true);

    try {
      dispatch(deleteBooking({ booking }));
      onChangeActive(false);

      const pathname = userBookings.length > 1 ? "/bookings" : "/properties";
      navigate(pathname);
      setLoading(false);
    } catch {
      toaster.create({
        title:
          "Error while deleting the booking. Please try again or contact support.",
        type: "error",
      });
      setLoading(false);
    }
  }, [booking, dispatch, navigate, onChangeActive, userBookings.length]);

  return (
    <Dialog.Root
      placement="center"
      closeOnEscape={false}
      closeOnInteractOutside={false}
      lazyMount
      open={isActive}
      onOpenChange={(e) => onChangeActive(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                Are you sure you want to delete this booking?
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                variant="solid"
                colorPalette="orange"
                loading={isLoading}
                loadingText="Deleting booking..."
                onClick={onConfirm}
              >
                Delete Booking
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
