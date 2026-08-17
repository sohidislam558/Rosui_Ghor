import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}

export function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  loading = false,
}: DeleteConfirmationModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} loading={loading}>
            Delete Permanently
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-destructive-soft text-destructive">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{message}</p>
      </div>
    </Modal>
  );
}
