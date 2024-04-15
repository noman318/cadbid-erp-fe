"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Button } from "../ui/button";
import { HiOutlinePlus } from "react-icons/hi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateUserMutation } from "@/slices/userApiSlice";
import CustomDropdown from "../CustomDropdown";
import { TfiReload } from "react-icons/tfi";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  user_type: z.string(),
  user_id: z.string(),
  mobile: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
  con_password: z.string().min(5),
  level: z.string(),
  otp_auth: z.string(),
  company_id: z.string(),
});

const UserNav = () => {
  const [createUser, { isLoading, isError, isSuccess }] =
    useCreateUserMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      user_type: "",
      user_id: "",
      mobile: "",
      email: "",
      password: "",
      con_password: "",
      level: "",
      otp_auth: "",
      company_id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    // console.log("values", values);
    if (values.password !== values.con_password) {
      alert("Password Mismatch");
    }
    const {
      name,
      user_id,
      user_type,
      mobile,
      email,
      password,
      level,
      otp_auth,
      company_id,
    } = values;
    const newValues = {
      name,
      user_id,
      user_type,
      mobile,
      email,
      password,
      level,
      company_id,
      otp_auth,
    };
    // console.log("newValues", newValues);
    try {
      await createUser(newValues);
    } catch (error) {
      console.log("error", error);
      alert(error);
    }
  }

  return (
    <nav className="flex items-center gap-1 justify-between mt-3 max-w-[90rem] mx-auto">
      <div className="flex items-center gap-1">
        <CiMenuBurger />
        <h1 className="text-xl">User</h1>
      </div>
      <div className="max-w-lg flex items-center">
        <CustomDropdown />
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <HiOutlinePlus className="mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className=" w-full">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Customer Name"
                          className=" placeholder:font-thin"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          className=" placeholder:font-thin"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input className="" type="email" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="user_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User ID/Email</FormLabel>
                        <FormControl>
                          <Input className="" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="otp_auth"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>OTP Authentication</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal whitespace-nowrap">
                                Yes{" "}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal whitespace-nowrap">
                                No
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input className="" type="password" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="con_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input className="" type="password" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="user_type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>User Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="employee" />
                              </FormControl>
                              <FormLabel className="font-normal whitespace-nowrap">
                                Employee{" "}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="associate" />
                              </FormControl>
                              <FormLabel className="font-normal whitespace-nowrap">
                                Associate
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Level</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="normal" />
                              </FormControl>
                              <FormLabel className="font-normal whitespace-nowrap">
                                Normal{" "}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="admin" />
                              </FormControl>
                              <FormLabel className="font-normal whitespace-nowrap">
                                Admin
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="mt-6" disabled={isLoading}>
                  Add User
                </Button>
                {/* <Button type="submit">Submit</Button> */}
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default UserNav;
