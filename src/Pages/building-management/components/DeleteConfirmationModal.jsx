import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  buildingName, 
  isDeleting = false 
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg max-w-md w-full elevation-3">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Delete Building
                </h3>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-foreground mb-4">
              Are you sure you want to delete <strong>"{buildingName}"</strong>?
            </p>
            
            <div className="bg-error/5 border border-error/20 rounded-md p-4 mb-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-error font-medium mb-1">Warning:</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• All units in this building will be deleted</li>
                    <li>• Tenant assignments will be removed</li>
                    <li>• This action cannot be reversed</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Please make sure you have backed up any important data before proceeding.
            </p>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-border flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              loading={isDeleting}
              iconName="Trash2"
              iconPosition="left"
              className="flex-1"
            >
              Delete Building
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;