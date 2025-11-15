import React, { useState } from "react";
import PricingPlans from "./components/ui/PricingPlans";
import Accordion from "./components/ui/Accordion";
import ButtonArrow from "./components/ui/ButtonArrow";
import Button from "./components/ui/Button";
import Drawer from "./components/ui/Drawer";
import { Tabs, TabsList, TabsTrigger, TabsContent, Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/Tabs';
import { useToast } from "../src/components/ui/ToastProvider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import AlertDialog from "@/components/ui/AlertDialog"
import Calendar from "./components/ui/Calendar";
import ComboBox from "./components/ui/Combobox";
import DataTable from "./components/ui/DataTable";
import LoginCard from "./components/ui/LoginCard";
import CommandPalette from "./components/ui/CommandPalette";
import DatePicker from "./components/ui/DatePicker";
import Pagination from "./components/ui/Pagination";
import DropdownMenu from "./components/ui/DropdownMenu";
import MenuBar from "./components/ui/MenuBar";
import Form from "./components/ui/FormExample";
import NativeSelect from "./components/ui/NativeSelect";
import Popover from "./components/ui/Popover";
import Sidebar from "./components/ui/Sidebar";
import Switch from "./components/ui/Switch";
import Tooltip from "./components/ui/Tooltip";
import { Info, User } from "lucide-react";
import { ToggleGroupItem, ToggleGroupRoot } from "./components/ui/ToggleGroup";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "./components/ui/Alert";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, StatusAvatar } from "./components/ui/Avatar";
import Navbar from "./components/ui/Navbar";


export default function App() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isCmdOpen, setCmdOpen] = useState(false);
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);
  const toast = useToast();
  const [tab, setTab] = useState(0);
  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Role", accessor: "role" },
  ];

  const data = [
    { name: "John Doe", email: "john@mail.com", role: "Admin" },
    { name: "Sarah Smith", email: "sarah@mail.com", role: "Editor" },
    { name: "Alex Ray", email: "alex@mail.com", role: "Viewer" },
  ];
  const commandItems = [
    { label: "Dashboard", action: () => { }, shortcut: "D" },
    { label: "Settings", action: () => { }, shortcut: "S" },
  ];
  const plans = [
    {
      title: "Hobby",
      price: 99,
      highlighted: false,
      features: [
        "Access to basic analytics reports",
        "Up to 10,000 data points per month",
        "Email support",
        "Community forum access",
        "Cancel anytime",
      ],
      ctaText: 'Get Started'
    },
    {
      title: "Promise",
      price: 299,
      highlighted: true,
      features: [
        "Access to basic analytics reports",
        "Up to 10,000 data points per month",
        "Email support",
        "Community forum access",
        "Cancel anytime",
        "Advanced analytics access",
        "Community forum access",
      ],
      ctaText: 'Get Started'
    },
    {
      title: "Pro",
      price: 199,
      highlighted: false,
      features: [
        "Access to basic analytics reports",
        "Up to 10,000 data points per month",
        "Email support",
        "Community forum access",
        "Cancel anytime",
      ],
      ctaText: 'Get Started'
    },
  ];
  const faqItems = [
    {
      title: "What is the purpose of this website?",
      content:
        "This website provides information about our services, goals, and team. It’s designed to help users learn more about our work and connect with us easily."
    },
    {
      title: "How can I contact support?",
      content:
        "You can reach our support team via the contact form on the website or email us directly at support@example.com."
    },
    {
      title: "Is my data secure?",
      content:
        "Yes, we use end-to-end encryption and adhere to strict data privacy policies to ensure your information is safe."
    },
    {
      title: "Can I contribute to the project?",
      content:
        "Absolutely! We’re open to collaborations and community contributions. Visit the ‘Contribute’ section for details."
    }
  ];

  return (
    <>

     <Navbar active={tab} onChange={setTab} />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PricingPlans plans={plans} />
      <Accordion items={faqItems}></Accordion>
      <div className="flex w-full justify-center  item-center gap-4 mt-4">
        flat buttons
        <div className="space-y-6">
          <Button text="Get Started" />
          <Button text="Get Started" highlighted={false} />
        </div>
        arrow buttons
        <div className="space-y-6">
          <ButtonArrow text="Get Started" />
          <ButtonArrow text="Learn More" highlighted={false} />
        </div>


      </div>
      <div className="h-full w-full my-8 flex items-center justify-center text-white">
        <Button text="Delete File" onClick={() => setOpen(true)} />
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          title="Delete this file?"
          description="This action cannot be undone. Are you sure you want to permanently delete this file?"
          confirmText="Yes, Delete"
          cancelText="Cancel"
          highlighted={false}
          onConfirm={() => {
            alert("File deleted!")
            setOpen(false)
          }}
        />
      </div>
      <ComboBox
        label="Choose Category"
        options={["Design", "Development", "Marketing", "Finance", "Support"]}
        value={value}
        onChange={setValue}
      />
      <Calendar />
      <div className="p-20">
        <DataTable columns={columns} data={data} />
      </div>
      <LoginCard
        title="Login"
        subtitle="Enter your credentials"
        onSubmit={(data) => console.log(data)}
      />
      <MenuBar
        menus={[
          {
            label: "File",
            items: [
              { label: "New File", action: () => console.log("New File") },
              { label: "Open", action: () => console.log("Open") },
              { label: "Save", action: () => console.log("Save") },
            ],
          },
          {
            label: "Edit",
            items: [
              { label: "Undo", action: () => console.log("Undo") },
              { label: "Redo", action: () => console.log("Redo") },
              { label: "Copy", action: () => console.log("Copy") },
            ],
          },
          {
            label: "View",
            items: [
              { label: "Zoom In", action: () => console.log("Zoom In") },
              { label: "Zoom Out", action: () => console.log("Zoom Out") },
            ],
          },
          {
            label: "Profiles",
            items: [
              { label: "User 1", action: () => { } },
              { label: "User 2", action: () => { } },
            ],
          },
        ]}
      />
      {/* open with crt + k */}
      <CommandPalette
        isCommandOpen={isCmdOpen}
        openCommand={() => setCmdOpen(true)}
        closeCommand={() => setCmdOpen(false)}
        commandItems={commandItems}
      />
      <DatePicker value={selected} onChange={(d) => setSelected(d)} />
      <div className="p-10">
        <Button text="Open Drawer" highlighted={false} onClick={() => setDrawerVisible(true)} />

        <Drawer
          drawerVisible={drawerVisible}
          hideDrawer={() => setDrawerVisible(false)}
          side="right"
        >
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <p className="text-gray-600">Your drawer content goes here...</p>
        </Drawer>
        <Pagination
          totalPages={12}
          currentPage={page}
          onPageChange={setPage}
          highlighted={false}
        />
      </div>
      <DropdownMenu
        triggerLabel="Dropdown"
        highlighted={false}
        items={[
          { label: "Profile", action: () => console.log("Profile") },
          { label: "Settings", action: () => console.log("Settings") },
          { label: "Logout", action: () => console.log("Logout") },
        ]}
      />

      <Form
        title="Create Account"
        subtitle="Fill the details below"
        submitLabel="Register"
        fields={[
          { name: "name", label: "Full Name", type: "text", placeholder: "Enter name" },
          { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
          { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
        ]}
        onSubmit={(data) => console.log("Form submitted:", data)}
      />
      <Switch checked={enabled} onChange={setEnabled} />

      <NativeSelect
        label="Native select"
        value={selected}
        onChange={(v) => setSelected(v)}
        highlighted={false}
        options={[
          { label: "Option One", value: "one" },
          { label: "Option Two", value: "two" },
          { label: "Option Three", value: "three" },
        ]}
      />
      <Popover
        triggerLabel="Open Popover"
        highlighted={false}
        align="right"
        width="w-72"
      >
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-gray-800">Popover Title</h3>

          <p className="text-xs text-gray-600 leading-relaxed">
            This is a reusable popover component following the same theme as your
            dropdown and select component.
          </p>

          <button className="px-3 py-2 text-sm rounded-lg bg-[#ff6b2b]/20 text-[#ff5b1a]">
            Action Button
          </button>
        </div>
      </Popover>
      <Tooltip label="This is a tooltip" placement="top">
        <button className="cursor-pointer text-gray-700 mx-6">
          <Info size={22} />
        </button>
      </Tooltip>
      <Sidebar width="300px">
        <h2 className="text-xl font-semibold mb-4">Sidebar</h2>

        <ul className="space-y-3">
          <li className=" cursor-pointer hover:bg-[#ff8547]/20 p-2 px-3 rounded-lg
                    hover:text-[#ff5b1a]">Dashboard</li>
          <li className=" cursor-pointer hover:bg-[#ff8547]/20 p-2 px-3 rounded-lg
                    hover:text-[#ff5b1a]">Projects</li>
          <li className=" cursor-pointer hover:bg-[#ff8547]/20 p-2 px-3 rounded-lg
                    hover:text-[#ff5b1a]">Settings</li>
          <li className=" cursor-pointer hover:bg-[#ff8547]/20 p-2 px-3 rounded-lg
                    hover:text-[#ff5b1a]">Logout</li>
        </ul>
      </Sidebar>

      <button
        onClick={() => toast.show("File uploaded successfully!")}
        className="px-4 py-2 mt-6 bg-black/10 rounded-lg"
      >
        Show Toast
      </button>
      <ToggleGroupRoot value={value} onValueChange={setValue}>
        <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
      </ToggleGroupRoot>

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
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Your card content here */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Profile Info</h4>
                  <p className="text-sm text-gray-600">Update your information</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your subscription and payments</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Billing content */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Enhance your account security</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Security content */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This is an informational alert using your custom theme.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <div className="flex items-center justify-between">
          <div>
            <AlertTitle>Unsaved Changes</AlertTitle>
            <AlertDescription>
              You have unsaved changes. Do you want to save them?
            </AlertDescription>
          </div>
          <div className="flex gap-2 ml-4">
            <AlertAction variant="primary">Save</AlertAction>
            <AlertAction variant="default">Discard</AlertAction>
          </div>
        </div>
      </Alert>
      <Avatar>
  <AvatarImage src="https://example.com/avatar.jpg" />
  <AvatarFallback delayMs={600}>JD</AvatarFallback>
</Avatar>
<div className="flex gap-4 my-2">
  <StatusAvatar status="online" fallback="ON" /> online
  <StatusAvatar status="away" fallback="AW" /> away
  <StatusAvatar status="busy" fallback="BS" /> busy
  <StatusAvatar status="offline" fallback="OF" /> offline
</div>
<AvatarGroup max={3}>
  <Avatar src="avatar1.jpg" />
  <Avatar src="avatar2.jpg" />
  <Avatar src="avatar3.jpg" />
  <Avatar src="avatar4.jpg" /> 
</AvatarGroup>
    </>
  )
}




