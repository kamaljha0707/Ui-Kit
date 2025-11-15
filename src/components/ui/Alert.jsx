import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info,
  X
} from "lucide-react";

const Alert = React.forwardRef(({
  className = "",
  variant = "default",
  children,
  ...props
}, ref) => {
  const variants = {
    default: {
      bg: "bg-linear-to-b from-[#D8D8D8] to-[#5A5A5A]/40",
      innerBg: "bg-linear-to-b from-white to-gray-50",
      border: "border-[#ffffff40]",
      text: "text-gray-800"
    },
    primary: {
      bg: "bg-linear-to-b from-[#ff6b2b]/20 to-[#ff6b2b]/10",
      innerBg: "bg-linear-to-b from-white to-orange-50",
      border: "border-[#ff6b2b]/20",
      text: "text-gray-800"
    },
    success: {
      bg: "bg-linear-to-b from-[#10b981]/20 to-[#10b981]/10",
      innerBg: "bg-linear-to-b from-white to-green-50",
      border: "border-[#10b981]/20",
      text: "text-gray-800"
    },
    warning: {
      bg: "bg-linear-to-b from-[#f59e0b]/20 to-[#f59e0b]/10",
      innerBg: "bg-linear-to-b from-white to-amber-50",
      border: "border-[#f59e0b]/20",
      text: "text-gray-800"
    },
    error: {
      bg: "bg-linear-to-b from-[#ef4444]/20 to-[#ef4444]/10",
      innerBg: "bg-linear-to-b from-white to-red-50",
      border: "border-[#ef4444]/20",
      text: "text-gray-800"
    }
  };

  const icons = {
    default: Info,
    primary: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle
  };

  const iconColors = {
    default: "text-gray-600",
    primary: "text-[#ff6b2b]",
    success: "text-green-600",
    warning: "text-amber-600",
    error: "text-red-600"
  };

  const IconComponent = icons[variant];
  const variantStyle = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`rounded-xl p-1 ${variantStyle.bg} ${className}`}
      {...props}
    >
      <div
        className={`
          rounded-lg p-4 ${variantStyle.innerBg}
          border ${variantStyle.border}
          shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
          backdrop-blur-sm
        `}
      >
        <div className="flex items-start gap-3">
          <IconComponent className={`w-5 h-5 mt-0.5 shrink-0 ${iconColors[variant]}`} />
          <div className={`flex-1 text-sm ${variantStyle.text}`}>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ 
  className = "", 
  children, 
  ...props 
}, ref) => (
  <h5
    ref={ref}
    className={`text-sm font-semibold mb-1 ${className}`}
    {...props}
  >
    {children}
  </h5>
));

AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ 
  className = "", 
  children, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={`text-sm leading-relaxed ${className}`}
    {...props}
  >
    {children}
  </div>
));

AlertDescription.displayName = "AlertDescription";

const AlertAction = React.forwardRef(({
  className = "",
  children,
  variant = "default",
  ...props
}, ref) => {
  const variantStyles = {
    default: "bg-linear-to-b from-[#D8D8D8] to-[#5A5A5A]/40",
    primary: "bg-linear-to-b from-[#ff6b2b]/70 to-[#ff6b2b]/80",
    ghost: "bg-transparent p-0"
  };

  return (
    <motion.div
      animate={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}
      className={`rounded-lg p-0.5 ${variantStyles[variant]} ${className}`}
    >
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={`
          rounded-md px-3 py-1.5 text-xs font-medium
          bg-linear-to-b from-white to-gray-50
          border border-[#ffffff40]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]
          transition-all cursor-pointer
          ${variant === "ghost" ? "bg-transparent border-transparent shadow-none" : ""}
        `}
        {...props}
      >
        {children}
      </motion.button>
    </motion.div>
  );
});

AlertAction.displayName = "AlertAction";

const AlertClose = React.forwardRef(({
  className = "",
  onClose,
  ...props
}, ref) => (
  <motion.div
    animate={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}
    className={`rounded-lg p-0.5 bg-linear-to-b from-[#D8D8D8] to-[#5A5A5A]/40 ${className}`}
  >
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.9 }}
      onClick={onClose}
      className="
        w-6 h-6 rounded-md flex items-center justify-center
        bg-linear-to-b from-white to-gray-50
        border border-[#ffffff40]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]
        transition-all cursor-pointer hover:bg-gray-100
      "
      {...props}
    >
      <X size={14} className="text-gray-700" />
    </motion.button>
  </motion.div>
));

AlertClose.displayName = "AlertClose";

// Alert with actions component
const AlertWithActions = React.forwardRef(({
  variant = "default",
  title,
  description,
  actions,
  onClose,
  className = "",
  ...props
}, ref) => {
  return (
    <Alert ref={ref} variant={variant} className={className} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {title && <AlertTitle>{title}</AlertTitle>}
          {description && <AlertDescription>{description}</AlertDescription>}
        </div>
        {(actions || onClose) && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
            {onClose && <AlertClose onClose={onClose} />}
          </div>
        )}
      </div>
    </Alert>
  );
});

AlertWithActions.displayName = "AlertWithActions";


export function AlertDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert with some important information.
        </AlertDescription>
      </Alert>

      <Alert variant="primary">
        <AlertTitle>Primary Alert</AlertTitle>
        <AlertDescription>
          This is a primary alert with your theme color.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your action has been completed successfully.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This action requires your attention.
        </AlertDescription>
      </Alert>

      <Alert variant="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function AlertWithActionsDemo() {
  const handleClose = () => {
    console.log('Alert closed');
  };

  return (
    <div className="space-y-4 max-w-md">
      <AlertWithActions
        variant="primary"
        title="Update Available"
        description="A new version of the app is available. Would you like to update now?"
        actions={
          <>
            <AlertAction variant="primary" className="text-xs">
              Update
            </AlertAction>
            <AlertAction variant="default" className="text-xs">
              Later
            </AlertAction>
          </>
        }
        onClose={handleClose}
      />

      <AlertWithActions
        variant="warning"
        title="Storage Almost Full"
        description="You've used 85% of your available storage. Upgrade to get more space."
        actions={
          <AlertAction variant="primary" className="text-xs">
            Upgrade
          </AlertAction>
        }
        onClose={handleClose}
      />
    </div>
  );
}

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
  AlertClose,
  AlertWithActions
};

export default Alert;