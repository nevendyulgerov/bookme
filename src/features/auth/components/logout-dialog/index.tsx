import { type FC, useCallback, useState } from "react";
import { Button, Dialog, Portal } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { toaster } from "@/common/components/ui/toaster/toaster";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/store/slices/user";

interface LogoutProps {
  isActive: boolean;
  onChangeActive: (isActive: boolean) => void;
}

export const LogoutDialog: FC<LogoutProps> = (props) => {
  const { isActive, onChangeActive } = props;
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onConfirm = useCallback(async () => {
    setLoading(true);

    try {
      dispatch(logout());
      onChangeActive(false);
      navigate("/login");
      setLoading(false);
    } catch {
      toaster.create({
        title: "Error while logging out. Please try again or contact support.",
        type: "error",
      });
      setLoading(false);
    }
  }, [dispatch, navigate, onChangeActive]);

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
              <Dialog.Title>Are you sure you want to log out?</Dialog.Title>
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
                loadingText="Logging out..."
                onClick={onConfirm}
              >
                Log Out
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
