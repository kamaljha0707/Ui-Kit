import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const Avatar = React.forwardRef(({
  className = "",
  size = "default",
  src,
  alt = "Avatar",
  fallback,
  ...props
}, ref) => {
  const [imageError, setImageError] = React.useState(false);

  const sizes = {
    sm: "w-8 h-8",
    default: "w-10 h-10", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
      }}
      className={`
        rounded-lg p-1
        bg-linear-to-b from-[#DBDBDB] to-[#595959]/40
        ${sizes[size]} ${className}
      `}
      {...props}
    >
      <div
        className={`
          w-full h-full rounded-lg cursor-pointer
          bg-linear-to-b from-white to-gray-50
          border border-[#ffffff40]
          shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
          overflow-hidden flex items-center justify-center
          relative
        `}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-lg"
            onError={handleImageError}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full rounded-lg">
            {fallback || <User className="w-1/2 h-1/2 text-gray-700" />}
          </div>
        )}
      </div>
    </motion.div>
  );
});

Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({
  className = "",
  src,
  alt = "Avatar",
  ...props
}, ref) => {
  const [error, setError] = React.useState(false);

  if (error) return null;

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`w-full h-full object-cover rounded-lg ${className}`}
      onError={() => setError(true)}
      {...props}
    />
  );
});

AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({
  className = "",
  children,
  delayMs = 0,
  ...props
}, ref) => {
  const [show, setShow] = React.useState(delayMs === 0);

  React.useEffect(() => {
    if (delayMs > 0) {
      const timer = setTimeout(() => setShow(true), delayMs);
      return () => clearTimeout(timer);
    }
  }, [delayMs]);

  if (!show) return null;

  return (
    <div
      ref={ref}
      className={`
        w-full h-full rounded-lg flex items-center justify-center
        bg-linear-to-b from-white to-gray-50
        text-sm font-medium text-gray-800
        ${className}
      `}
      {...props}
    >
      {children || <User className="w-1/2 h-1/2 text-gray-700" />}
    </div>
  );
});

AvatarFallback.displayName = "AvatarFallback";

// Avatar Group Component
const AvatarGroup = React.forwardRef(({
  className = "",
  children,
  max = 5,
  ...props
}, ref) => {
  const avatars = React.Children.toArray(children);
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div
      ref={ref}
      className={`flex -space-x-2 ${className}`}
      {...props}
    >
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className="relative  rounded-lg">
          {React.cloneElement(avatar, {
            className: "ring-0"
          })}
        </div>
      ))}
      
      {remainingCount > 0 && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          animate={{
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          }}
          className="rounded-lg p-1 bg-linear-to-b from-[#DBDBDB] to-[#595959]/40"
        >
          <div
            className="
              w-8 h-8 rounded-lg
              bg-linear-to-b from-white to-gray-50
              border border-[#ffffff40]
              shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
              flex items-center justify-center cursor-pointer
              text-xs font-medium text-gray-800
            "
          >
            +{remainingCount}
          </div>
        </motion.div>
      )}
    </div>
  );
});

AvatarGroup.displayName = "AvatarGroup";

// Status Avatar Component
const StatusAvatar = React.forwardRef(({
  status = "online",
  ...props
}, ref) => {
  const statusConfig = {
    online: {
      color: "bg-green-500",
      ring: "ring-2 ring-white"
    },
    offline: {
      color: "bg-gray-400", 
      ring: "ring-2 ring-white"
    },
    away: {
      color: "bg-amber-500",
      ring: "ring-2 ring-white"
    },
    busy: {
      color: "bg-red-500",
      ring: "ring-2 ring-white"
    }
  };

  const { color, ring } = statusConfig[status];

  return (
    <div className="relative inline-block">
      <Avatar ref={ref} {...props} />
      <div
        className={`
          absolute bottom-0 right-0 
          w-3 h-3 rounded-lg ${color} ${ring}
        `}
      />
    </div>
  );
});

StatusAvatar.displayName = "StatusAvatar";

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  StatusAvatar
};

export default Avatar;