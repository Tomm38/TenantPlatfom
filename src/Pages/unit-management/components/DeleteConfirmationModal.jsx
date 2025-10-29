import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, unitNumber, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Delete Unit
            </h3>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-foreground mb-2">
            Are you sure you want to delete <strong>Unit {unitNumber}</strong>?
          </p>
          <p className="text-sm text-muted-foreground">
            All associated data including tenant information, lease history, and payment records will be permanently removed.
          </p>
        </div>

        <div className="flex items-center justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={isDeleting}
            iconName="Trash2"
            iconPosition="left"
          >
            {isDeleting ? 'Deleting...' : 'Delete Unit'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;