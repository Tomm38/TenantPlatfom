import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmailVerificationModal = ({ isOpen, email, onClose, onResendEmail }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 elevation-3">
        <div className="text-center space-y-4">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Mail" size={32} className="text-success" />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground">Check Your Email</h3>
          
          {/* Message */}
          <div className="space-y-2">
            <p className="text-muted-foreground">
              We've sent a verification link to:
            </p>
            <p className="font-medium text-foreground bg-muted px-3 py-2 rounded-md">
              {email}
            </p>
            <p className="text-sm text-muted-foreground">
              Click the link in the email to verify your account and complete your registration.
            </p>
          </div>
          
          {/* Instructions */}
          <div className="bg-primary/5 border border-primary/20 rounded-md p-4 text-left">
            <h4 className="font-medium text-foreground mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2 text-primary" />
              Next Steps:
            </h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Check your email inbox (and spam folder)</li>
              <li>Click the verification link</li>
              <li>Return to sign in to your account</li>
            </ol>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              variant="outline"
              fullWidth
              onClick={onResendEmail}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Resend Verification Email
            </Button>
            
            <Button
              variant="default"
              fullWidth
              onClick={onClose}
            >
              Got it, thanks!
            </Button>
          </div>
          
          {/* Help Text */}
          <p className="text-xs text-muted-foreground">
            Didn't receive the email? Check your spam folder or contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;