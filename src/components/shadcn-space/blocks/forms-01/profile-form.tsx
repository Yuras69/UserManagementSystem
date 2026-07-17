"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance as mockapi } from "@/API/mockapi";

interface UserFormData {
  FirstName: string;
  LastName: string;
  Age: number | "";
  Email: string;
  PhoneNo: number | "";
  isVerified: boolean;
  createdAt: string;
}

const ProfileForm = () => {
  const [formData, setFormData] = useState<UserFormData>({
    FirstName: "",
    LastName: "",
    Age: "",
    Email: "",
    PhoneNo: "",
    isVerified: false,
    createdAt: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "Age" || name === "PhoneNo"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Convert empty values to proper types
      const submitData = {
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        Age: formData.Age === "" ? 0 : formData.Age,
        Email: formData.Email,
        PhoneNo: formData.PhoneNo === "" ? 0 : formData.PhoneNo,
        isVerified: formData.isVerified,
        createdAt: formData.createdAt,
      };

      const response = await mockapi.post("hasina", submitData);

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        // Reset form
        setFormData({
          FirstName: "",
          LastName: "",
          Age: "",
          Email: "",
          PhoneNo: "",
          isVerified: false,
          createdAt: new Date().toISOString().split("T")[0],
                 });
        console.log("User created successfully:", response.data);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create user"
      );
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-muted">
      <div className="max-w-3xl px-4 mx-auto">
        <Card className="p-0 w-full gap-0">
          <CardHeader className="gap-6 px-6 pt-6 border-b border-border pb-4">
            <h2 className="text-2xl font-bold text-foreground">Add New User</h2>
            <p className="text-sm text-muted-foreground">
              Fill in the form below to create a new user account
            </p>
          </CardHeader>

          <CardContent className="py-6 px-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-sm text-green-600">
                  User created successfully!
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="FirstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="FirstName"
                    name="FirstName"
                    type="text"
                    value={formData.FirstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                    className="h-10"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="LastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="LastName"
                    name="LastName"
                    type="text"
                    value={formData.LastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                    className="h-10"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="Age" className="text-sm font-medium">
                    Age
                  </Label>
                  <Input
                    id="Age"
                    name="Age"
                    type="number"
                    value={formData.Age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    className="h-10"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="PhoneNo" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="PhoneNo"
                    name="PhoneNo"
                    type="tel"
                    value={formData.PhoneNo}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="h-10"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="Email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="Email"
                    name="Email"
                    type="email"
                    value={formData.Email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                    className="h-10"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="createdAt" className="text-sm font-medium">
                    Created Date
                  </Label>
                  <Input
                    id="createdAt"
                    name="createdAt"
                    type="date"
                    value={formData.createdAt}
                    onChange={handleChange}
                    className="h-10"
                  />
                </div>

                <div className="flex items-center gap-3 sm:col-span-2 p-4 bg-muted rounded-md border border-border">
                  <input
                    id="isVerified"
                    name="isVerified"
                    type="checkbox"
                    checked={formData.isVerified}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                  <Label
                    htmlFor="isVerified"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Mark as Verified
                  </Label>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="py-5 px-6 border-t border-border flex flex-col sm:flex-row justify-end gap-3">
            <Button
              variant="outline"
              className="rounded-lg h-10 cursor-pointer"
              onClick={() =>
                setFormData({
                  FirstName: "",
                  LastName: "",
                  Age: "",
                  Email: "",
                  PhoneNo: "",
                  isVerified: false,
                  createdAt: new Date().toISOString().split("T")[0],
                })
              }
            >
              Reset
            </Button>
            <Button
              className="rounded-lg h-10 cursor-pointer hover:bg-primary/80"
              onClick={handleSubmit}
            >
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default ProfileForm;

