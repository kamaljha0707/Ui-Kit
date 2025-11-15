import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TabsContext = React.createContext();

// ---------------- Root ----------------
export function Tabs({ defaultValue, value, onValueChange, children, className = "" }) {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue);

  const changeTab = (val) => {
    setActiveTab(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab, changeTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

// ---------------- List ----------------
export function TabsList({ children, className = "" }) {
  return (
    <div
      className={`
        inline-flex rounded-xl p-1
        bg-linear-to-b from-[#D8D8D8] to-[#5A5A5A]/40
        border border-[#ffffff30]
        shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
        backdrop-blur-md
        ${className}
      `}
    >
      <div
        className="
          flex gap-1 p-1 rounded-lg 
          bg-linear-to-b from-white to-gray-50
          border border-[#ffffff40]
          shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
        "
      >
        {children}
      </div>
    </div>
  );
}

// ---------------- Trigger ----------------
export function TabsTrigger({ value, children, className = "" }) {
  const { activeTab, changeTab } = React.useContext(TabsContext);
  const selected = activeTab === value;

  return (
    <button
      onClick={() => changeTab(value)}
      className={`
        relative px-4 py-2 min-w-[90px]
        text-sm font-medium rounded-md select-none
        transition-all
        ${selected ? "text-gray-900" : "text-gray-600"}
        ${className}
      `}
    >
      {selected && (
        <motion.div
          layoutId="tabHighlight"
          className="
            absolute inset-0 rounded-md
            bg-linear-to-b from-white to-gray-100
            border border-[#ffffff60]
            shadow-[0_3px_6px_rgba(0,0,0,0.12)]
          "
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// ---------------- Content ----------------
export function TabsContent({ value, children, className = "" }) {
  const { activeTab } = React.useContext(TabsContext);

  return (
    <AnimatePresence mode="wait">
      {activeTab === value && (
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={`mt-4 w-fit ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------- Card Components ----------------
export function Card({ children, className = "" }) {
  return (
    <motion.div
      animate={{
        boxShadow: "0px 12px 30px rgba(0,0,0,0.25)",
      }}
      className="rounded-xl p-1 bg-linear-to-b from-[#D8D8D8] to-[#5A5A5A]/40"
    >
      <div
        className={`
          rounded-lg bg-linear-to-b from-white to-gray-50
          border border-[#ffffff40]
          shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
          backdrop-blur-sm p-6
          ${className}
        `}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-lg font-semibold text-gray-800 mb-2 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }) {
  return (
    <p className={`text-sm text-gray-600 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// ---------------- Usage Example ----------------
export function TabsWithCardsExample() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and personal information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Profile Information</h4>
              <p className="text-sm text-gray-600">Update your name, email, and profile picture</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Preferences</h4>
              <p className="text-sm text-gray-600">Customize your application preferences</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle>Billing & Plans</CardTitle>
            <CardDescription>
              View your current plan, billing history, and payment methods.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Current Plan</h4>
              <p className="text-sm text-gray-600">Pro Plan - $29/month</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Payment Method</h4>
              <p className="text-sm text-gray-600">Visa ending in 4242</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Billing History</h4>
              <p className="text-sm text-gray-600">View and download past invoices</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Enhance your account security with these options.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Password</h4>
              <p className="text-sm text-gray-600">Last changed 2 weeks ago</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Active Sessions</h4>
              <p className="text-sm text-gray-600">Manage your logged-in devices</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}