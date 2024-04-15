import { CustomTable } from "@/components/CustomTable";
import UserAddForm from "@/components/Users/UserAddForm";
import UserNav from "@/components/Users/UserNav";
import React from "react";

const UsersPage = () => {
  return (
    <div className="container mx-auto">
      <UserNav />
      <UserAddForm />
      <CustomTable />
    </div>
  );
};

export default UsersPage;
